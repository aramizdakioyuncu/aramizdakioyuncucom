import fs from 'fs';
import path from 'path';
import type { NextConfig } from "next";

// Ana sayfada gösterilen sürümler: derlemede gerçekten kurulu paketlerden okunur
const versionOf = (file: string) => JSON.parse(fs.readFileSync(path.resolve(__dirname, file), 'utf8')).version as string;

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_WEB_VERSION: versionOf('package.json'),
    NEXT_PUBLIC_UI_VERSION: versionOf('node_modules/@armoyu/ui/package.json'),
    NEXT_PUBLIC_CORE_VERSION: versionOf('node_modules/@armoyu/core/package.json'),
  },
  transpilePackages: ['@armoyu/ui', '@armoyu/core'],
  typescript: {
    // Temporary: core/ui model definitions are not fully aligned yet.
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.resolve(__dirname),
  // Hardcoded to avoid Node ESM module resolution errors from the UI package during Next config loading
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '192.168.1.13',
    'aramizdakioyuncu.com',
    'api.aramizdakioyuncu.com'
  ] as any,
};

export default nextConfig;