const withMDX = require('@next/mdx')()
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/api/another': ['./database/**/*'],
    },
  },
  // Optionally, add any other Next.js config below
}
 
module.exports = withMDX(nextConfig)