import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/**": ["./sqlite.db"],
  },
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;