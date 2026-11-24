import type { NextConfig } from "next";
import { BASE_PATH } from "./src/constants/basePath";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  basePath: BASE_PATH,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
