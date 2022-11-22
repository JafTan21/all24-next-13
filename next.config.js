/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir:"build",
  swcMinify: true,

  experimental: {
    appDir: true,
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
