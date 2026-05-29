import { DocsLayout } from "fumadocs-ui/layouts/docs"
import type { ReactNode } from "react"
import { source } from "@/lib/source"
import { ThemeProvider } from "next-themes"

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{ title: "fluxstream docs" }}
      themeSwitch={{ enabled: false }}
      sidebar={{
        banner: (
          <div className="px-2 py-1.5 text-[12px] uppercase tracking-wider">
            Self-Hosted Player
          </div>
        )
      }}
    >
      {children}
    </DocsLayout>
  )
}
