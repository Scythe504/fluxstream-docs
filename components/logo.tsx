import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
    >
      <defs>
        <linearGradient id="flux-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f78da7" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <filter id="flux-logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <path 
        d="M35,80 V35 C35,25 43,18 55,18 C63,18 68,22 68,22" 
        stroke="url(#flux-logo-grad)" 
        strokeWidth="12" 
        strokeLinecap="round" 
        fill="none"
        opacity="0.35"
        filter="url(#flux-logo-glow)"
      />
      <path 
        d="M25,45 H52" 
        stroke="url(#flux-logo-grad)" 
        strokeWidth="12" 
        strokeLinecap="round" 
        fill="none"
        opacity="0.35"
        filter="url(#flux-logo-glow)"
      />

      <path 
        d="M35,80 V35 C35,25 43,18 55,18 C63,18 68,22 68,22" 
        stroke="url(#flux-logo-grad)" 
        strokeWidth="12" 
        strokeLinecap="round" 
        fill="none"
      />
      <path 
        d="M25,45 H52" 
        stroke="url(#flux-logo-grad)" 
        strokeWidth="12" 
        strokeLinecap="round" 
        fill="none"
      />
      <polygon 
        points="52,39 65,45 52,51" 
        fill="url(#flux-logo-grad)" 
      />
    </svg>
  )
}
