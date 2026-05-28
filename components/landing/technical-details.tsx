"use client"

import Link from "next/link"
import { AlertTriangle, Cpu, HelpCircle, Info, ExternalLink, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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

export function TechnicalDetails() {
  return (
    <section id="technical-details" className="relative w-full bg-black border-t border-white/10 py-24 px-6 scroll-mt-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-mono text-pink-400 font-semibold tracking-wide">
              Internal Specs
            </h2>
            <Badge variant="outline" className="border-pink-500/30 bg-pink-500/10 text-pink-400 font-mono text-[9px] uppercase tracking-wider rounded-md">
              Beta Phase
            </Badge>
          </div>
          <h3 className="text-3xl font-bold text-white tracking-tight">
            Technical Reference
          </h3>
          <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
            Deep dive into Fluxstream's underlying architecture, core libraries, performance limitations, and open-source licensing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <Cpu className="h-5 w-5 text-zinc-400" />
                <h4 className="text-base font-semibold text-white font-mono">How it Works?</h4>
              </div>
              <div className="text-sm text-zinc-400 leading-relaxed font-mono space-y-4">
                <p>
                  Fluxstream works by converting incoming BitTorrent streams directly into sequential HTTP media feeds. Instead of downloading files entirely, the core daemon prioritizes downloading the header and beginning segments of video files.
                </p>
                <p>
                  Once the player requests a stream, the engine buffers the initial chunks and feeds them into the player. Unneeded blocks are garbage-collected automatically based on storage quotas.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-5 rounded-xl border border-white/5 bg-zinc-950/40">
              <div className="flex items-center gap-2.5">
                <Info className="h-5 w-5 text-zinc-500" />
                <h4 className="text-sm font-semibold text-white font-mono">AGPL-3.0 License</h4>
              </div>
              <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                Fluxstream is free software licensed under the GNU Affero General Public License. This ensures the engine remains open-source, and any modifications deployed as network services are shared back with the community.
              </p>
              <Link 
                href="https://github.com/Scythe504/fluxstream?tab=AGPL-3.0-1-ov-file"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-500 hover:text-white font-mono transition-colors inline-flex items-center gap-1 mt-1"
              >
                Read License Spec <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <Settings className="h-5 w-5 text-zinc-400" />
                <h4 className="text-base font-semibold text-white font-mono">Core Tech Stack</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-zinc-400">
                <div className="flex flex-col gap-1 p-3 rounded-lg border border-white/5 bg-zinc-950/20">
                  <span className="text-white">Golang</span>
                  <span className="text-[10px] text-zinc-500">Streaming Server</span>
                </div>
                <div className="flex flex-col gap-1 p-3 rounded-lg border border-white/5 bg-zinc-950/20">
                  <span className="text-white">SQLite</span>
                  <span className="text-[10px] text-zinc-500">Config & State DB</span>
                </div>
                <Link 
                  href="https://github.com/anacrolix/torrent" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col gap-1 p-3 rounded-lg border border-white/5 bg-zinc-950/20 hover:border-white/10 transition-colors group"
                >
                  <span className="text-white flex items-center gap-1 group-hover:underline">
                    anacrolix/torrent <ExternalLink className="h-2.5 w-2.5 text-zinc-500" />
                  </span>
                  <span className="text-[10px] text-zinc-500">Engine Core Client</span>
                </Link>
                <Link 
                  href="https://github.com/FFmpeg/FFmpeg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col gap-1 p-3 rounded-lg border border-white/5 bg-zinc-950/20 hover:border-white/10 transition-colors group"
                >
                  <span className="text-white flex items-center gap-1 group-hover:underline">
                    FFmpeg <ExternalLink className="h-2.5 w-2.5 text-zinc-500" />
                  </span>
                  <span className="text-[10px] text-zinc-500">Demuxer & Transcoder</span>
                </Link>
                <div className="flex flex-col gap-1 p-3 rounded-lg border border-white/5 bg-zinc-950/20">
                  <span className="text-white">Next.js</span>
                  <span className="text-[10px] text-zinc-500">Web App Client</span>
                </div>
                <div className="flex flex-col gap-1 p-3 rounded-lg border border-white/5 bg-zinc-950/20">
                  <span className="text-white">TypeScript</span>
                  <span className="text-[10px] text-zinc-500">Frontend Safety</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-5 w-5 text-zinc-500" />
                <h4 className="text-sm font-semibold text-white font-mono">Known Limitations (Beta)</h4>
              </div>
              <ul className="text-xs text-zinc-400 font-mono space-y-2 list-disc pl-4 leading-relaxed">
                <li>Magnet link format support only (raw torrent files are not currently parsed).</li>
                <li>Single file stream mapping (extracts and plays only the primary media file in directories).</li>
                <li>Single language subtitles (embedded track mapping is supported, selection switches are in development).</li>
              </ul>
            </div>

            <div className="flex flex-col gap-4 p-5 rounded-xl border border-white/10 bg-zinc-950/60 shadow-lg">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="h-5 w-5 text-pink-400" />
                <h4 className="text-sm font-semibold text-white font-mono">Submit Feature Feedback</h4>
              </div>
              <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                Fluxstream is expanding dynamically during its beta stages. Want to request support for multi-file directories, custom index feeds, or alternative audio streams?
              </p>
              <Link 
                href="https://github.com/Scythe504/fluxstream/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start text-xs font-semibold font-mono border border-white/10 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 mt-2 cursor-pointer"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                Request Additions
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
