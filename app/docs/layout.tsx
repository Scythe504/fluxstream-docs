import { DocsLayout } from "fumadocs-ui/layouts/docs"
import type { ReactNode } from "react"
import { source } from "@/lib/source"

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout 
      tree={source.pageTree} 
      nav={{ title: "fluxstream docs" }}
      sidebar={{
        banner: (
          <div className="px-2 py-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider border-b border-white/5">
            Self-Hosted Player
          </div>
        )
      }}
    >
      {children}
    </DocsLayout>
  )
}
