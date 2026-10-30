import Link from "next/link"
import { QLogo } from "@/components/icons/q-logo"
import { Bitcoin, Shield, Zap, Globe, Twitter, Github, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 xs:gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <QLogo className="h-8 w-8 text-accent transition-transform" />
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Q Social</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Web3-native social media powered by the QuantumYield Innovation Technology Stack.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 rounded-full bg-success/10 border border-success/20 px-2.5 py-1 text-xs text-success">
                <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                <span className="font-medium">Live</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 px-2.5 py-1 text-xs text-accent">
                <Shield className="h-3 w-3" />
                <span className="font-medium">Secured</span>
              </div>
            </div>
            {/* Social Links */}
            
          </div>

          {/* Platforms */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Platforms</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/vibes" className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Q Vibes</span>
                </Link>
              </li>
              <li>
                <Link href="/circles" className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Q Circles</span>
                </Link>
              </li>
              <li>
                <Link href="/gram" className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Q Gram</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/vault"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1.5 group"
                >
                  <Bitcoin className="h-3 w-3 text-accent/70 group-hover:text-accent transition-colors" />
                  <span className="group-hover:translate-x-0.5 transition-transform">QBP Vault</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-0.5 transition-transform">About</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Careers</span>
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Press Kit</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal & Support</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Support Center</span>
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-0.5 transition-transform">API Docs</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold mb-4 text-foreground">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates on QBP rewards and new features.
            </p>
            <form className="flex flex-col gap-2">
              <Input 
                type="email" 
                placeholder="your@email.com" 
                className="h-9 text-sm bg-background/50 border-border focus-visible:ring-accent"
              />
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full gap-2">
                <Send className="h-3.5 w-3.5" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              © 2026 Q Social. Part of the QuantumYield Innovation Technology Stack.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Globe className="h-3 w-3 text-accent/70" />
                <span>Global Network</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Zap className="h-3 w-3 text-accent" />
                <span>Lightning Fast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
