import * as React from "react"
import { cn } from "@/lib/utils"

interface MacDotsProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function MacDots({ className, size = "md" }: MacDotsProps) {
  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3 w-3",
  }

  return (
    <div className={cn("flex items-center gap-1.5 shrink-0 select-none", className)}>
      <div className={cn("rounded-full bg-[#ff5f56]/80 hover:bg-[#ff5f56] transition-colors", sizeClasses[size])} />
      <div className={cn("rounded-full bg-[#ffbd2e]/80 hover:bg-[#ffbd2e] transition-colors", sizeClasses[size])} />
      <div className={cn("rounded-full bg-[#27c93f]/80 hover:bg-[#27c93f] transition-colors", sizeClasses[size])} />
    </div>
  )
}
