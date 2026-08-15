"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowLeft,
  Settings2,
  Copy,
  Check,
} from "lucide-react"

// Types matching the backend struct
interface Provider {
  id: string
  provider_name: string
  provider_url: string
  verification_pending: boolean
  version: string
  verified_at?: number | null
  provider_type: string
  disable_optional: boolean
  created_at: number
}

const DEFAULT_BACKEND_URL = "https://providers.fluxstream.app"

function ProviderFormAndStatus() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const providerId = searchParams.get("id")

  // Configurable backend URL state
  const [backendUrl, setBackendUrl] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fluxstream_backend_url")
      if (saved) return saved
    }
    return process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_BACKEND_URL
  })
  const [isEditingBackend, setIsEditingBackend] = useState(false)
  const [tempBackendUrl, setTempBackendUrl] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fluxstream_backend_url")
      if (saved) return saved
    }
    return process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_BACKEND_URL
  })

  // Form states
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [type, setType] = useState("anime")
  const [disableOptional, setDisableOptional] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Status check states
  const [provider, setProvider] = useState<Provider | null>(null)
  const [statusError, setStatusError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  // Save backend URL
  const saveBackendUrl = () => {
    const cleaned = tempBackendUrl.trim().replace(/\/+$/, "")
    const target = cleaned || process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_BACKEND_URL
    localStorage.setItem("fluxstream_backend_url", target)
    setBackendUrl(target)
    setTempBackendUrl(target)
    setIsEditingBackend(false)
  }

  const resetBackendUrl = () => {
    localStorage.removeItem("fluxstream_backend_url")
    const target = process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_BACKEND_URL
    setBackendUrl(target)
    setTempBackendUrl(target)
    setIsEditingBackend(false)
  }

  // Handle provider registration submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    try {
      const response = await fetch(`${backendUrl}/api/providers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider_name: name,
          provider_url: url,
          provider_type: type,
          disable_optional: disableOptional,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Registration error response:", { status: response.status, errorText })
        throw new Error(errorText || `Request failed with status ${response.status}`)
      }

      const data: Provider = await response.json()
      // Redirect to the status view by setting the query parameter
      router.push(`/provider?id=${data.id}`)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to register provider. Make sure your registry backend is running."
      setFormError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Poll for provider status verification
  useEffect(() => {
    if (!providerId) {
      return
    }

    let isMounted = true

    const fetchStatus = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/providers/${providerId}`)
        if (!response.ok) {
          throw new Error("Provider not found or registry connection failed")
        }
        const data: Provider = await response.json()
        if (isMounted) {
          setProvider(data)
          setStatusError(null)
        }

        // Stop polling if verification is complete (either succeeded or failed)
        if (!data.verification_pending) {
          clearInterval(intervalId)
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : "Failed to retrieve status"
          setStatusError(message)
        }
      }
    }

    void fetchStatus()
    // Poll every 2 seconds
    const intervalId = setInterval(() => {
      void fetchStatus()
    }, 2000)

    return () => {
      isMounted = false
      clearInterval(intervalId)
    }
  }, [providerId, backendUrl, retryCount])

  const copyToClipboard = () => {
    if (provider?.id) {
      navigator.clipboard.writeText(provider.id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Verification checklist of 10 endpoints
  const verifications = [
    { name: "Search", path: "/api/search", isOptional: false },
    { name: "Episode List", path: "/api/:id/episodes", isOptional: false },
    { name: "Torrent Sources", path: "/api/:id/episodes/:number/sources", isOptional: false },
    { name: "Trending", path: "/api/trending", isOptional: true },
    { name: "Seasonal", path: "/api/seasonal", isOptional: true },
    { name: "Genre Query", path: "/api/genre", isOptional: true },
    { name: "Airing Feeds", path: "/api/airing", isOptional: true },
    { name: "Release Schedule", path: "/api/schedule", isOptional: true },
    { name: "Media Details", path: "/api/:id", isOptional: true },
    { name: "Recommendations", path: "/api/:id/recommendations", isOptional: true },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12">
        {/* Backend Registry Info & Config Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg border border-white/10 bg-zinc-900/40 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-[10px] uppercase font-semibold text-zinc-500 shrink-0">Registry Backend:</span>
            <code className="text-zinc-300 bg-zinc-950 px-2 py-0.5 rounded border border-white/5 truncate max-w-xs sm:max-w-md">
              {backendUrl}
            </code>
          </div>
          <button
            type="button"
            onClick={() => {
              setTempBackendUrl(backendUrl)
              setIsEditingBackend(!isEditingBackend)
            }}
            className="text-[11px] text-pink-400 hover:text-pink-300 flex items-center gap-1.5 shrink-0 transition-colors w-fit"
          >
            <Settings2 className="h-3.5 w-3.5" />
            {isEditingBackend ? "Close Settings" : "Configure Backend"}
          </button>
        </div>

        {isEditingBackend && (
          <div className="mb-6 p-4 rounded-lg border border-pink-500/20 bg-zinc-950/80 space-y-3 font-mono shadow-lg">
            <div className="text-xs font-semibold text-white">Custom Registry Backend Endpoint</div>
            <p className="text-[11px] text-zinc-400">
              Override the registry URL for this browser session to test against a local or custom instance.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={tempBackendUrl}
                onChange={(e) => setTempBackendUrl(e.target.value)}
                placeholder="https://providers.fluxstream.app"
                className="flex-1 bg-zinc-900 border border-white/10 rounded px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500/50"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={saveBackendUrl} className="text-xs h-8 cursor-pointer">
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={resetBackendUrl} className="text-xs h-8 border-white/10 text-zinc-400 hover:text-white cursor-pointer">
                  Reset Default
                </Button>
              </div>
            </div>
          </div>
        )}

        {!providerId ? (
          /* ==================== FORM VIEW ==================== */
          <Card className="border border-white/10 bg-zinc-950/50 backdrop-blur-md overflow-hidden relative shadow-xl shadow-pink-500/5">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>

            <CardHeader className="pt-8 pb-6">
              <CardTitle className="text-2xl font-bold tracking-tight text-white flex items-center gap-2 font-mono">
                Register Media Provider
              </CardTitle>
              <CardDescription className="text-zinc-400 font-mono text-xs">
                Submit your host URL to register it in the central registry and trigger the automated verification suite.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {formError && (
                  <div className="p-3.5 rounded-lg border border-red-500/20 bg-red-500/10 text-xs font-mono text-red-400 flex items-start gap-2.5">
                    <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono text-zinc-300 font-semibold uppercase tracking-wider block">
                    Provider Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. My Custom Torrent Catalog"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="url" className="text-xs font-mono text-zinc-300 font-semibold uppercase tracking-wider block">
                    Provider Endpoint URL
                  </label>
                  <input
                    id="url"
                    type="url"
                    required
                    placeholder="e.g. https://api.myprovider.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-colors"
                  />
                  <p className="text-[10px] font-mono text-zinc-500">
                    Must support JSON REST routes under this base URL. CORS policies are bypassed during playback.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="type" className="text-xs font-mono text-zinc-300 font-semibold uppercase tracking-wider block">
                      Provider Content Type
                    </label>
                    <select
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-zinc-900/60 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-colors [&>option]:bg-zinc-950"
                    >
                      <option value="anime">anime (Anime Collections)</option>
                      <option value="movies">movies (Standard Film Libraries)</option>
                      <option value="series">series (TV Show Collections)</option>
                      <option value="media">media (General Media Catalogs)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 border border-white/10 rounded-lg p-3 bg-zinc-950/40 select-none">
                    <input
                      id="disableOptional"
                      type="checkbox"
                      checked={disableOptional}
                      onChange={(e) => setDisableOptional(e.target.checked)}
                      className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-pink-600 focus:ring-pink-500"
                    />
                    <div className="flex flex-col">
                      <label htmlFor="disableOptional" className="text-xs font-mono text-zinc-200 font-medium cursor-pointer">
                        Disable Optional Routes
                      </label>
                      <span className="text-[9px] font-mono text-zinc-500">
                        Only verify Search, Episodes, & Sources contracts.
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Registering Provider...
                    </>
                  ) : (
                    "Register & Verify Provider"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          /* ==================== STATUS CHECK VIEW ==================== */
          <div className="space-y-6">
            {/* Header Details */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <button
                onClick={() => router.push("/provider")}
                className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors group w-fit"
              >
                <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Back to Registration
              </button>

              {provider && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono bg-zinc-950/60 border-white/10 text-zinc-400">
                    Type: {provider.provider_type}
                  </Badge>
                  {provider.disable_optional && (
                    <Badge variant="outline" className="font-mono bg-yellow-500/10 border-yellow-500/20 text-yellow-400">
                      Minimal Contract Mode
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {statusError ? (
              <div className="p-5 rounded-lg border border-red-500/20 bg-red-500/10 text-sm font-mono text-red-400 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 shrink-0" />
                  <span className="font-bold">Registry Lookup Error</span>
                </div>
                <p className="text-xs text-zinc-300">
                  Could not retrieve status for provider ID <code className="text-red-400 bg-red-950/20 px-1 py-0.5 rounded">{providerId}</code>.
                  Ensure the registry database connection is established at {backendUrl}.
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setStatusError(null)
                      setRetryCount((prev) => prev + 1)
                    }}
                    className="border-white/10 text-zinc-300 hover:text-white font-mono text-xs cursor-pointer"
                  >
                    Retry Verification Check
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/provider")}
                    className="border-red-500/20 text-red-400 hover:bg-red-500/10 font-mono text-xs cursor-pointer"
                  >
                    Return to Form
                  </Button>
                </div>
              </div>
            ) : !provider ? (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-400 font-mono">
                <Loader2 className="h-8 w-8 animate-spin text-pink-500 mb-3" />
                <span className="text-sm">Connecting to Registry Backend...</span>
              </div>
            ) : (
              /* Provider details card */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Visual Status Checklist */}
                <div className="md:col-span-2 space-y-4">
                  <Card className="border border-white/10 bg-zinc-950/50 backdrop-blur-md">
                    <CardHeader className="pb-3 border-b border-white/5">
                      <CardTitle className="text-sm font-mono text-zinc-300 uppercase tracking-wider flex items-center justify-between">
                        <span>Contract Verifications</span>
                        <span className="text-[10px] text-zinc-500 font-normal">
                          {provider.verification_pending ? "Live check running..." : "Verification complete"}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 divide-y divide-white/5">
                      {verifications.map((v, i) => {
                        // Determine route verification status
                        let status: "pending" | "success" | "failed" | "skipped" = "pending"

                        if (v.isOptional && provider.disable_optional) {
                          status = "skipped"
                        } else if (!provider.verification_pending) {
                          if (provider.verified_at) {
                            status = "success"
                          } else {
                            // If provider failed completely, let's show red for non-skipped routes
                            status = "failed"
                          }
                        }

                        return (
                          <div key={i} className="flex items-center justify-between py-3 font-mono text-xs">
                            <div className="flex flex-col">
                              <span className="text-zinc-200 font-medium">{v.name}</span>
                              <span className="text-[10px] text-zinc-500 mt-0.5">{v.path}</span>
                            </div>
                            <div>
                              {status === "skipped" && (
                                <Badge variant="outline" className="border-white/5 text-zinc-500 bg-white/0 font-mono text-[9px] uppercase">
                                  Skipped (Optional)
                                </Badge>
                              )}
                              {status === "pending" && (
                                <span className="flex items-center gap-1 text-zinc-400 font-mono text-[10px]">
                                  <Loader2 className="h-3.5 w-3.5 animate-spin text-pink-500" />
                                  Checking...
                                </span>
                              )}
                              {status === "success" && (
                                <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                  PASSED
                                </span>
                              )}
                              {status === "failed" && (
                                <span className="flex items-center gap-1 text-red-400 font-mono text-[10px]">
                                  <XCircle className="h-3.5 w-3.5 text-red-500" />
                                  FAILED
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                </div>

                {/* Provider details sidebar */}
                <div className="space-y-4">

                  {/* Status Panel */}
                  <Card className="border border-white/10 bg-zinc-950/50 backdrop-blur-md overflow-hidden relative">
                    <div className={`absolute top-0 left-0 right-0 h-[2px] ${provider.verification_pending
                        ? "bg-pink-500 animate-pulse"
                        : provider.verified_at
                          ? "bg-emerald-500"
                          : "bg-red-500"
                      }`}></div>

                    <CardContent className="pt-6 font-mono text-center space-y-4">
                      {provider.verification_pending ? (
                        <div className="flex flex-col items-center justify-center py-4">
                          <Loader2 className="h-10 w-10 animate-spin text-pink-500 mb-3" />
                          <span className="text-sm font-bold text-zinc-200">Verifying Contract</span>
                          <span className="text-[10px] text-zinc-500 mt-1">Background worker timeout 60s</span>
                        </div>
                      ) : provider.verified_at ? (
                        <div className="flex flex-col items-center justify-center py-4">
                          <CheckCircle2 className="h-10 w-10 text-emerald-500 mb-3 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                          <span className="text-sm font-bold text-emerald-400">Verification Success</span>
                          <span className="text-[10px] text-zinc-500 mt-1">Provider is verified & active</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4">
                          <XCircle className="h-10 w-10 text-red-500 mb-3 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]" />
                          <span className="text-sm font-bold text-red-400">Verification Failed</span>
                          <span className="text-[10px] text-zinc-500 mt-1">Check endpoints specifications</span>
                        </div>
                      )}

                      <div className="border-t border-white/5 pt-4 text-left text-xs space-y-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] text-zinc-500">PROVIDER NAME</span>
                          <span className="text-zinc-200 font-semibold truncate">{provider.provider_name}</span>
                        </div>

                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] text-zinc-500">ENDPOINT URL</span>
                          <span className="text-zinc-200 font-medium select-all truncate">{provider.provider_url}</span>
                        </div>

                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] text-zinc-500">VERSION</span>
                          <span className="text-zinc-200 font-medium">{provider.version}</span>
                        </div>

                        {provider.verified_at && (
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] text-zinc-500">VERIFIED TIMESTAMP</span>
                            <span className="text-zinc-200 font-medium">
                              {new Date(provider.verified_at * 1000).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Provider ID card */}
                  <Card className="border border-white/10 bg-zinc-950/50 backdrop-blur-md">
                    <CardContent className="pt-4 pb-4 font-mono text-xs space-y-2">
                      <span className="text-[10px] text-zinc-500 block">PROVIDER UNIQUE ID</span>
                      <div className="flex items-center gap-2 bg-black border border-white/5 rounded px-2.5 py-2">
                        <span className="text-zinc-300 font-mono text-xs select-all truncate flex-1">{provider.id}</span>
                        <button
                          onClick={copyToClipboard}
                          className="text-zinc-500 hover:text-white transition-colors"
                          title="Copy Provider ID"
                        >
                          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                      <p className="text-[9px] text-zinc-500 leading-relaxed pt-1">
                        Use this identifier to load content or verify caching status of this specific catalog client.
                      </p>
                    </CardContent>
                  </Card>

                </div>

              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center font-mono py-20 text-zinc-400">
          <Loader2 className="h-8 w-8 animate-spin text-pink-500 mb-3 mr-2" />
          Loading Provider Registry...
        </main>
        <Footer />
      </div>
    }>
      <ProviderFormAndStatus />
    </Suspense>
  )
}
