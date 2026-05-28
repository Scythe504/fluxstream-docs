"use client"

import Link from "next/link"
import { FileText, Settings, Heart } from "lucide-react"

function GithubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        
        <div className="md:col-span-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-white font-mono tracking-tight">fluxstream</span>
            <span className="text-[9px] font-mono bg-white/5 border border-white/10 text-zinc-400 px-1.5 py-0.5 rounded">v0.4.0</span>
          </div>
          <p className="text-xs text-zinc-400 font-mono leading-relaxed max-w-sm">
            High-performance, open-source torrent streaming daemon and client. Watch magnet links and video feeds on-the-fly.
          </p>
          <span className="text-[10px] text-zinc-500 font-mono mt-2">
            © 2026 Fluxstream. Built with <Heart className="inline h-3 w-3 fill-pink-500 text-pink-500" /> for the torrent ecosystem.
          </span>
        </div>

        <div className="md:col-span-3 flex flex-col gap-3">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">Repositories</span>
          <div className="flex flex-col gap-2 text-xs font-mono">
            <Link 
              href="https://github.com/scythe504/fluxstream" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              Streaming Engine
            </Link>
            <Link 
              href="https://github.com/scythe504/fluxstream-web" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              Web Client
            </Link>
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col gap-3">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">Documentation</span>
          <div className="flex flex-col gap-2 text-xs font-mono">
            <Link 
              href="/docs" 
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5" />
              Docs Home
            </Link>
            <Link 
              href="/docs/installation" 
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Settings className="h-3.5 w-3.5" />
              Installation
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
