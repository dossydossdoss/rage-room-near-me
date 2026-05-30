import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Host serves directory-style URLs (/florida/). Emit dir/index.html so
  // those resolve 200 instead of 301→403, and render internal <Link>
  // hrefs with the trailing slash (no redirect hops for crawlers).
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig;
