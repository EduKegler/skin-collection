import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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

export default withNextIntl(nextConfig);
