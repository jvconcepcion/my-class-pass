import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['static.wixstatic.com'],
  },
};

export default nextConfig;
