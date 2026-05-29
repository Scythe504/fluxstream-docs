"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShieldAlert, Plus, BookOpen, Play, Activity, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MacDots } from "../mac-dots"

export function ContentStreaming() {
  const [activeTab, setActiveTab] = useState<"providers" | "magnets">("providers")
  const [status, setStatus] = useState<"idle" | "connecting" | "playing">("idle")
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSource, setSelectedSource] = useState({
    file: "Sintel.2010.1080p.mkv",
    addon: "Blender Open Movies",
    size: "650 MB",
    videoUrl: "/sintel.webm"
  })
  const magnetLink = "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel"

  const isStreamingActive = status === "connecting" || status === "playing"

  useEffect(() => {
    if (isHovered || isStreamingActive) return

    const timer = setInterval(() => {
      setActiveTab((prev) => (prev === "providers" ? "magnets" : "providers"))
    }, 5000)

    return () => clearInterval(timer)
  }, [isHovered, isStreamingActive])

  const handleStream = () => {
    setStatus("connecting")
    setTimeout(() => {
      setStatus("playing")
    }, 1500)
  }

  const handleReset = () => {
    setStatus("idle")
  }

  return (
    <section id="content-streaming" className="relative w-full bg-black border-t border-white/10 py-24 px-6 scroll-mt-14">
      <style>{`
        @keyframes subTabEnter {
          from {
            opacity: 0;
            transform: scale(0.98) translateY(8px);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-mono text-pink-400 font-semibold tracking-wide">
                Unified Playback
              </h2>
              <h3 className="text-3xl font-bold text-white tracking-tight">
                Content Streaming
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mt-2">
                Fluxstream is a sleek, self-hosted media client for torrent-based libraries. Play Creative Commons open movies, public domain video archives, or your personal legally sourced media collections instantly on-the-fly.
              </p>
            </div>

            <div className="flex flex-col gap-4 text-sm text-zinc-400">
              <p>
                Connect your own self-hosted feeds and personal media indexes, or paste magnet links to stream files directly in a clean, web-based player.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link href="/docs/installation" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  View Guide
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-white/10 text-white hover:bg-white/5">
                <Link href="/docs/providers#register" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Register Addon
                </Link>
              </Button>
            </div>

            <p className="text-xs font-mono text-zinc-500 mt-2">
              * Note: The actual UI of the self-hosted web client will differ.
            </p>
          </div>

          <div className="lg:col-span-7 w-full">
            <Tabs 
              value={activeTab} 
              onValueChange={(val) => {
                setActiveTab(val as "providers" | "magnets")
                setStatus("idle")
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative rounded-2xl border border-white/10 bg-zinc-950/60 shadow-2xl backdrop-blur-md overflow-hidden text-left flex flex-col transition-all animate-[subTabEnter_0.6s_cubic-bezier(0.16,1,0.3,1)]"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div 
                  className={`absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-pink-500/10 blur-[120px] transition-all duration-1000 ease-in-out ${
                    activeTab === "providers" 
                      ? "translate-x-0 translate-y-0 opacity-100 scale-100" 
                      : "translate-x-[40px] translate-y-[20px] opacity-60 scale-90"
                  }`}
                />
                <div 
                  className={`absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-indigo-500/10 blur-[120px] transition-all duration-1000 ease-in-out ${
                    activeTab === "magnets" 
                      ? "translate-x-0 translate-y-0 opacity-100 scale-100" 
                      : "-translate-x-[40px] -translate-y-[20px] opacity-65 scale-90"
                  }`}
                />
              </div>
              
              <div className="relative z-10 bg-zinc-900/50 border-b border-white/5 flex flex-col select-none">
                <div className="flex items-center justify-between px-4 pt-3 pb-2.5">
                  <MacDots size="sm" />
                  
                  <div className="flex-1 max-w-md mx-4">
                    <div className="w-full bg-black/40 border border-white/5 rounded-md py-1 px-3 text-[10px] font-mono text-zinc-500 text-center truncate">
                      {activeTab === "providers" 
                        ? "fluxstream.app/providers/cc-media/sintel" 
                        : status === "playing" 
                          ? "fluxstream.app/player?stream=sintel"
                          : "fluxstream.app/add-magnet"
                      }
                    </div>
                  </div>

                  <div className="flex gap-2 text-zinc-650 shrink-0 text-[10px] font-mono min-w-[20px] justify-end">
                    {activeTab === "magnets" && status === "playing" && (
                      <Button variant="ghost" size="icon-xs" onClick={handleReset} title="Reset">
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                <TabsList className="flex w-full items-end justify-start bg-transparent p-0 px-4 border-t border-white/[0.03] gap-1 h-fit" variant="line">
                  <TabsTrigger 
                    id="trigger-providers"
                    value="providers"
                    className="px-3 py-1.5 text-[10px] font-mono rounded-t-lg border-x border-t transition-all border-transparent bg-transparent text-zinc-500 hover:text-zinc-350 data-active:bg-zinc-950/60 data-active:border-white/10 data-active:text-white data-active:font-semibold disabled:opacity-50"
                  >
                    Media Providers
                  </TabsTrigger>
                  <TabsTrigger 
                    id="trigger-magnets"
                    value="magnets"
                    className="px-3 py-1.5 text-[10px] font-mono rounded-t-lg border-x border-t transition-all border-transparent bg-transparent text-zinc-500 hover:text-zinc-350 data-active:bg-zinc-950/60 data-active:border-white/10 data-active:text-white data-active:font-semibold disabled:opacity-50"
                  >
                    Stream Magnets
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="relative z-10 p-4 sm:p-5 h-auto md:h-[300px] flex flex-col justify-center overflow-hidden">
                <div className="relative grid grid-cols-1 grid-rows-1 w-full h-full items-center">
                  
                  <div
                    role="tabpanel"
                    id="panel-providers"
                    aria-labelledby="trigger-providers"
                    className={`col-start-1 row-start-1 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeTab === "providers"
                        ? "opacity-100 translate-x-0 pointer-events-auto blur-0 scale-100"
                        : "opacity-0 -translate-x-8 pointer-events-none blur-sm scale-98"
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      <div className="md:col-span-7 flex flex-col gap-2">
                        {status === "playing" ? (
                          <div className="relative aspect-video w-full rounded-xl bg-black border border-white/10 overflow-hidden shadow-inner">
                            <video
                              src={selectedSource.videoUrl}
                              autoPlay
                              loop
                              muted
                              playsInline
                              controls
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : status === "connecting" ? (
                          <div className="relative aspect-video w-full rounded-xl bg-black border border-white/10 overflow-hidden flex flex-col items-center justify-center shadow-inner py-8 h-[166px]">
                            <div className="h-8 w-8 rounded-full border-2 border-zinc-700 border-t-zinc-350 animate-spin" />
                            <span className="text-[10px] font-mono text-zinc-400 mt-2">Connecting to swarm...</span>
                          </div>
                        ) : (
                          <div 
                            onClick={handleStream}
                            className="relative aspect-video w-full rounded-xl bg-black border border-white/10 overflow-hidden flex flex-col items-center justify-center shadow-inner cursor-pointer group hover:border-white/20 transition-all"
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[1]" />
                            <div className="relative z-10 flex flex-col items-center gap-2">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white group-hover:bg-white/10 group-hover:scale-105 transition-all select-none">
                                <Play className="h-4 w-4 fill-white ml-0.5" />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="p-2 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                          <span className="truncate max-w-[70%]">Streaming: {selectedSource.file}</span>
                          {status === "playing" || status === "connecting" ? (
                            <Button 
                              variant="ghost" 
                              size="xs" 
                              onClick={handleReset}
                              className="h-auto p-0 text-[9px] text-zinc-500 hover:text-white hover:bg-transparent"
                            >
                              Reset
                            </Button>
                          ) : (
                            <span>Buffering &lt;3s</span>
                          )}
                        </div>
                      </div>

                      <div className="md:col-span-5 flex flex-col gap-3">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Available Streams</span>
                        
                        <div className="flex flex-col gap-2">
                          <div 
                            onClick={() => {
                              setSelectedSource({
                                file: "Sintel.2010.1080p.mkv",
                                addon: "Blender Open Movies",
                                size: "650 MB",
                                videoUrl: "/sintel.webm"
                              })
                              handleStream()
                            }}
                            className={`flex flex-col gap-1 p-2 rounded-lg border transition-all cursor-pointer ${
                              selectedSource.file === "Sintel.2010.1080p.mkv" && (status === "playing" || status === "connecting")
                                ? "bg-white/[0.06] border-white/20"
                                : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                            }`}
                          >
                            <span className="text-[10px] font-semibold text-white font-mono truncate">Sintel.2010.1080p.mkv</span>
                            <div className="flex items-center justify-between text-[9px] text-zinc-400 font-mono">
                              <span>Blender Open Movies</span>
                              <span>650 MB</span>
                            </div>
                          </div>

                          <div 
                            onClick={() => {
                              setSelectedSource({
                                file: "BigBuckBunny.2008.1080p.mkv",
                                addon: "Creative Commons Feed",
                                size: "276 MB",
                                videoUrl: "/bunny.webm"
                              })
                              handleStream()
                            }}
                            className={`flex flex-col gap-1 p-2 rounded-lg border transition-all cursor-pointer ${
                              selectedSource.file === "BigBuckBunny.2008.1080p.mkv" && (status === "playing" || status === "connecting")
                                ? "bg-white/[0.06] border-white/20"
                                : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                            }`}
                          >
                            <span className="text-[10px] font-semibold text-zinc-350 font-mono truncate">BigBuckBunny.2008.1080p.mkv</span>
                            <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono">
                              <span>Creative Commons Feed</span>
                              <span>276 MB</span>
                            </div>
                          </div>

                          <div 
                            onClick={() => {
                              setSelectedSource({
                                file: "TearsOfSteel.2012.720p.mkv",
                                addon: "Archive.org Feed",
                                size: "543 MB",
                                videoUrl: "/tears.webm"
                              })
                              handleStream()
                            }}
                            className={`flex flex-col gap-1 p-2 rounded-lg border transition-all cursor-pointer ${
                              selectedSource.file === "TearsOfSteel.2012.720p.mkv" && (status === "playing" || status === "connecting")
                                ? "bg-white/[0.06] border-white/20"
                                : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                            }`}
                          >
                            <span className="text-[10px] font-semibold text-zinc-350 font-mono truncate">TearsOfSteel.2012.720p.mkv</span>
                            <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono">
                              <span>Archive.org Feed</span>
                              <span>543 MB</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    role="tabpanel"
                    id="panel-magnets"
                    aria-labelledby="trigger-magnets"
                    className={`col-start-1 row-start-1 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeTab === "magnets"
                        ? "opacity-100 translate-x-0 pointer-events-auto blur-0 scale-100"
                        : "opacity-0 translate-x-8 pointer-events-none blur-sm scale-98"
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      <div className="md:col-span-7 flex flex-col gap-2">
                        {status === "playing" ? (
                          <div className="relative aspect-video w-full rounded-xl bg-black border border-white/10 overflow-hidden shadow-inner">
                            <video
                              src="/sintel.webm"
                              autoPlay
                              loop
                              muted
                              playsInline
                              controls
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : status === "connecting" ? (
                          <div className="relative aspect-video w-full rounded-xl bg-black border border-white/10 overflow-hidden flex flex-col items-center justify-center shadow-inner py-8 h-[166px]">
                            <div className="h-8 w-8 rounded-full border-2 border-zinc-700 border-t-zinc-350 animate-spin" />
                            <span className="text-[10px] font-mono text-zinc-400 mt-2">Connecting to swarm...</span>
                          </div>
                        ) : (
                          <div 
                            onClick={handleStream}
                            className="relative aspect-video w-full rounded-xl bg-black border border-white/10 overflow-hidden flex flex-col items-center justify-center shadow-inner cursor-pointer group hover:border-white/20 transition-all"
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[1]" />
                            <div className="relative z-10 flex flex-col items-center gap-2">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white group-hover:bg-white/10 group-hover:scale-105 transition-all select-none">
                                <Play className="h-4 w-4 fill-white ml-0.5" />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="p-2 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                          <span className="truncate max-w-[70%]">Magnet: Sintel.2010.480p.mp4</span>
                          {status === "playing" || status === "connecting" ? (
                            <Button 
                              variant="ghost" 
                              size="xs" 
                              onClick={handleReset}
                              className="h-auto p-0 text-[9px] text-zinc-500 hover:text-white hover:bg-transparent"
                            >
                              Reset
                            </Button>
                          ) : (
                            <span>Ready to Stream</span>
                          )}
                        </div>
                      </div>

                      <div className="md:col-span-5 flex flex-col gap-3">
                        {status === "playing" ? (
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-col border border-white/10 bg-zinc-950/40 rounded-xl overflow-hidden">
                              <div className="border-b border-white/10 py-2 px-3 bg-white/[0.01] flex items-center justify-between">
                                <span className="text-[10px] font-semibold font-mono text-zinc-300">Active Torrent Stream</span>
                                <Button 
                                  variant="ghost"
                                  size="xs"
                                  onClick={handleReset}
                                  className="h-auto p-0 text-[9px] font-mono text-zinc-500 hover:text-white hover:bg-transparent"
                                >
                                  Reset Player
                                </Button>
                              </div>
                              
                              <div className="p-3 flex flex-col gap-1 font-mono text-[9px] text-zinc-500">
                                <div className="flex justify-between text-zinc-300">
                                  <span>File: Sintel.2010.480p.mp4</span>
                                  <span>4.2 GB / 669 kbps</span>
                                </div>
                                <div className="flex justify-between mt-1">
                                  <span className="flex items-center gap-1">
                                    <Activity className="w-3 h-3" /> 126 seeds
                                  </span>
                                  <span>Download: 8.4 MB/s</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1.5 mt-1">
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Magnet URI</span>
                              <input
                                type="text"
                                readOnly
                                value={magnetLink}
                                className="w-full bg-black border border-white/10 rounded-lg px-2.5 py-1.5 text-[9px] font-mono text-zinc-400 select-all focus:outline-none"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                              <label className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                                Add Torrent Magnet Link
                              </label>
                              <input
                                type="text"
                                readOnly
                                value={magnetLink}
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-xs font-mono text-zinc-350 select-all focus:outline-none"
                              />
                            </div>
                            
                            <Button
                              variant="secondary"
                              onClick={handleStream}
                              disabled={status === "connecting"}
                              className="w-full font-mono text-xs"
                            >
                              {status === "connecting" ? "Connecting to Swarm..." : "Stream Magnet Link"}
                            </Button>

                            <div className="border-t border-white/5 pt-4">
                              <p className="text-[10px] font-mono text-zinc-500 leading-relaxed">
                                Inputting a torrent magnet link connects your browser player directly to the peer-to-peer network to start streaming.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </Tabs>
          </div>
        </div>

        <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-6 backdrop-blur-sm">
          <div className="flex gap-4 items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold text-white font-mono">Legal Disclaimer & Compliance</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Fluxstream is a pure software-only media player and link parsing engine. It does not index, host, distribute, or facilitate access to copyrighted or unlicensed media files. The project does not maintain or verify the legality of third-party media providers. Users are solely responsible for ensuring that all addon configurations link exclusively to legally sourced content in accordance with their respective local laws. Fluxstream disclaims all liability for unauthorized or illegal content accessed via user configurations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
