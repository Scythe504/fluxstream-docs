import { createMDX } from "fumadocs-mdx/next"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {}
const withMdx = createMDX({
  configPath: "source.config.ts"
})

export default nextConfig
