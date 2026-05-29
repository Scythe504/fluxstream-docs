"use client"

import * as React from "react"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { MacDots } from "./mac-dots"
import { Clipboard, Check } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface WindowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  dotSize?: "sm" | "md" | "lg"
  headerClassName?: string
  bodyClassName?: string
  hideHeader?: boolean
  isTerminal?: boolean
  hideCopy?: boolean
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
  isTerminal = false,
  hideCopy = false,
  ...props
}: WindowCardProps) {
  const [copied, setCopied] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const handleCopy = async () => {
    if (!bodyRef.current) return
    const preEl = bodyRef.current.querySelector("pre")
    const text = (preEl ? preEl.textContent : bodyRef.current.textContent) || ""
    try {
      await navigator.clipboard.writeText(text.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error(err)
    }
  }

  const processedChildren = isTerminal && typeof children === "string" ? (
    <pre>
      <code>
        {children.split("\n").map((line, idx) => (
          <span key={idx} className="line block">
            {line}
          </span>
        ))}
      </code>
    </pre>
  ) : (
    children
  )

  const bodyContent = (
    <div
      ref={bodyRef}
      className={cn(
        "relative z-10 p-4 font-mono text-xs text-zinc-300 leading-relaxed",
        bodyClassName
      )}
    >
      {processedChildren}
    </div>
  )

  return (
    <div
      className={cn(
        "relative rounded-xl border border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur-md overflow-hidden text-left flex flex-col my-6",
        isTerminal ? "terminal-card-container" : "window-card-container",
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
          <div className="flex items-center gap-3 shrink-0 ml-auto z-20">
            {subtitle && (
              <span className="text-zinc-600 text-[10px] font-mono select-none">
                {subtitle}
              </span>
            )}
            {!hideCopy && (
              <button
                onClick={handleCopy}
                className="text-zinc-500 hover:text-white transition-colors p-1 rounded hover:bg-white/5 cursor-pointer"
                title="Copy commands"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-400" />
                ) : (
                  <Clipboard className="h-3.5 w-3.5" />
                )}
              </button>
            )}
          </div>
        </div>
      )}
      {isTerminal ? (
        <ScrollArea className="flex-1 max-h-[400px]">
          {bodyContent}
        </ScrollArea>
      ) : (
        bodyContent
      )}
    </div>
  )
}

export function TerminalCard(props: WindowCardProps) {
  return <WindowCard {...props} isTerminal={true} />
}

export interface CodeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  lang?: string
  hideCopy?: boolean
}

export function CodeCard({
  children,
  className,
  title,
  lang,
  hideCopy = false,
  ...props
}: CodeCardProps) {
  const [copied, setCopied] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const handleCopy = async () => {
    if (!bodyRef.current) return
    const preEl = bodyRef.current.querySelector("pre")
    const text = (preEl ? preEl.textContent : bodyRef.current.textContent) || ""
    try {
      await navigator.clipboard.writeText(text.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div
      className={cn(
        "relative rounded-lg border border-white/10 bg-zinc-950/80 shadow-lg backdrop-blur-md overflow-hidden text-left flex flex-col my-4 window-card-container",
        className
      )}
      {...props}
    >
      <div className="relative z-10 flex items-center justify-between bg-zinc-950/50 border-b border-white/5 px-4 py-2 select-none shrink-0 font-mono text-[11px]">
        {title ? (
          <span className="text-zinc-400 font-medium">{title}</span>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-3 shrink-0 ml-auto z-20">
          {lang && (
            <span className="text-zinc-600 font-semibold uppercase tracking-wider text-[10px]">
              {lang}
            </span>
          )}
          {!hideCopy && (
            <button
              onClick={handleCopy}
              className="text-zinc-500 hover:text-white transition-colors p-1 rounded hover:bg-white/5 cursor-pointer"
              title="Copy"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-400" />
              ) : (
                <Clipboard className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>
      </div>
      <div
        ref={bodyRef}
        className="relative z-10 p-4 font-mono text-xs text-zinc-300 leading-relaxed [&>pre]:m-0 [&>pre]:bg-transparent [&>pre]:border-none"
      >
        {children}
      </div>
    </div>
  )
}

export function ResponseCard(props: CodeCardProps) {
  return <CodeCard {...props} />
}
