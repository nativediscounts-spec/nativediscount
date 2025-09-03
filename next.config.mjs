/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/api/uploads/:path*", // serve uploads via API
      },
    ];
  },
  // experimental options go here if supported in your version
};

export default nextConfig;
