import * as React from "react"
import { cn } from "@/lib/utils"
import { MacDots } from "./mac-dots"

interface WindowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  dotSize?: "sm" | "md" | "lg"
  headerClassName?: string
  bodyClassName?: string
  hideHeader?: boolean
}

export function WindowCard({
  children,
  className,
  title,
  subtitle,
  dotSize = "md",
  headerClassName,
  bodyClassName,
  hideHeader = false,
  ...props
}: WindowCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur-md overflow-hidden text-left flex flex-col",
        className
      )}
      {...props}
    >
      {!hideHeader && (
        <div
          className={cn(
            "relative z-10 flex items-center justify-between bg-zinc-900/30 border-b border-white/5 px-4 py-3 select-none shrink-0",
            headerClassName
          )}
        >
          <MacDots size={dotSize} />
          {title && (
            <span className="absolute left-1/2 -translate-x-1/2 text-zinc-500 text-[11px] font-mono font-medium truncate max-w-[60%]">
              {title}
            </span>
          )}
          {subtitle && (
            <span className="text-zinc-650 text-[10px] font-mono shrink-0 select-none">
              {subtitle}
            </span>
          )}
        </div>
      )}
      <div className={cn("relative z-10 p-4 font-mono text-xs text-zinc-300 leading-relaxed flex-1", bodyClassName)}>
        {children}
      </div>
    </div>
  )
}
