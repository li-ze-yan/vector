import createMdx from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@tailwindcss/node"],
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  outputFileTracingIncludes: {
    "/**/*": ["./docs/*.mdx"],
  },
  turbopack: {
    rules: {
      // Support import .svg as react components in dev builds
      "*.react.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  async redirects() {
    return [
      // Backdrop Filters
      {
        source: "/react-docs",
        destination: "/react-docs/react-hooks",
        permanent: false,
      },
    ];
  },
};

const withMDX = createMdx();
export default withMDX(nextConfig);
