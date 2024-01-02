/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
};

module.exports = nextConfig;
