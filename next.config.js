/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // This ensures Next.js exports static HTML
  images: {
    unoptimized: true, // Disables Next.js image optimization for GitHub Pages
  },
  basePath: process.env.NODE_ENV === "production" ? "/portfolio" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/portfolio/" : "",
};

module.exports = nextConfig;
