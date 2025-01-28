// lavi/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // Remova o http://
  },
  // Outras configurações do Next.js podem ir aqui, se necessário
};

export default nextConfig;
