import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { ContentStreaming } from "@/components/landing/content-streaming"
import { SwarmSimulator } from "@/components/landing/swarm-simulator"
import { CliReference } from "@/components/landing/cli-reference"
import { SystemRequirements } from "@/components/landing/system-requirements"
import { TechnicalDetails } from "@/components/landing/technical-details"
import { SystemNotes } from "@/components/landing/system-notes"
import { DocumentNavigator } from "@/components/landing/document-navigator"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Fluxstream - Open Source Torrent Media Player",
  description: "Fluxstream is a sleek, self-hosted media client for torrent libraries. Instantly stream Creative Commons open movies, public domain media, or your legally owned personal torrent backups directly on-the-fly.",
  keywords: [
    "torrent media player",
    "realtime streaming",
    "open source",
    "video player",
    "magnet link player",
    "instant playback",
    "fluxstream",
    "personal media streaming",
    "public domain media",
    "legal torrent streaming"
  ],
  openGraph: {
    title: "Fluxstream - Open Source Torrent Media Player",
    description: "Stream Creative Commons open movies, public domain video feeds, or personal backups instantly on-the-fly using the open-source Fluxstream self-hosted client.",
    type: "website",
  }
}

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <DocumentNavigator />
      <main className="flex-1">
        <HeroSection />
        <ContentStreaming />
        <SwarmSimulator />
        <SystemRequirements />
        <CliReference />
        <TechnicalDetails />
        <SystemNotes />
      </main>
      <Footer />
    </div>
  )
}
