/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', "icon-library.com"],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
