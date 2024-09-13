/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Disables Next.js image optimization for GitHub Pages
  },
};

module.exports = nextConfig;
