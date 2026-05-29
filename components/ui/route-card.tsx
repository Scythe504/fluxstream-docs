import * as React from "react"
import { cn } from "@/lib/utils"

interface RouteCardProps extends React.HTMLAttributes<HTMLDivElement> {
  method: "GET" | "POST" | "PUT" | "DELETE"
  path: string
}

const methodColors = {
  GET: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  POST: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  PUT: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  DELETE: "text-rose-400 bg-rose-500/10 border-rose-500/20",
}

export function RouteCard({
  method,
  path,
  children,
  className,
  ...props
}: RouteCardProps) {
  return (
    <div
      className={cn(
        "my-6 rounded-lg border border-white/10 bg-zinc-950/50 overflow-hidden text-left flex flex-col",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 bg-zinc-950 px-4 py-3 border-b border-white/5 font-mono text-sm select-none shrink-0">
        <span className={cn("px-2 py-0.5 rounded text-[11px] font-semibold border tracking-wider", methodColors[method])}>
          {method}
        </span>
        <span className="text-zinc-200 font-medium truncate">{path}</span>
      </div>
      <div className="p-4 bg-zinc-900/10 flex-1">
        {children}
      </div>
    </div>
  )
}
