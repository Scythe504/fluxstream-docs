"use client"

import Link from "next/link"
import { Play, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { handleScroll } from "@/lib/utils"

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

export function Navbar() {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center text-lg font-bold tracking-wide text-[#f78da7] hover:opacity-80 transition-opacity">
          <span>fluxstream</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/docs" className="transition-colors hover:text-foreground">
            Documentation
          </Link>
          <Link 
            href="/#content-streaming" 
            onClick={(e) => handleScroll(e, "content-streaming")}
            className="transition-colors hover:text-foreground"
          >
            Streaming
          </Link>
          <Link 
            href="/#cli-commands" 
            onClick={(e) => handleScroll(e, "cli-commands")}
            className="transition-colors hover:text-foreground"
          >
            CLI Commands
          </Link>
          <Link 
            href="/#system-notes" 
            onClick={(e) => handleScroll(e, "system-notes")}
            className="transition-colors hover:text-foreground"
          >
            FAQ - Deep Dive
          </Link>
          <Link 
            href="/#technical-details" 
            onClick={(e) => handleScroll(e, "technical-details")}
            className="transition-colors hover:text-foreground"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex" asChild>
            <Link 
              href="https://github.com/scythe504/fluxstream" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Fluxstream GitHub Repository"
            >
              <GithubIcon className="h-5 w-5" />
            </Link>
          </Button>

          <Button size="sm" asChild>
            <Link 
              href="/#system-requirements"
              onClick={(e) => handleScroll(e, "system-requirements")}
            >
              Get Started
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
