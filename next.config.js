/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Disables Next.js image optimization for GitHub Pages
  },
  basePath: "/portfolio", // The GitHub repository name as the base path
  assetPrefix: "/portfolio/", // Ensures assets are prefixed with the repository name
};

module.exports = nextConfig;
