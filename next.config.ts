import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export' SATIRINI SİLDİK veya yorum satırı yaptık
  images: {
    unoptimized: true, // Docker içinde kütüphane çakışması olmaması için kalabilir
  },
};

export default nextConfig;