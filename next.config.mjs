/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ddragon.leagueoflegends.com"],
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
