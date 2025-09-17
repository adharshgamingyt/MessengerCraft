/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  distDir: "out",
  output: "export",
};

export default nextConfig;
