import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return handleProxy(req, path);
}
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY, Authorization, Accept, User-Agent, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

async function handleProxy(req: NextRequest, pathSegments: string[]) {
  const origin = req.headers.get('origin') || '*';
  
  // 1. Get secret key from server environment
  const secretApiKey = process.env.ARMOYU_API_KEY;
  
  if (!secretApiKey) {
    console.error('[Proxy] ARMOYU_API_KEY is missing in .env');
    return NextResponse.json(
      { durum: 0, aciklama: 'Sunucu yapılandırması eksik (API Key)' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': origin } }
    );
  }

  // 2. Clean the path - we want to support both "clean" paths and legacy /botlar/ paths
  let actualPath = '/' + pathSegments.join('/');
  
  // If the path already starts with /botlar/, it might have a dummy key we need to strip
  if (actualPath.startsWith('/botlar/')) {
    const segments = actualPath.split('/');
    // segments: ["", "botlar", "DUMMY_KEY", "real", "path", ...]
    if (segments.length >= 4) {
      actualPath = '/' + segments.slice(3).join('/');
    }
  }

  // 3. Target Armoyu API
  const apiBase = process.env.ARMOYU_API_URL || 'https://api.armoyu.com';
  const targetUrl = `${apiBase}/botlar/${secretApiKey}${actualPath}`;

  // Log everything clearly for Coolify
  process.stdout.write(`[Proxy DEBUG] ${req.method} ${actualPath} -> KEY_HIDDEN_URL\n`);

  const method = req.method;
  const headers = new Headers();

  // Helper to safely set headers and avoid ISO-8859-1 errors
  const safeSetHeader = (key: string, value: string) => {
    if (!value) return;
    const isAscii = /^[ -~]*$/.test(value);
    if (isAscii) {
      headers.set(key, value);
    } else {
      console.warn(`[Proxy] Skipping header ${key} due to non-ASCII characters`);
    }
  };

  // Whitelist of headers to forward from client
  const allowedHeaders = ['authorization', 'content-type', 'accept', 'user-agent', 'x-requested-with'];

  req.headers.forEach((value, key) => {
    if (allowedHeaders.includes(key.toLowerCase())) {
      safeSetHeader(key, value);
    }
  });

  // Inject the REAL API KEY to headers
  safeSetHeader('X-API-KEY', secretApiKey);

  try {
    const fetchOptions: any = {
      method,
      headers,
      cache: 'no-store'
    };

    if (method !== 'GET' && method !== 'HEAD') {
      try {
        const arrayBuffer = await req.arrayBuffer();
        if (arrayBuffer.byteLength > 0) {
          fetchOptions.body = arrayBuffer;
        }
      } catch (bodyError: any) {
        console.warn(`[Proxy] Body read warning: ${bodyError.message}`);
      }
    }

    const response = await fetch(targetUrl, fetchOptions);
    const responseText = await response.text();

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = {
        durum: 0,
        aciklama: responseText.substring(0, 500) || "API'den boş veya geçersiz yanıt geldi.",
        isRaw: true,
        status: response.status
      };
    }

    return NextResponse.json(responseData, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      }
    });
  } catch (error: any) {
    console.error(`[Proxy Error] ${method} ${targetUrl}:`, error);
    return NextResponse.json({
      durum: 0,
      aciklama: `Proxy Error: ${error.message}`
    }, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      }
    });
  }
}
