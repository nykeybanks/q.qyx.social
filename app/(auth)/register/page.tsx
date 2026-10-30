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
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, Shield } from "lucide-react"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = useSupabase()

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains special character", met: /[!@#$%^&*]/.test(password) },
  ]

  const allRequirementsMet = passwordRequirements.every((req) => req.met)
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!allRequirementsMet) {
      setError("Please meet all password requirements")
      return
    }

    if (!passwordsMatch) {
      setError("Passwords do not match")
      return
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy")
      return
    }

    setLoading(true)
    setError(null)

    // Sign up the user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/vibes`,
        data: {
          username,
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      // Create profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        username,
        display_name: username,
        verification_level: 0,
        verified_human: false,
      })

      if (profileError) {
        console.error("Profile creation error:", profileError)
      }

      // Create vault balance
      const { error: vaultError } = await supabase.from("vault_balances").insert({
        user_id: data.user.id,
        bitcoin_points: 100, // Welcome bonus
        mining_credits: 0,
        total_earned: 100,
        total_withdrawn: 0,
      })

      if (vaultError) {
        console.error("Vault creation error:", vaultError)
      }
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md space-y-6 animate-fade-in-up">
          {/* Logo - Enhanced with gradient */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl animate-pulse" />
              <QLogo className="relative h-12 w-12 sm:h-14 sm:w-14 text-accent transition-transform" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Welcome to Q Social
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Create your account and start earning Bitcoin Points
              </p>
            </div>
          </div>

          <Card className="relative z-10 w-full max-w-md border-border bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-success/20 animate-bounce">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <CardTitle className="text-2xl">Check your email</CardTitle>
              <CardDescription className="text-base">
                We&apos;ve sent a verification link to <strong className="text-foreground">{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-sm text-muted-foreground leading-relaxed">
                Click the link in your email to verify your account and start earning Quantum Bit Points (QBP).
              </p>
              <div className="rounded-lg bg-accent/10 p-4 border border-accent/20">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-5 w-5 text-accent" />
                  <span className="font-semibold text-accent">Welcome Bonus</span>
                </div>
                <p className="mt-2 text-base font-medium">100 Quantum Bit Points (QBP) have been credited to your vault!</p>
                <p className="mt-1 text-xs text-muted-foreground">Start your journey in the QuantumYield ecosystem</p>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-lg bg-card p-3 border border-border">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-muted-foreground">Connected to QuantumYield Exchange</span>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button
                variant="outline"
                className="w-full bg-transparent hover:bg-accent/10"
                onClick={() => router.push("/login")}
              >
                Return to Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-3 sm:p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-1/2 right-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Security Badges */}
        <div className="absolute -top-12 left-0 right-0 flex justify-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 rounded-full bg-success/20 px-3 py-1 text-xs font-medium text-success border border-success/30">
            <Shield className="h-3 w-3" />
            <span className="hidden xs:inline">Secured</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent border border-accent/30">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="hidden xs:inline">Live</span>
          </div>
        </div>

        {/* Logo with enhanced styling */}
        <div className="mb-6 sm:mb-8 flex flex-col items-center pt-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl" />
            <QLogo className="relative h-14 w-14 sm:h-16 sm:w-16 text-accent" />
          </div>
          <h1 className="mt-4 text-xl sm:text-2xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Join Q Social
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Start earning Quantum Bit Points (QBP) today</p>
          {/* Trust indicator */}
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>256-bit Encrypted</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-border" />
            <div className="flex items-center gap-1">
              <span>10K+ Users</span>
            </div>
          </div>
        </div>

        <Card className="border-border bg-card/95 backdrop-blur-sm relative overflow-hidden">
          {/* Gradient accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/50 to-accent" />

          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg sm:text-xl">Create your account</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Enter your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="satoshi"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                  required
                  className="bg-secondary border-border"
                />
                <p className="text-xs text-muted-foreground">Only lowercase letters, numbers, and underscores</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-secondary border-border pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 text-xs ${
                          req.met ? "text-success" : "text-muted-foreground"
                        }`}
                      >
                        {req.met ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <div className="h-3 w-3 rounded-full border border-muted-foreground" />
                        )}
                        {req.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-secondary border-border"
                />
                {confirmPassword.length > 0 && (
                  <p className={`text-xs ${passwordsMatch ? "text-success" : "text-destructive"}`}>
                    {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                  </p>
                )}
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm font-normal leading-snug">
                  I agree to the{" "}
                  <Link href="/terms" className="text-accent hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-accent hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={loading || !allRequirementsMet || !passwordsMatch || !agreeTerms}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-accent hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>

          <div className="border-t border-border bg-muted/30 px-6 py-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="flex flex-col items-center gap-1">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-[10px] text-muted-foreground">End-to-End Encryption</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-[10px] text-muted-foreground">2FA Protection</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-[10px] text-muted-foreground">GDPR Compliant</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Ecosystem connection status */}
        <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border p-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">Connected to</span>
          </div>
          <span className="text-xs font-medium text-accent">QuantumYield Exchange</span>
        </div>
      </div>
    </div>
  )
}
