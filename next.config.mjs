/** @type {import('next').NextConfig} */

// When building for GitHub Pages (a project site served under /hhc), set a
// base path + asset prefix so links and assets resolve correctly. Local dev
// and other hosts leave these empty.
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isPages ? "/hhc" : "",
  assetPrefix: isPages ? "/hhc/" : "",
};

export default nextConfig;
