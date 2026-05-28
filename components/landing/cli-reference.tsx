"use client"

import Link from "next/link"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

function AnsiLogo() {
  return (
    <pre className="font-mono leading-none select-none text-[5px] sm:text-[8px] md:text-[9px] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-zinc-950/20 py-4 border-b border-white/5 mb-4 text-left whitespace-pre overflow-x-auto scrollbar-hide">
{`███████╗██╗     ██╗   ██╗██╗  ██╗███████╗████████╗██████╗ ███████╗ █████╗ ███╗   ███╗
██╔════╝██║     ██║   ██║╚██╗██╔╝██╔════╝╚══██╔══╝██╔══██╗██╔════╝██╔══██╗████╗ ████║
███████╗██║     ██║   ██║ ╚███╔╝ ███████╗   ██║   ██████╔╝█████╗  ███████║██╔████╔██║
██╔═══╝╝██║     ██║   ██║ ██╔██╗ ╚════██║   ██║   ██╔══██╗██╔══╝  ██╔══██║██║╚██╔╝██║
██║     ███████╗╚██████╔╝██╔╝ ██╗███████║   ██║   ██║  ██║███████╗██║  ██║██║ ╚═╝ ██║
╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝`}
    </pre>
  )
}

export function CliReference() {
  return (
    <section id="cli-commands" className="relative w-full bg-black border-t border-white/10 py-24 px-6 scroll-mt-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-mono text-pink-400 font-semibold tracking-wide">
            $ fluxstream --help
          </h2>
          <h3 className="text-3xl font-bold text-white tracking-tight">
            Command Line Reference
          </h3>
          <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
            Control your local streaming daemon, configure media scraping providers, and query indexes directly from the CLI shell.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-950/80 p-4 font-mono text-xs text-zinc-300 shadow-2xl leading-relaxed">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
            <span className="text-zinc-500">fluxstream cli guide</span>
            <span className="text-zinc-600">v0.4.0</span>
          </div>
          
          <AnsiLogo />

          <pre className="overflow-x-auto scrollbar-hide text-left whitespace-pre">
            {"Usage:\n" +
             "  fluxstream [command]\n\n" +
             "Available Commands:\n" +
             "  "}
            <span className="text-cyan-400">help</span>        {"Help about any command\n" +
             "  "}
            <span className="text-cyan-400">setup</span>       {"Sets up required configs and docker engine (if not installed)\n" +
             "  "}
            <span className="text-cyan-400">start</span>       {"Start the Fluxstream server\n" +
             "  "}
            <span className="text-cyan-400">status</span>      {"Shows the status of the server whether running or not\n" +
             "  "}
            <span className="text-cyan-400">stop</span>        {"Stops the Fluxstream server\n" +
             "  "}
            <span className="text-cyan-400">where</span>       {"Prints the url for the web app\n\n" +
             "Flags:\n" +
             "  "}
            <span className="text-yellow-500">-h, --help</span>      {"help for fluxstream\n" +
             "  "}
            <span className="text-yellow-500">-v, --version</span>   {"version for fluxstream\n\n" +
             'Use "fluxstream [command] --help" for more information about a command.'}
          </pre>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/docs/cli" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Read Full CLI Guide
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/docs">
              View Docs Home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
