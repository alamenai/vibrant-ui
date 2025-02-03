/* eslint-disable @typescript-eslint/no-explicit-any */

import { withContentCollections } from "@content-collections/next";
import createMDX from "@next/mdx";
import { NextConfig } from "next";
const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      ["remark-gfm" as any, { strict: true, throwOnError: true }],
      ["remark-math", { strict: true, throwOnError: true }],
      ["remark-toc", { strict: true, throwOnError: true }],
      ["remark-mdx", { strict: true, throwOnError: true }],
    ],
    rehypePlugins: [
      ["rehype-highlight" as any, { strict: true, throwOnError: true }],
      ["rehype-prism-plus", { strict: true, throwOnError: true }],
      ["rehype-katex", { strict: true, throwOnError: true }],
      ["rehype-slug", { strict: true, throwOnError: true }],
    ],
  },
});

export default withContentCollections(withMDX(nextConfig));
