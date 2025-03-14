import { join } from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};

    // Configura el alias para que 'inflight' apunte a este módulo
    config.resolve.alias['inflight'] = join(process.cwd(), 'empty-inflight.ts');
    return config;
  }
};

export default nextConfig;
