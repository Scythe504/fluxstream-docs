"use client"

import Link from "next/link"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SystemRequirements() {
  return (
    <section id="system-requirements" className="relative w-full bg-black border-t border-white/10 py-24 px-6 scroll-mt-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-mono text-pink-400 font-semibold tracking-wide">
            Supported Environments
          </h2>
          <h3 className="text-3xl font-bold text-white tracking-tight">
            System Requirements
          </h3>
          <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
            Run Fluxstream natively on your desktop client, deploy it instantly using Docker, or compile and run it directly from source.
          </p>
        </div>

        <div className="flex flex-col border border-white/10 bg-zinc-950/40 rounded-xl overflow-hidden backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4 border-b border-white/10 hover:bg-white/[0.02] transition-colors">
            <div className="flex flex-col gap-1 md:w-1/3">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Platform</span>
              <h4 className="text-base font-semibold text-white font-mono">Desktop Clients</h4>
            </div>
            <div className="flex-1">
              <p className="text-sm text-zinc-400 leading-relaxed">
                Natively supported on Windows (Windows 10 and 11), macOS (macOS 12 Monterey and above), and Linux distributions running Kernel 5.0 or later.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4 border-b border-white/10 hover:bg-white/[0.02] transition-colors">
            <div className="flex flex-col gap-1 md:w-1/3">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Deployment</span>
              <h4 className="text-base font-semibold text-white font-mono">Docker Engine</h4>
            </div>
            <div className="flex-1">
              <p className="text-sm text-zinc-400 leading-relaxed">
                Deploy and host a localized streaming node inside a Docker container, with pre-configured network ports and automated storage volume bindings.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4 hover:bg-white/[0.02] transition-colors">
            <div className="flex flex-col gap-1 md:w-1/3">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Development</span>
              <h4 className="text-base font-semibold text-white font-mono">Compile from Source</h4>
            </div>
            <div className="flex-1">
              <p className="text-sm text-zinc-400 leading-relaxed">
                Build the core command-line utility and web interface locally. Requires Go (version 1.22 or higher) and Node.js (version 20 or higher) on the host machine.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-start">
          <Button asChild>
            <Link href="/docs/installation" className="gap-2">
              <BookOpen className="h-4 w-4" />
              View Installation Guide
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

