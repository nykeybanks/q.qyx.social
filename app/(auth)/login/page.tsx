"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase/client-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { QLogo } from "@/components/icons/q-logo"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Eye,
  EyeOff,
  Loader2,
  Wallet,
  AlertCircle,
  Shield,
  Lock,
  Zap,
} from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = useSupabase()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/vibes")
    router.refresh()
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-3 sm:p-4 overflow-hidden">
      <div className="relative z-10 w-full max-w-md space-y-4 sm:space-y-6">
        <div className="mb-4 sm:mb-6 flex flex-col items-center gap-3 pt-2">
          <QLogo className="h-12 w-12 sm:h-14 sm:w-14" />
          <div className="text-center flex flex-col gap-1">
            <h1 className="font-display text-xl sm:text-2xl font-semibold tracking-wide text-foreground">Q Social</h1>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">QuantumYield Social Ecosystem</p>
          </div>
        </div>

        <Card className="border-border bg-card overflow-hidden">
          <div className="h-px w-full bg-accent/60" />

          <CardHeader className="text-center space-y-2 pb-4 sm:pb-6">
            <CardTitle className="font-display text-lg sm:text-xl font-semibold tracking-wide">Welcome back</CardTitle>
            <CardDescription className="text-sm">Sign in to your Q Social account</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pb-4 sm:pb-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs sm:text-sm">{error}</AlertDescription>
                </Alert>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
                  Email Address
                  <Lock className="h-3 w-3 text-accent" />
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary/50 border-border/50 focus:border-accent/50 focus:bg-secondary transition-all text-sm"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
                  Password
                  <Shield className="h-3 w-3 text-accent" />
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-secondary/50 border-border/50 focus:border-accent/50 focus:bg-secondary transition-all text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors group-focus-within:text-accent"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-xs sm:text-sm text-accent hover:text-accent/80 hover:underline transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-10 sm:h-11 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:to-accent shadow-lg hover:shadow-accent/50 transition-all duration-300 active:scale-95 text-sm sm:text-base font-semibold group/btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4 group-hover/btn:translate-y-0.5 transition-transform" />
                    <span>Sign In</span>
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-4 sm:my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/30" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-2 text-[11px] sm:text-xs uppercase text-muted-foreground font-medium">Or continue with</span>
              </div>
            </div>

            {/* Wallet Button - Coming Soon */}
            <Button variant="outline" className="w-full h-10 sm:h-11 border-border/50 hover:border-border bg-secondary/30 hover:bg-secondary/50 transition-all" disabled>
              <Wallet className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">Connect Wallet</span>
              <span className="ml-auto rounded bg-accent/10 px-2 py-0.5 text-[10px] text-accent font-semibold">Soon</span>
            </Button>
          </CardContent>

          <CardFooter className="flex-col border-t border-border pt-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-accent hover:text-accent/80 transition-colors">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Footer Security Info */}
        <div className="space-y-2 sm:space-y-3">
          <p className="text-center text-xs text-muted-foreground px-2">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-foreground transition-colors">
              Terms
            </Link>
            {" "}and{" "}
            <Link href="/privacy" className="underline hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
