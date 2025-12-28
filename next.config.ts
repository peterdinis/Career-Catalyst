import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    reactCompiler: true,
    experimental: {
        typedEnv: true,
        optimizePackageImports: ['lucide-react', 'framer-motion'],
        optimizeCss: true,
        browserDebugInfoInTerminal: true
    },
    typedRoutes: true,
    devIndicators: {
        position: "top-right"
    },
};

export default nextConfig;
