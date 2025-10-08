/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
   basePath: "/portfolio", 
   trailingSlash: true,      
  images: {
    unoptimized: true,     
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;