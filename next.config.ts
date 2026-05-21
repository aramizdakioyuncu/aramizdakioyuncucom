import path from 'path';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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