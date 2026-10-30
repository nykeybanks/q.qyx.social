import { cn } from "@/lib/utils"

export const qyxBrandAssets = {
  emblemWhite: "/brand/q-emblem-white.png",
  emblemBlack: "/brand/q-emblem-black.png",
  emblemSilver: "/brand/q-emblem-silver-metallic.png",
  wordmarkWhite: "/brand/quantumyield-white.png",
  wordmarkBlack: "/brand/quantumyield-black.png",
} as const

/**
 * Official QuantumYield Q emblem (supplied PNG artwork, never redrawn).
 * Renders the white variant on dark surfaces and the black variant on light ones.
 */
export function QLogo({
  className = "w-8 h-8",
  label = "QuantumYield",
}: {
  className?: string
  label?: string
}) {
  return (
    <span role="img" aria-label={label} className={cn("relative inline-flex shrink-0 items-center justify-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qyxBrandAssets.emblemBlack} alt="" aria-hidden="true" className="h-full w-full object-contain dark:hidden" draggable={false} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qyxBrandAssets.emblemWhite} alt="" aria-hidden="true" className="hidden h-full w-full object-contain dark:block" draggable={false} />
    </span>
  )
}

export function QuantumYieldWordmark({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <span role="img" aria-label="QuantumYield" className={cn("inline-flex shrink-0 items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qyxBrandAssets.wordmarkBlack} alt="" aria-hidden="true" className="h-full w-auto object-contain dark:hidden" draggable={false} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qyxBrandAssets.wordmarkWhite} alt="" aria-hidden="true" className="hidden h-full w-auto object-contain dark:block" draggable={false} />
    </span>
  )
}

export function QThreadsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function QCirclesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="15" cy="15" r="5" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function QGramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function VaultIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M12 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
