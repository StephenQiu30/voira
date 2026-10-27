import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    localPatterns: [
      // Character revisions invalidate optimized portraits and avatar crops together.
      { pathname: "/characters/**" },
      { pathname: "/scenes/**", search: "" },
    ],
  },
};
export default nextConfig;
