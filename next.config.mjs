/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optimize images for static export
    images: {
        unoptimized: true,
    },

    // Ensure trailing slashes for consistent routing
    trailingSlash: false,
};

export default nextConfig;
