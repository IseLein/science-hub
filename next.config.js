/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'firebasestorage.googleapis.com',
              port: '',
              pathname: '/v0/b/science-hub-blog-2b481.appspot.com/**',
          },
      ],
  },
}

module.exports = nextConfig
