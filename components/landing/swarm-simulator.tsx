"use client"

import { useState, useEffect, useRef } from "react"
import { Activity, Play, RotateCcw, AlertTriangle, ShieldCheck, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SwarmSimulator() {
  const [mode, setMode] = useState<"sequential" | "random">("sequential")
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState<number[]>([])
  const [seekIndex, setSeekIndex] = useState<number | null>(null)
  const [currentBlock, setCurrentBlock] = useState<number | null>(null)
  const [isSeeking, setIsSeeking] = useState(false)
  const [downloadSpeed, setDownloadSpeed] = useState("3.4 MB/s")
  const [hasInteracted, setHasInteracted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const blockCount = 24

  const initializeBlocks = () => {
    setProgress(new Array(blockCount).fill(0))
    setSeekIndex(null)
    setCurrentBlock(null)
    setDownloadSpeed("3.4 MB/s")
    setHasInteracted(false)
  }

  useEffect(() => {
    initializeBlocks()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [mode])

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    if (timerRef.current) clearInterval(timerRef.current)

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = [...prev]

        if (mode === "sequential") {
          const startFrom = seekIndex !== null ? seekIndex : 0
          
          let allRemainingFilled = true
          let targetIndex = -1
          
          for (let checkIdx = startFrom; checkIdx < blockCount; checkIdx++) {
            if (next[checkIdx] === 0) {
              allRemainingFilled = false
              targetIndex = checkIdx
              break
            }
          }

          if (allRemainingFilled) {
            if (hasInteracted) {
              setIsPlaying(false)
              setCurrentBlock(null)
              return prev
            } else {
              setSeekIndex(null)
              return new Array(blockCount).fill(0)
            }
          }

          if (targetIndex !== -1) {
            next[targetIndex] = 1
            setCurrentBlock(targetIndex)
          }
        } else {
          const emptyIndices = next
            .map((val, idx) => (val === 0 ? idx : -1))
            .filter((idx) => idx !== -1)
          
          if (emptyIndices.length === 0) {
            setIsPlaying(false)
            setCurrentBlock(null)
            return prev
          }

          const randomSelect = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
          next[randomSelect] = 1
          setCurrentBlock(randomSelect)
        }
        return next
      })
    }, 350)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, mode, seekIndex, hasInteracted])

  const handleBlockClick = (index: number) => {
    setSeekIndex(index)
    setIsSeeking(true)
    setHasInteracted(true)
    setIsPlaying(true)
    setDownloadSpeed("14.2 MB/s")

    if (mode === "sequential") {
      setProgress((prev) => {
        const next = [...prev]
        for (let i = index; i < blockCount; i++) {
          next[i] = 0
        }
        return next
      })
    }

    setTimeout(() => {
      setIsSeeking(false)
    }, 1000)

    setTimeout(() => {
      setDownloadSpeed(mode === "sequential" ? "3.8 MB/s" : "2.1 MB/s")
    }, 2500)
  }

  const handleReset = () => {
    initializeBlocks()
    setIsPlaying(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const isTargetBuffered = () => {
    const start = seekIndex !== null ? seekIndex : 0
    if (mode === "sequential") {
      for (let i = 0; i < 4; i++) {
        const checkIdx = (start + i) % blockCount
        if (progress[checkIdx] !== 1) return false
      }
      return true
    } else {
      return progress[start] === 1
    }
  }

  const activeBuffered = isTargetBuffered()
  const currentTargetBlock = seekIndex !== null ? seekIndex : 0

  const peers = [
    { x: 60, y: 60, speed: "2.4 MB/s", name: "US-East-1" },
    { x: 200, y: 30, speed: "1.8 MB/s", name: "EU-West-3" },
    { x: 340, y: 60, speed: "3.1 MB/s", name: "AP-East-1" },
    { x: 40, y: 150, speed: "850 KB/s", name: "Peer-Local" },
    { x: 360, y: 150, speed: "4.2 MB/s", name: "Seed-Node" },
    { x: 80, y: 240, speed: "1.1 MB/s", name: "EU-Central" },
    { x: 200, y: 270, speed: "920 KB/s", name: "SA-East-1" },
    { x: 320, y: 240, speed: "2.8 MB/s", name: "US-West-2" }
  ]

  return (
    <section id="swarm-simulator" className="relative w-full bg-black border-t border-white/10 py-24 px-6 scroll-mt-14 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[30%] left-[5%] w-[50%] h-[50%] rounded-full bg-pink-500/[0.03] blur-[120px]" />
        <div className="absolute bottom-[30%] right-[5%] w-[50%] h-[50%] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-mono text-pink-400 font-semibold tracking-wide uppercase">
            Distribution Architecture
          </h2>
          <h3 className="text-3xl font-bold text-white tracking-tight">
            Interactive Swarm Simulator
          </h3>
          <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
            Test how video seeking works. Click on any block in the buffer map below to seek to that timestamp and watch how the downloader responds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-5 flex flex-col gap-6 bg-zinc-950/40 border border-white/5 p-6 rounded-2xl backdrop-blur-sm justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Simulation Settings</span>
                <h4 className="text-lg font-bold text-white font-mono">Select Loading Strategy</h4>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => setMode("sequential")}
                  variant="outline"
                  className={`w-full h-auto text-left items-start flex-col p-4 rounded-xl font-mono whitespace-normal ${
                    mode === "sequential"
                      ? "border-pink-500/30 bg-pink-500/[0.03] text-white hover:bg-pink-500/[0.05]"
                      : "border-white/5 bg-transparent text-zinc-500 hover:text-zinc-400 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className="text-xs font-semibold">Sequential Streaming</span>
                    {mode === "sequential" && <div className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-pulse" />}
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-normal font-normal">
                    Prioritizes downloading from your active seek point forward. Restarts streaming in seconds when skipping chapters.
                  </p>
                </Button>

                <Button
                  onClick={() => setMode("random")}
                  variant="outline"
                  className={`w-full h-auto text-left items-start flex-col p-4 rounded-xl font-mono whitespace-normal ${
                    mode === "random"
                      ? "border-zinc-700 bg-zinc-900/[0.05] text-white hover:bg-zinc-900/[0.08]"
                      : "border-white/5 bg-transparent text-zinc-500 hover:text-zinc-400 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className="text-xs font-semibold">Traditional Torrenting</span>
                    {mode === "random" && <div className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-pulse" />}
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-normal font-normal">
                    Maintains random chunk distribution. Seeking stalls playback indefinitely because target pieces aren't prioritized.
                  </p>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/5 pt-6 mt-6">
              <div className="flex flex-col gap-2 font-mono text-[10px]">
                <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                  <span className="text-zinc-500">SEEK TARGET</span>
                  <span className="text-white font-semibold">
                    Block {currentTargetBlock} ({formatTime(currentTargetBlock * 30)})
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                  <span className="text-zinc-500">ACTIVE DOWNLOAD</span>
                  <span className="text-zinc-300">
                    {currentBlock !== null ? `Block ${currentBlock} (${formatTime(currentBlock * 30)})` : "Idle"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                  <span className="text-zinc-500">DOWNLOAD SPEED</span>
                  <span className="text-cyan-400 font-semibold">{downloadSpeed}</span>
                </div>
                <div className="flex justify-between pb-1.5">
                  <span className="text-zinc-500">PLAYBACK STATE</span>
                  {activeBuffered ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 animate-pulse" /> PLAYING
                    </span>
                  ) : (
                    <span className="text-amber-500 font-semibold flex items-center gap-1 animate-pulse">
                      <AlertTriangle className="h-3 w-3" /> BUFFERING
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex-1 font-mono text-xs"
                >
                  <Play className={`h-3 w-3 ${isPlaying ? "fill-white" : ""}`} />
                  {isPlaying ? "Pause" : "Resume"}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReset}
                  title="Reset Simulation"
                >
                  <RotateCcw className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 bg-zinc-950/40 border border-white/5 p-6 rounded-2xl backdrop-blur-sm justify-between">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-white">
                <Activity className="h-4 w-4 text-pink-400 animate-pulse" />
                <span>DHT Peer Connection Map</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">8 nodes connected</span>
            </div>

            <div className="relative w-full aspect-[4/3] bg-black/40 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
                {peers.map((peer, idx) => (
                  <line
                    key={`line-${idx}`}
                    x1={peer.x}
                    y1={peer.y}
                    x2={200}
                    y2={150}
                    stroke={mode === "sequential" ? "rgba(247,141,167,0.12)" : "rgba(255,255,255,0.04)"}
                    strokeWidth={mode === "sequential" ? "1.5" : "1"}
                  />
                ))}

                {isPlaying && peers.map((peer, idx) => (
                  <circle key={`dot-${idx}`} r="3.5" fill={mode === "sequential" ? "#f78da7" : "#52525b"}>
                    <animateMotion
                      dur={`${1.2 + idx * 0.15}s`}
                      repeatCount="indefinite"
                      path={`M ${peer.x} ${peer.y} L 200 150`}
                    />
                  </circle>
                ))}

                {isSeeking && (
                  <circle cx={200} cy={150} r="16" fill="none" stroke={mode === "sequential" ? "#f78da7" : "#f59e0b"} strokeWidth="2" className="animate-ping" />
                )}

                {peers.map((peer, idx) => (
                  <g key={`peer-${idx}`}>
                    <circle cx={peer.x} cy={peer.y} r="5" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                    <circle cx={peer.x} cy={peer.y} r="2" fill={mode === "sequential" ? "#f78da7" : "#52525b"} />
                  </g>
                ))}

                <circle cx={200} cy={150} r="16" fill="#18181b" stroke={mode === "sequential" ? "#f78da7" : "#52525b"} strokeWidth="2" className="animate-pulse" />
                <circle cx={200} cy={150} r="6" fill={mode === "sequential" ? "#f78da7" : "#52525b"} />
              </svg>

              <div className="absolute top-3 left-3 flex flex-col gap-1 text-[8px] font-mono text-zinc-500 bg-black/60 px-2 py-1 rounded border border-white/5">
                <span>PEER DENSITY: High</span>
                <span>AVERAGE PING: 24ms</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  Buffer Timeline
                  <span title="Click any block to seek" className="inline-flex"><HelpCircle className="h-3 w-3 text-zinc-500 hover:text-zinc-400 transition-colors" /></span>
                </span>
                <span>{progress.filter(b => b === 1).length} / {blockCount} blocks</span>
              </div>

              <div className="grid grid-cols-24 gap-1 w-full bg-zinc-950 p-1.5 rounded-lg border border-white/5">
                {progress.map((val, idx) => {
                  const isSeekTarget = seekIndex === idx
                  return (
                    <Button
                      key={idx}
                      onClick={() => handleBlockClick(idx)}
                      variant="ghost"
                      className={`h-auto p-0 min-w-0 aspect-[1/2] rounded-sm transition-all duration-300 relative group cursor-pointer border ${
                        val === 1
                          ? mode === "sequential"
                            ? "bg-pink-400/90 border-pink-400/40 hover:bg-pink-400/90 shadow-[0_0_8px_rgba(247,141,167,0.3)]"
                            : "bg-zinc-500 border-zinc-500/30 hover:bg-zinc-500"
                          : isSeekTarget
                            ? "bg-amber-500/20 border-amber-500/60 hover:bg-amber-500/20 animate-pulse"
                            : "bg-white/[0.02] border-transparent hover:border-white/10 hover:bg-white/[0.05]"
                      }`}
                      title={`Seek to ${formatTime(idx * 30)} (Block ${idx})`}
                    />
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
