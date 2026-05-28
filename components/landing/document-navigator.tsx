"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const outlineItems = [
  { id: "hero", label: "Overview" },
  { id: "content-streaming", label: "Interactive Demo" },
  { id: "swarm-simulator", label: "Swarm Simulator" },
  { id: "system-requirements", label: "Requirements" },
  { id: "cli-commands", label: "CLI Reference" },
  { id: "technical-details", label: "Technical Specs" },
  { id: "system-notes", label: "Under the Hood" }
]

export function DocumentNavigator() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    outlineItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => {
      outlineItems.forEach((item) => {
        const el = document.getElementById(item.id)
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const element = document.getElementById(id)
    if (element) {
      e.preventDefault()
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <aside className="fixed left-[calc(50%-46rem)] top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col gap-6 w-48 select-none">
      <div className="flex flex-col gap-4">
        <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest pl-4">
          Outline
        </span>
        <nav className="relative flex flex-col gap-3 text-xs font-mono">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/5" />
          {outlineItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => handleScroll(e, item.id)}
                className={`text-left pl-5 py-0.5 relative transition-all duration-300 ${
                  isActive 
                    ? "text-pink-400 font-semibold before:bg-pink-400 before:scale-100" 
                    : "text-zinc-500 hover:text-zinc-355 before:bg-zinc-700 before:scale-75 hover:before:bg-zinc-500"
                } before:absolute before:left-[5px] before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:transition-all before:duration-300`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
