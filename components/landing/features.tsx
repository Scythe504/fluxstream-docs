"use client"

import { Zap, Cpu, Database, Globe, Tv, EyeOff } from "lucide-react"

export function Features() {
  const items = [
    {
      icon: Zap,
      title: "Sequential Loading",
      description: "Reorders bittorrent chunk downloads to retrieve file blocks in exact sequence. Video playback starts in under five seconds without waiting for full torrent downloads."
    },
    {
      icon: Cpu,
      title: "Dynamic Transcoding",
      description: "Integrates on-the-fly FFmpeg translation pipelines to transcode incompatible audio/video formats directly into browser-compliant HTML5 streams."
    },
    {
      icon: Database,
      title: "Smart Block Caching",
      description: "Manages local caches using an optimized SQLite registry. Preserves temporary segments to enable lag-free seeks while automatically cleaning up outdated directories."
    },
    {
      icon: Globe,
      title: "Swarm Gathering",
      description: "Leverages DHT and Peer Exchange protocols for trackerless peer discovery, connecting directly to swarm nodes to maximize local bandwidth utilization."
    },
    {
      icon: Tv,
      title: "Player Integration",
      description: "Generates instant media streaming links compatible with native players like VLC or MPV, bypassing web browser codec limitations completely."
    },
    {
      icon: EyeOff,
      title: "Zero Telemetry",
      description: "Runs fully sandboxed within your local engine instance. Transmits zero telemetry, contains no trackers, and logs data exclusively to your local device."
    }
  ]

  return (
    <section id="features" className="relative w-full bg-black border-t border-white/10 py-24 px-6 scroll-mt-14 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[60%] h-[60%] rounded-full bg-pink-500/5 blur-[130px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[60%] h-[60%] rounded-full bg-indigo-500/5 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-mono text-pink-400 font-semibold tracking-wide uppercase">
            Core Capabilities
          </h2>
          <h3 className="text-3xl font-bold text-white tracking-tight">
            Engine Features
          </h3>
          <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
            Fluxstream combines high-performance bittorrent networking, dynamic media pipelines, and privacy-first database caching into a lightweight local engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="bg-zinc-950/40 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 hover:border-white/10 hover:bg-zinc-900/10 transition-all duration-300 group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white transition-colors duration-300 group-hover:border-pink-500/20 group-hover:bg-pink-500/10 group-hover:text-pink-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-base font-semibold text-white font-mono transition-colors group-hover:text-pink-400">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
