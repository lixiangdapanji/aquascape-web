import type { NextConfig } from 'next';

/**
 * Next 15 config for @aquascape/web.
 *
 * - `transpilePackages` — the shared workspace packages ship raw TS, so Next
 *   must transpile them through SWC rather than treat them as prebuilt JS.
 * - `reactStrictMode` — always on.
 * - Turbopack is opted into via the `dev --turbo` script, which is the
 *   Next 15 recommendation. No explicit `experimental.turbo` block needed.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@aquascape-studio/ui', '@aquascape-studio/botany', '@aquascape-studio/render'],
  output: 'standalone',
  // styled-jsx is not auto-traced in standalone builds; include it explicitly.
  outputFileTracingIncludes: {
    '/**': ['./node_modules/styled-jsx/**/*'],
  },
  experimental: {},
};

export default nextConfig;
