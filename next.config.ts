import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root: an unrelated package-lock.json in the home
  // directory otherwise makes Next infer the wrong root.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
