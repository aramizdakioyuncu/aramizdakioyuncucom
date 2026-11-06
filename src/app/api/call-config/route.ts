import { NextResponse } from 'next/server';

// Çalışma anında okunur: Coolify'da değişkeni değiştirmek yeniden derleme istemez. pk_ açık anahtardır (tarayıcıya gider)
export const dynamic = 'force-dynamic';

export function GET() {
  const url = process.env.PHATSA_URL;
  const key = process.env.PHATSA_PUBLISHABLE_KEY;
  // Yanlışlıkla gizli anahtar girilirse tarayıcıya gönderilmez
  if (!url || !key?.startsWith('pk_')) return NextResponse.json({ enabled: false });
  return NextResponse.json({ enabled: true, url: url.replace(/\/+$/, ''), key });
}
