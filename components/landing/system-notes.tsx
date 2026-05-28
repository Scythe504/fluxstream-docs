"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function SystemNotes() {
  const faqs = [
    {
      value: "online-service",
      question: "Is it available online?",
      answer: "No, unlike other streaming services like Netflix, the server must be run locally to stream anything."
    },
    {
      value: "player-compatibility",
      question: "Do I need an external media player?",
      answer: "No, videos are designed to stream directly in the browser-based web client. External player support (like VLC) is not native. Copying stream URLs to VLC may lead to unstable playback, as third-party players often fail to read incomplete torrent partition files cleanly."
    },
    {
      value: "cache-storage",
      question: "Where are files cached and stored?",
      answer: "Files are cached directly to local directories during playback. Running the setup command in your terminal will output the configuration paths and active download directories on your host machine."
    },
    {
      value: "privacy-policy",
      question: "What is the privacy and telemetry policy?",
      answer: "The engine has zero tracking telemetry and does not collect or transmit user data. It does not scan your local device's files, and contains no analytics scripts. Logger features only write crash logs locally to aid error troubleshooting. The code and Docker configurations are open and auditable."
    },
    {
      value: "ip-visibility",
      question: "Is my IP address visible to torrent swarms?",
      answer: "Yes. Fluxstream streams video data by connecting directly to public peer-to-peer swarms. Your IP address will be visible to other peers participating in the transfer. To secure your network identity, running the server daemon through a local VPN configuration is recommended."
    },
    {
      value: "no-peers",
      question: "What happens to older torrents with no peers?",
      answer: "Since Fluxstream relies on real-time peer sharing to retrieve media blocks, torrent files with zero active seeds will fail to buffer or play. Caching fallbacks (such as Real-Debrid link resolution) are currently not supported in the codebase."
    }
  ]

  return (
    <section id="system-notes" className="relative w-full bg-black border-t border-white/10 py-24 px-6 scroll-mt-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h2 className="text-sm font-mono text-pink-400 font-semibold tracking-wide">
            Deep Dive
          </h2>
          <h3 className="text-3xl font-bold text-white tracking-tight">
            Under the Hood
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Clarifications on architecture, storage management, privacy, and media playback operations.
          </p>
        </div>

        <div className="w-full border border-white/5 bg-zinc-950/40 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.value} value={faq.value} className="border-white/5 last:border-b-0">
                <AccordionTrigger className="text-sm font-semibold text-white font-mono hover:text-pink-400 py-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-zinc-400 leading-relaxed font-mono pt-1 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  )
}
