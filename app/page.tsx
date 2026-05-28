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
  title: "Fluxstream - Open Source Torrent Streaming Engine",
  description: "Fluxstream is a high-performance, open-source torrent streaming engine. Watch anime, movies, series, and video providers directly on-the-fly without waiting for complete file downloads.",
  keywords: [
    "torrent streaming engine",
    "open source",
    "video streaming",
    "stream anime",
    "stream movies",
    "stream series",
    "magnet link player",
    "instant playback",
    "fluxstream",
    "media providers"
  ],
  openGraph: {
    title: "Fluxstream - Open Source Torrent Streaming Engine",
    description: "Watch movies, series, and anime instantly on-the-fly using the open-source Fluxstream torrent engine.",
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
