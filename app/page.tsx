import { cn } from "@/lib/utils"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QLogo, QThreadsIcon, QCirclesIcon, QGramIcon, VaultIcon } from "@/components/icons/q-logo"
import { ArrowRight, Shield, Zap, Globe, Bitcoin, Menu, Sparkles, TrendingUp, Bell, Star, Flame, Users, Trophy, Wallet, Target, CheckCircle, Grid } from "lucide-react"
import { Footer } from "@/components/shared/footer"
import { InteractiveDemo } from "@/components/homepage/interactive-demo"
import { MobileMenu } from "@/components/homepage/mobile-menu"
import { PlatformDemoSection } from "@/components/homepage/platform-demo-section"
import { RealtimeFeaturesDemo } from "@/components/homepage/realtime-features-demo"
import { QBPEarningDemo } from "@/components/homepage/qbp-earning-demo"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>
}) {
  const supabase = await createClient()

  const params = await searchParams
  const { code } = params
  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
    redirect("/vibes")
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/vibes")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <header className="sticky top-0 relative z-50 border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-4 md:px-6">
          <Link
            href="/"
            className="relative flex items-center gap-2 group px-2 py-1 -ml-2 rounded-lg transition-all duration-300 hover:bg-accent/5 active:scale-95"
          >
            {/* Logo with rotation and glow effect */}
            <div className="relative">
              <QLogo className="h-7 w-7 sm:h-8 sm:w-8 text-accent transition-all duration-300" />
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Gradient text with shine animation */}
            <span className="hidden xs:inline text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-[length:200%_auto] bg-clip-text text-transparent transition-all duration-500 group-hover:bg-[position:100%] group-hover:scale-105">
              Q Social
            </span>

            {/* Mobile single letter with gradient */}
            <span className="inline xs:hidden text-lg font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
              Q
            </span>

            {/* Animated underline */}
            <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />

            {/* Subtle shine effect */}
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#platforms"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Platforms
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="hidden md:block">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 text-sm hover:bg-accent/5 hover:text-accent transition-all"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/register" className="hidden xs:block md:block">
              <Button
                size="sm"
                className="h-9 px-4 text-sm bg-accent text-accent-foreground hover:bg-accent/90 transition-all hover:scale-105 active:scale-95"
              >
                Get Started
              </Button>
            </Link>
            
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Hero Section - Enhanced for Mobile */}
      <section className="relative z-10 px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 md:pb-32">
        <div className="mx-auto max-w-6xl">
          {/* Main Hero Content - Enhanced */}
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Badge - Premium styling with enhanced effects */}
            <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-gradient-to-r from-accent/5 to-accent/10 px-3 sm:px-5 py-1.5 sm:py-2 backdrop-blur-lg hover:border-accent/60 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group/badge animate-fade-in">
              <div className="relative flex items-center">
                <Bitcoin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent animate-pulse" />
                <div className="absolute inset-0 bg-accent/30 rounded-full blur-lg opacity-0 group-hover/badge:opacity-100 transition-opacity" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-accent group-hover/badge:text-accent transition-colors">
                <span className="hidden xs:inline">Earn Quantum Bit Points (QBP) Daily</span>
                <span className="inline xs:hidden">Earn QBP Daily</span>
              </span>
              <div className="hidden sm:block h-3 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent" />
              <span className="hidden sm:inline text-xs font-medium text-accent/70">Web3 Native</span>
            </div>

            {/* Title - Enhanced with better gradient and animations */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-balance text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight animate-fade-in-up">
                The Future of{" "}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                  <span className="relative bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent animate-gradient">
                    Social Media
                  </span>
                </span>
                <br className="hidden xs:block" />
                <span className="inline xs:hidden"> </span>
                is Here
              </h1>
              {/* Accent line under title */}
              <div className="flex justify-center gap-2">
                <div className="h-1 w-8 sm:w-12 rounded-full bg-gradient-to-r from-accent to-accent/50 animate-fade-in-up animation-delay-100" />
              </div>
            </div>

            {/* Description - Enhanced with better typography and spacing */}
            <p className="mx-auto mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed px-2 sm:px-4 animate-fade-in-up animation-delay-200">
              <span className="hidden sm:inline">
                Q Social is a Web3-native ecosystem featuring Q Vibes, Q Circles, and Q Gram — all powered by the
                QuantumYield Innovation Technology Stack. Earn rewards, own your data, and connect with a verified human
                community.
              </span>
              <span className="inline sm:hidden">
                Web3-native social ecosystem with Q Vibes, Q Circles, and Q Gram. Earn rewards, own your data, connect with verified humans.
              </span>
            </p>

            {/* CTA Buttons - Enhanced with better styling and interactions */}
            <div className="mt-8 sm:mt-10 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4 justify-center px-4 sm:px-0 animate-fade-in-up animation-delay-400">
              <Link href="/register" className="w-full xs:w-auto group/cta">
                <Button
                  size="lg"
                  className="w-full xs:w-auto relative overflow-hidden bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:to-accent transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation h-12 sm:h-14 text-base sm:text-lg font-semibold shadow-lg shadow-accent/30 hover:shadow-accent/50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="hidden xs:inline">Create Your Account</span>
                    <span className="inline xs:hidden">Get Started Free</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover/cta:translate-x-1" />
                  </span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700" />
                </Button>
              </Link>
              <Link href="#platforms" className="group/secondary">
                <Button
                  size="lg"
                  className="w-full xs:w-auto h-12 sm:h-14 text-base sm:text-lg font-semibold border-2 border-accent/30 bg-transparent hover:bg-accent/5 hover:border-accent/60 transition-all active:scale-95 touch-manipulation"
                >
                  <span>Explore Platforms</span>
                  <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5 opacity-0 group-hover/secondary:opacity-100 transition-opacity" />
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground animate-fade-in-up animation-delay-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>No credit card required</span>
              </div>
              <div className="hidden sm:block h-3 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent" />
                <span>Web3 Secure</span>
              </div>
              <div className="hidden sm:block h-3 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                <span>Instant Setup</span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm text-center transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
              <div className="text-3xl font-bold text-accent md:text-4xl">100+</div>
                <div className="mt-2 text-sm text-muted-foreground">QBP Welcome Bonus</div>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm text-center transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
              <div className="text-3xl font-bold text-accent md:text-4xl">3</div>
              <div className="mt-2 text-sm text-muted-foreground">Integrated Platforms</div>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm text-center transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
              <div className="text-3xl font-bold text-accent md:text-4xl">AI</div>
              <div className="mt-2 text-sm text-muted-foreground">Powered Moderation</div>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm text-center transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
              <div className="text-3xl font-bold text-accent md:text-4xl">Web3</div>
              <div className="mt-2 text-sm text-muted-foreground">Blockchain Security</div>
            </div>
          </div>

          {/* Platform Preview Cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-8 backdrop-blur-sm text-center transition-all hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1">
              <div className="absolute top-0 right-0 h-32 w-32 bg-accent/10 rounded-full blur-3xl -z-10 transition-all group-hover:scale-150" />
              <QThreadsIcon className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-bold text-foreground">Q Vibes</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Microblogging reimagined with categories and instant rewards
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-accent">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Live now
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-8 backdrop-blur-sm text-center transition-all hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1">
              <div className="absolute top-0 right-0 h-32 w-32 bg-accent/10 rounded-full blur-3xl -z-10 transition-all group-hover:scale-150" />
              <QCirclesIcon className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-bold text-foreground">Q Circles</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Build communities with powerful moderation and events
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-accent">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Live now
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-8 backdrop-blur-sm text-center transition-all hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1">
              <div className="absolute top-0 right-0 h-32 w-32 bg-accent/10 rounded-full blur-3xl -z-10 transition-all group-hover:scale-150" />
              <QGramIcon className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-bold text-foreground">Q Gram</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Visual storytelling with AI moderation and creator rewards
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-accent">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Live now
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section
        id="platforms"
        className="relative z-10 border-t border-border bg-card/50 py-16 sm:py-20 md:py-24 overflow-hidden"
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-accent/3 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-accent">All Platforms Live</span>
              </div>
            </div>

            {/* Main Heading with gradient */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Three Platforms,{" "}
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                One Ecosystem
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground text-pretty">
              Switch seamlessly between platforms while maintaining your identity, rewards, and connections across the
              entire Q Social ecosystem
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold text-sm">1</span>
                </div>
                <span className="text-muted-foreground">Unified Identity</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold text-sm">1</span>
                </div>
                <span className="text-muted-foreground">Shared Wallet</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold text-sm">∞</span>
                </div>
                <span className="text-muted-foreground">Earning Potential</span>
              </div>
            </div>
          </div>

          {/* Platform Cards Grid with Demo Modals */}
          <PlatformDemoSection />

          {/* Ecosystem Connection Indicator */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/5 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-accent">Connected to QuantumYield Exchange</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <span className="text-xs sm:text-sm text-muted-foreground">Cross-platform rewards enabled</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Built for the <span className="text-accent">Web3 Era</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Q Social leverages blockchain technology and AI to create a secure, rewarding, and human-centric social
                experience.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Human Verification</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      AI-powered bot detection ensures authentic interactions with real humans.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <VaultIcon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Quantum Bit Points (QBP) Vault</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Earn rewards for quality content and engagement, with daily auto-payouts.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Globe className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Decentralized Data</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Your content is stored on decentralized networks — you own your data.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">QuantumYield Integration</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Seamlessly connect to the regulated digital-asset exchange ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl border border-border bg-card p-8">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  {/* Animated Bitcoin icon with pulsing ring */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl animate-pulse" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 transition-all hover:rotate-6">
                      <Bitcoin className="h-10 w-10 text-accent animate-bounce" style={{ animationDuration: "2s" }} />
                      {/* Rotating ring effect */}
                      <div
                        className="absolute inset-0 rounded-2xl border-2 border-accent/30 animate-ping"
                        style={{ animationDuration: "3s" }}
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground">Quantum Bit Points (QBP)</h3>
                  <p className="mt-2 text-muted-foreground">Live Vault Demo</p>

                  {/* Animated counter with gradient effect */}
                  <div className="mt-4 relative">
                    <p className="text-5xl font-bold bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent animate-pulse">
                      100.00
                    </p>
                    {/* Floating +1 animation */}
                    <div className="absolute -right-8 top-0 animate-float">
                      <span className="text-sm font-bold text-accent/70">+1</span>
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                    <Flame className="h-4 w-4 text-accent animate-pulse" />5 day streak
                  </p>

                  {/* Progress bar showing daily goal */}
                  <div className="mt-4 w-full max-w-xs">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Daily Goal</span>
                      <span>75%</span>
                    </div>
                    <div className="h-2 bg-accent/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full transition-all duration-1000 animate-pulse"
                        style={{ width: "75%" }}
                      />
                    </div>
                  </div>

                  {/* Interactive button with hover effects */}
                  <Button className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/20 group">
                    Start Earning
                    <Sparkles className="ml-2 h-4 w-4 transition-transform" />
                  </Button>

                  {/* Live activity indicator */}
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    <span>Real-time updates</span>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full border border-accent/20" />
              <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full border border-accent/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Q-ID Identity System Section */}
      <section className="relative z-10 border-t border-border bg-card/30 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 backdrop-blur-sm mb-6">
              <Shield className="h-4 w-4 text-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">Trust & Identity</span>
            </div>
            <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Universal{" "}
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                Q-ID Identity
              </span>
            </h2>
            <p className="mt-4 sm:mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
              Your single identity across the entire Q Social ecosystem, backed by trust scores and verification
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Visual Representation */}
            <div className="relative rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-8 backdrop-blur-sm">
              <div className="space-y-6">
                {/* Mock Q-ID Header */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/40 border-2 border-accent" />
                    <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-accent border-2 border-card flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">alex.qid</span>
                      <div className="flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5">
                        <Zap className="h-3 w-3 text-accent" />
                        <span className="text-xs font-bold text-accent">87</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">@alex.qid</p>
                  </div>
                </div>

                {/* Platform Icons */}
                <div className="flex gap-3">
                  {[
                    { label: "Vibes", active: true },
                    { label: "Circles", active: true },
                    { label: "Gram", active: true },
                    { label: "QNEKTn", active: false },
                  ].map((platform) => (
                    <div
                      key={platform.label}
                      className={cn(
                        "flex-1 rounded-lg border p-3 text-center transition-all",
                        platform.active
                          ? "border-accent/50 bg-accent/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                          : "border-border bg-secondary/50 opacity-50"
                      )}
                    >
                      <div className="text-xs font-medium">{platform.label}</div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">1.2K</div>
                    <div className="text-xs text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">847</div>
                    <div className="text-xs text-muted-foreground">Q-Bits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">92%</div>
                    <div className="text-xs text-muted-foreground">Engagement</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Q-Score Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    0-100 trust score based on verification level, account age, engagement, and community trust
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Blue Q-Mark Badge</h3>
                  <p className="text-sm text-muted-foreground">
                    Visible verification badge for Level 2 & 3 users verified via Q-Scan with Premium status
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Grid className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Multi-Platform Identity</h3>
                  <p className="text-sm text-muted-foreground">
                    One identity across Q-Vibes, Q-Circles, Q-Gram, and QNEKTn with platform activity indicators
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Action Buttons</h3>
                  <p className="text-sm text-muted-foreground">
                    Follow, Q-Tip (send tips), and Q-Direct messaging integrated across all platforms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Features Section */}
      <section className="relative z-10 border-t border-border bg-background py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 backdrop-blur-sm mb-6">
              <Zap className="h-4 w-4 text-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">Live & Interactive</span>
            </div>
            <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Real-Time{" "}
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                Everything
              </span>
            </h2>
            <p className="mt-4 sm:mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
              Live updates, keyboard shortcuts, and instant notifications keep you connected
            </p>
          </div>

          <RealtimeFeaturesDemo />
        </div>
      </section>

      {/* Theme Customization Section */}
      <section className="relative z-10 border-t border-border bg-card/30 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 backdrop-blur-sm mb-6">
                <Sparkles className="h-4 w-4 text-accent animate-pulse" />
                <span className="text-sm font-medium text-accent">Personalization</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Your Theme,{" "}
                <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                  Your Way
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Choose between dark, light, or system themes. Fully optimized for both modes with smooth transitions.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <CheckCircle className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground">Dark mode optimized (default)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <CheckCircle className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground">Light mode fully supported</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <CheckCircle className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground">System theme following device settings</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium text-foreground">Theme Selection</span>
                  <span className="text-xs text-muted-foreground">Choose your preference</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative flex flex-col items-center gap-2 rounded-lg border-2 border-accent p-4 bg-accent/10">
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-900 to-black border border-gray-700 shadow-lg" />
                    <span className="text-sm font-medium">Dark</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-border p-4 opacity-70 hover:opacity-100 transition-opacity">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-white to-gray-100 border border-gray-300 shadow-lg" />
                    <span className="text-sm font-medium">Light</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-border p-4 opacity-70 hover:opacity-100 transition-opacity">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-b from-white via-gray-400 to-black border border-gray-400 shadow-lg" />
                    <span className="text-sm font-medium">System</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center pt-4">
                  Switch themes anytime in settings. Your preference is saved and synced across devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QBP Earning Methods Section */}
      <section className="relative z-10 border-t border-border bg-background py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              How to Earn{" "}
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                Quantum Bit Points (QBP)
              </span>
            </h2>
            <p className="mt-4 sm:mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
              QBP converts directly into crypto value via the exchange. Multiple ways to grow your rewards and unlock value.
            </p>
          </div>

          <QBPEarningDemo />

          {/* QBP Features Grid */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Wallet className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Crypto Exchange</h3>
                  <p className="mt-2 text-muted-foreground">Convert QBP directly to crypto value with real-time exchange rates</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Target className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Points Tab Access</h3>
                  <p className="mt-2 text-muted-foreground">Track your QBP, view earning history, and manage conversions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 border-t border-border bg-card/50 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <div className="text-center">
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 backdrop-blur-sm">
              <Bitcoin className="h-4 w-4 animate-pulse text-accent" />
              <span className="text-xs sm:text-sm font-medium text-accent">100 Quantum Bit Points (QBP) Welcome Bonus</span>
            </div>

            <h2 className="text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
              Ready to Join the{" "}
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                Future
              </span>
              ?
            </h2>

            <p className="mt-4 sm:mt-6 mx-auto max-w-2xl text-pretty text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed px-2">
              Create your account today and start earning rewards for quality content and authentic engagement. Join a
              verified human community powered by Web3 technology.
            </p>

            <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group w-full sm:w-auto h-11 sm:h-12 md:h-14 px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/20"
                >
                  Create Your Account
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-11 sm:h-12 md:h-14 px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg border-border bg-transparent hover:bg-accent/5 hover:border-accent/50 transition-all hover:scale-105 active:scale-95"
                >
                  Sign In Instead
                </Button>
              </Link>
            </div>

            <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-border/50">
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Trusted by the Web3 community</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
                <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all hover:border-accent/30">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-accent mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">AI Protected</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all hover:border-accent/30">
                  <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-accent mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">Decentralized</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all hover:border-accent/30">
                  <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-accent mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">Instant Rewards</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all hover:border-accent/30">
                  <Bitcoin className="h-6 w-6 sm:h-8 sm:w-8 text-accent mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">Web3 Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Features Section */}
      <section id="features" className="relative z-10 py-16 sm:py-20 md:py-24 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-accent">Advanced Features</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Built for{" "}
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                Power Users
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground text-pretty">
              Experience cutting-edge social media technology with AI-powered tools, seamless integrations, and advanced
              analytics
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Content Sync & Aggregation */}
            <div className="group relative rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 sm:p-8 transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 transition-transform">
                  <Globe className="h-6 w-6 text-accent" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">Content Sync</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect Twitter/X, Instagram, Facebook, LinkedIn, and YouTube. Import and aggregate content
                  automatically.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>OAuth integration with major platforms</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Automated scheduled imports</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Cross-platform content aggregation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Content Generation */}
            <div className="group relative rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 sm:p-8 transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 transition-transform">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">AI Generation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  GPT-4o-powered content creation. Generate posts from imported content in multiple styles.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Professional, casual, or humorous styles</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Context-aware content suggestions</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Auto-generate from aggregated data</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vault Analytics */}
            <div className="group relative rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 sm:p-8 transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 transition-transform">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">Vault Analytics</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Track earnings, daily streaks, achievements, and referral rewards with comprehensive analytics.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Real-time earning insights</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Streak rewards & achievements</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>CSV export & transaction history</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Notifications */}
            <div className="group relative rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 sm:p-8 transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 transition-transform">
                  <Bell className="h-6 w-6 text-accent" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">Smart Notifications</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Intelligent notification system with filtering, priorities, and customizable preferences.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Filter by type and priority</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Mark all as read functionality</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Customizable notification settings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance & Optimistic UI */}
            <div className="group relative rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 sm:p-8 transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 transition-transform">
                  <Zap className="h-6 w-6 text-accent" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">Performance First</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Lightning-fast experience with infinite scroll, pull-to-refresh, and optimistic UI updates.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Infinite scroll with lazy loading</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Pull-to-refresh on mobile</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Optimistic UI for instant feedback</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security & Error Handling */}
            <div className="group relative rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 sm:p-8 transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 transition-transform">
                  <Shield className="h-6 w-6 text-accent" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">Robust & Secure</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enterprise-grade security with comprehensive error boundaries and graceful failure handling.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Global error boundaries</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Row-level security policies</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Comprehensive error recovery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section - Added new comprehensive features showcase */}
      <section id="features" className="relative z-10 py-24 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">Advanced Capabilities</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
              Powered by{" "}
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                Next-Gen Tech
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Experience cutting-edge features that put you in control of your social presence
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* AI Content Generation */}
            <div className="group relative rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 transition-transform">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">AI Content Generation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Let GPT-4o create engaging posts from your imported content across all platforms with custom style
                  preferences
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-accent">
                  <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <span>Powered by GPT-4o-mini</span>
                </div>
              </div>
            </div>

            {/* Content Sync & Aggregation */}
            <div className="group relative rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 transition-transform">
                  <Globe className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Multi-Platform Sync</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Import and aggregate content from Twitter, Instagram, Facebook, YouTube, and LinkedIn with OAuth
                  security
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Twitter", "Instagram", "Facebook", "YouTube", "LinkedIn"].map((platform) => (
                    <span
                      key={platform}
                      className="px-2 py-0.5 text-[10px] rounded-full bg-accent/10 text-accent border border-accent/20"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Vault Analytics */}
            <div className="group relative rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 transition-transform">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Vault Analytics</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Track your earnings with detailed insights, daily streaks, achievement goals, and referral rewards
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="text-center p-2 rounded-lg bg-accent/5">
                    <div className="text-lg font-bold text-accent">7d</div>
                    <div className="text-[10px] text-muted-foreground">Streak</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-accent/5">
                    <div className="text-lg font-bold text-accent">5k+</div>
                    <div className="text-[10px] text-muted-foreground">Earned</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-accent/5">
                    <div className="text-lg font-bold text-accent">10%</div>
                    <div className="text-[10px] text-muted-foreground">Bonus</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Notifications */}
            <div className="group relative rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 transition-transform">
                  <Bell className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Smart Notifications</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Filter, categorize, and manage notifications with intelligent grouping and one-tap mark all as read
                </p>
                <ul className="mt-4 space-y-1.5">
                  <li className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Real-time updates</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Smart filtering</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-accent" />
                    <span>Batch actions</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Optimistic UI */}
            <div className="group relative rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 transition-transform">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Lightning Fast UI</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Optimistic updates, infinite scroll, pull-to-refresh, and skeleton loading for the smoothest
                  experience
                </p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Response time</span>
                  <span className="font-mono text-accent">{"<"}50ms</span>
                </div>
              </div>
            </div>

            {/* Web3 Security */}
            <div className="group relative rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 transition-transform">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Web3 Security</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Multi-wallet support, blockchain verification, end-to-end encryption, and full GDPR compliance
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span>Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span>GDPR Ready</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span>2FA</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span>RLS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all hover:scale-105"
              >
                Experience All Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section - Adding live interactive feature demonstrations */}
      <section
        id="demo"
        className="relative z-10 border-t border-border py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 backdrop-blur-sm mb-4">
              <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-accent">Interactive Demo</span>
            </div>
            <h2 className="text-balance text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Experience Q Social{" "}
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                Live
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Try our interactive demos below. Click to earn points and watch the vault update in real-time!
            </p>
          </div>

          <InteractiveDemo />
        </div>
      </section>

      {/* Testimonials Section - Adding social proof and user testimonials */}
      <section className="relative z-10 py-16 sm:py-20 md:py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Loved by{" "}
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                Creators
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground">
              See what our community members are saying about Q Social
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "Q Social's content sync feature saved me hours every week. I can now aggregate my content from all platforms and let AI help me create new posts.",
                author: "Sarah Chen",
                role: "Digital Creator",
                avatar: "SC",
              },
              {
                quote:
                  "The QBP vault is a game-changer. I've earned over 5,000 points just by being active and creating quality content. It's actually rewarding to use social media now.",
                author: "Marcus Rodriguez",
                role: "Tech Influencer",
                avatar: "MR",
              },
              {
                quote:
                  "Finally, a social platform that respects privacy and rewards authenticity. The human verification system makes the community feel real and trustworthy.",
                author: "Aisha Patel",
                role: "Web3 Advocate",
                avatar: "AP",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all hover:border-accent/50 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <Star className="h-5 w-5 text-accent mb-4 fill-accent" />

                  <blockquote className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
