import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: 'https://sample-rewrite-eight.vercel.app',  
  images: {
    path: 'https://sample-rewrite-eight.vercel.app/_next/image',
  },
};

export default nextConfig;
