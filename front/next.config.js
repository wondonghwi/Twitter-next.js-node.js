const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === "production";
    const plugins = [...config.plugins];
    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval",
      plugins,
    };
  },
  compress: true,
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "i.ytimg.com",
      "placeimg.com",
      "s3.ap-northeast-2.amazonaws.com",
      "https://s3.ap-northeast-2.amazonaws.com",
    ],
  },
});
