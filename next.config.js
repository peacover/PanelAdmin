/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/seed/**",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "niqjycndfnbzsmfghvvs.supabase.co",
        port: "",
        pathname: "/**",
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
// (https://niqjycndfnbzsmfghvvs.supabase.co/storage/v1/object/public/PanelAdminBucket/peacover-1d3792af-0bdf-4286-8d7a-8ba59466ff96
module.exports = nextConfig;
