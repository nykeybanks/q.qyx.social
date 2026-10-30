import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Orbitron, Exo_2, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SupabaseProvider } from "@/lib/supabase/client-provider"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["500", "600", "700"],
})

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Q Social | QuantumYield Social Ecosystem",
  description:
    "A Web3-native social media platform featuring Q Vibes, Q Circles, and Q Gram - powered by the QuantumYield Innovation Technology Stack",
  generator: "v0.app",
  keywords: ["social media", "web3", "blockchain", "bitcoin", "crypto", "decentralized"],
  authors: [{ name: "QuantumYield" }],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ECECEC" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark bg-background">
      <body className={`${inter.variable} ${orbitron.variable} ${exo2.variable} ${jetbrainsMono.variable} bg-background font-sans antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem 
          enableColorScheme={false}
          storageKey="q-social-theme"
          disableTransitionOnChange
        >
          <SupabaseProvider>
            {children}
            <Analytics />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
