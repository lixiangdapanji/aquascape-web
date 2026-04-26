/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@aquascape-studio/ui', '@aquascape-studio/botany', '@aquascape-studio/render'],
  output: 'standalone',
  outputFileTracingIncludes: {
    '/**': ['./node_modules/styled-jsx/**/*'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },
};

module.exports = nextConfig;
