/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Bundle framer-motion's split packages (motion-dom/motion-utils) correctly
  // so server vendor-chunks are emitted for `next start`.
  transpilePackages: ['framer-motion', 'motion-dom', 'motion-utils'],
};

export default nextConfig;
