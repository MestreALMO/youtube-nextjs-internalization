/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  //intenalization
  i18n: {
    locales: ["en", "fr", "pt"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
