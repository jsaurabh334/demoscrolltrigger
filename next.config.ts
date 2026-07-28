import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Cache public directory assets (images, fonts, icons) for 1 year
        source: "/:path(.*\\.(?:svg|png|jpg|jpeg|webp|ico|woff|woff2|ttf))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
