/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
  },
  output: "standalone",
  webpack: (config: WebpackConfig) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...(config.resolve?.fallback || {}),
        canvas: false,
      },
    };
    return config;
  },
};

export default nextConfig;
