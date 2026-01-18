/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optimize images for static export
    images: {
        unoptimized: true,
    },

    // Ensure trailing slashes for consistent routing
    trailingSlash: false,
    webpack: (config, { webpack, isServer, nextRuntime }) => {
        // Avoid 'Module not found: Can't resolve 'async_hooks''
        if (nextRuntime === 'edge') {
            config.resolve.alias['async_hooks'] = false;
        }
        return config;
    },
};

export default nextConfig;
