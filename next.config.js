/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.imusm.cn",
        port: "",
      },
    ],
  },
}

module.exports = nextConfig
