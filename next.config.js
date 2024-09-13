/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Use "export" for static HTML export
  images: {
    unoptimized: true, // Disables Next.js image optimization for GitHub Pages
  },
  basePath: process.env.NODE_ENV === "production" ? "/portfolio" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/portfolio/" : "",
};

module.exports = nextConfig;
