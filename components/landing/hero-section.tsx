"use client"

import { useEffect, useState, useRef, Fragment } from "react"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Button } from "../ui/button"
import { handleScroll } from "../../lib/utils"

const words = ["flow", "stream"]

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split("")
  const STAGGER = 45
  const DURATION = 500
  const GRADIENT_HOLD = STAGGER * letters.length + DURATION + 200

  const [letterStates, setLetterStates] = useState<{ opacity: number; blur: number }[]>(
    letters.map(() => ({ opacity: 0, blur: 20 }))
  )
  const [showGradient, setShowGradient] = useState(true)
  const framesRef = useRef<number[]>([])
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    framesRef.current.forEach(cancelAnimationFrame)
    timersRef.current.forEach(clearTimeout)
    framesRef.current = []
    timersRef.current = []

    setLetterStates(letters.map(() => ({ opacity: 0, blur: 20 })))
    setShowGradient(true)

    letters.forEach((_, i) => {
      const t = setTimeout(() => {
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setLetterStates(prev => {
            const next = [...prev]
            next[i] = { opacity: eased, blur: 20 * (1 - eased) }
            return next
          })
          if (progress < 1) {
            const id = requestAnimationFrame(tick)
            framesRef.current.push(id)
          }
        }
        const id = requestAnimationFrame(tick)
        framesRef.current.push(id)
      }, i * STAGGER)
      timersRef.current.push(t)
    })

    const gt = setTimeout(() => setShowGradient(false), GRADIENT_HOLD)
    timersRef.current.push(gt)

    return () => {
      framesRef.current.forEach(cancelAnimationFrame)
      timersRef.current.forEach(clearTimeout)
    }
  }, [trigger])

  const gradientColors = ["#f78da7", "#fda4af", "#c084fc", "#f43f5e", "#ffe4e6", "#f78da7"]

  return (
    <>
      {letters.map((char, i) => {
        const colorIndex = (i / Math.max(letters.length - 1, 1)) * (gradientColors.length - 1)
        const lower = Math.floor(colorIndex)
        const upper = Math.min(lower + 1, gradientColors.length - 1)
        const t = colorIndex - lower

        const hex2rgb = (hex: string) => {
          const r = parseInt(hex.slice(1, 3), 16)
          const g = parseInt(hex.slice(3, 5), 16)
          const b = parseInt(hex.slice(5, 7), 16)
          return [r, g, b]
        }
        const [r1, g1, b1] = hex2rgb(gradientColors[lower])
        const [r2, g2, b2] = hex2rgb(gradientColors[upper])
        const r = Math.round(r1 + (r2 - r1) * t)
        const g = Math.round(g1 + (g2 - g1) * t)
        const b = Math.round(b1 + (b2 - b1) * t)

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: letterStates[i]?.opacity ?? 0,
              filter: `blur(${letterStates[i]?.blur ?? 20}px)`,
              color: showGradient ? `rgb(${r},${g},${b})` : "white",
              transition: "color 0.4s ease",
            }}
          >
            {char}
          </span>
        )
      })}
    </>
  )
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<"unix" | "windows">("unix")
  const [copied, setCopied] = useState(false)

  const unixCommand = "curl -fsSL https://raw.githubusercontent.com/scythe504/fluxstream/main/scripts/install.sh | bash"
  const windowsCommand = "irm https://raw.githubusercontent.com/scythe504/fluxstream/main/scripts/install.ps1 | iex"

  const currentCommand = activeTab === "unix" ? unixCommand : windowsCommand

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const stats = [
    { value: "100%", label: "open source & free" },
    { value: "DHT/PEX", label: "trackerless peer discovery" },
    { value: "<5s", label: "average start latency" },
  ]

  return (
    <>
      <section id="hero" className="relative min-h-screen flex flex-col justify-start pt-20 md:pt-28 items-start overflow-hidden bg-black pb-16">
        <div className="absolute inset-0 z-0 bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="w-full h-full object-cover opacity-85 mix-blend-screen"
          >
            <source src="/bg-hero.webm" type="video/webm" />
          </video>
        </div>

        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute h-px bg-white/10"
              style={{
                top: `${12.5 * (i + 1)}%`,
                left: 0,
                right: 0,
              }}
            />
          ))}
          {[...Array(12)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute w-px bg-white/10"
              style={{
                left: `${8.33 * (i + 1)}%`,
                top: 0,
                bottom: 0,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex-1 flex flex-col justify-between">
          <div className="lg:max-w-[65%] flex flex-col gap-6">
            <div 
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-flex items-center gap-3 text-sm font-mono text-zinc-400">
                <span className="w-8 h-px bg-white/30" />
                <Sparkles className="h-4 w-4 text-white/60" />
                Open Source Torrent Streaming
              </span>
            </div>

            <div className="mb-4">
              <h1 
                className={`text-left text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <span className="block whitespace-nowrap font-medium" style={{ color: '#f78da7' }}>fluxstream,</span>
                <span className="block whitespace-nowrap text-zinc-400 mt-2">
                  torrents that{" "}
                  <span className="relative inline-block text-white min-w-[200px]">
                    <BlurWord word={words[wordIndex]} trigger={wordIndex} />
                  </span>
                </span>
              </h1>
            </div>

            <div 
              className={`w-full max-w-xl rounded-xl border border-white/10 bg-zinc-950/80 backdrop-blur-md shadow-2xl p-4 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setActiveTab("unix")}
                    className={`text-xs font-mono px-2.5 py-1 rounded transition-colors`}
                    variant={activeTab === "unix" ? "default" : "secondary"}
                    >
                    Linux / macOS
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("windows")}
                    className={`text-xs font-mono px-2.5 py-1 rounded transition-colors}`}
                    variant={activeTab === "windows" ? "default" : "secondary"}
                  >
                    Windows
                  </Button>
                </div>
                
                <Link 
                  href="#cli-commands"
                  onClick={(e) => handleScroll(e, "cli-commands")}
                  className="text-xs font-mono px-2 py-0.5 rounded text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  Explore CLI →
                </Link>
              </div>

              <div className="flex items-center justify-between gap-3 bg-black/40 rounded-lg p-3 border border-white/5 font-mono text-xs overflow-x-auto scrollbar-hide">
                <div className="text-zinc-300 select-all whitespace-nowrap overflow-x-auto scrollbar-hide flex-1">
                  {activeTab === "unix" ? (
                    <span className="flex items-center gap-1.5">
                      <span className="text-pink-400 font-bold">➜</span>
                      <span className="text-cyan-400 font-semibold">~</span>
                      <span className="text-cyan-400">curl</span>
                      <span className="text-yellow-500">-fsSL</span>
                      <span className="text-zinc-300">https://raw.githubusercontent.com/scythe504/fluxstream/main/scripts/install.sh</span>
                      <span className="text-zinc-500">|</span>
                      <span className="text-cyan-400">bash</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <span className="text-cyan-400 font-bold">PS</span>
                      <span className="text-zinc-500">&gt;</span>
                      <span className="text-cyan-400">irm</span>
                      <span className="text-zinc-300">https://raw.githubusercontent.com/scythe504/fluxstream/main/scripts/install.ps1</span>
                      <span className="text-zinc-500">|</span>
                      <span className="text-cyan-400">iex</span>
                    </span>
                  )}
                </div>
                <Button 
                  onClick={handleCopy}
                  variant={"ghost"}
                  className="shrink-0 p-1.5 rounded hover:bg-white/5 text-zinc-400 hover:text-white transition-all duration-200"
                  title="Copy Command"
                >
                  {copied ? (
                    <span className="text-[10px] text-pink-400 font-semibold px-1">Copied</span>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between gap-8 flex-wrap mt-12 border-t border-white/10 pt-6">
              <div className="flex items-center gap-8 lg:gap-16 flex-wrap">
                {stats.map((stat, i) => (
                  <Fragment key={stat.label}>
                    {i > 0 && <div className="h-8 w-px bg-white/10 hidden sm:block" aria-hidden="true" />}
                    <div className="flex flex-col">
                      <span className="text-xl lg:text-2xl font-bold text-white leading-none">{stat.value}</span>
                      <span className="text-xs text-white/50 mt-2 leading-tight">{stat.label}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
