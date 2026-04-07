import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@armoyu/ui', '@armoyu/core'],
  images: {
    unoptimized: true,
  },
  // Turbopack error fix: remove custom webpack if not needed, 
  // or explicitly allow it if you must use it with --webpack.
  // Since we want standard node_modules resolution for @armoyu/core,
  // we don't need the alias anymore.
};

export default nextConfig;