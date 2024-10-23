/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    distDir: ".next",
    
    images: {
        remotePatterns : [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: '*images.unsplash.com',
            }
        ],
        domains: ['firebasestorage.googleapis.com'],
    },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
}

export default nextConfig