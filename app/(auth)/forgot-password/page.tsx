"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useSupabase } from "@/lib/supabase/client-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { QLogo } from "@/components/icons/q-logo"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Loader2,
  AlertCircle,
  Shield,
  Lock,
  Users,
  CheckCircle2,
  Bitcoin,
  ArrowLeft,
  Mail,
  KeyRound,
} from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = useSupabase()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-1/2 right-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Security Badge - Floating */}
        <div className="absolute -top-4 -right-4 z-20 animate-pulse">
          <div className="flex items-center gap-1.5 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 px-3 py-1.5 shadow-lg">
            <Shield className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-semibold text-accent">Secured</span>
          </div>
        </div>

        {/* Ecosystem Badge - Floating */}
        <div className="absolute -top-4 -left-4 z-20">
          <div className="flex items-center gap-1.5 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/30 px-3 py-1.5 shadow-lg">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-green-500">Live</span>
          </div>
        </div>

        {/* Logo with Enhanced Branding */}
        <div className="mb-8 flex flex-col items-center space-y-4 animate-fade-in-up">
          <div className="relative">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl animate-pulse" />
            <QLogo className="relative h-16 w-16 text-accent" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Q Social</h1>
            <p className="mt-1 text-sm text-muted-foreground flex items-center justify-center gap-1.5">
              <Bitcoin className="h-3.5 w-3.5 text-accent" />
              QuantumYield Social Ecosystem
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-accent" />
              <span>256-bit Encryption</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-accent" />
              <span>10K+ Users</span>
            </div>
          </div>
        </div>

        {/* Enhanced Card with Security Features */}
        <Card className="border-border bg-card/95 backdrop-blur-sm shadow-2xl animate-fade-in-up animation-delay-200">
          {/* Security Indicator Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-accent via-green-500 to-accent animate-gradient-x" />

          <CardHeader className="text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <KeyRound className="h-6 w-6 text-accent" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <CardTitle className="text-xl">Reset your password</CardTitle>
              <Shield className="h-4 w-4 text-accent" />
            </div>
            <CardDescription>
              {success
                ? "Check your email for reset instructions"
                : "Enter your email to receive a password reset link"}
            </CardDescription>

            {/* Ecosystem Connection Indicator */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                <span className="text-muted-foreground">Connected to QuantumYield</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {success ? (
              <div className="space-y-4">
                <Alert className="border-accent/50 bg-accent/10">
                  <Mail className="h-4 w-4 text-accent" />
                  <AlertDescription className="text-foreground">
                    <strong>Email sent successfully!</strong>
                    <br />
                    We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow
                    the instructions.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2 rounded-lg bg-secondary/50 p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">What's next?</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Check your email inbox (and spam folder)</li>
                    <li>Click the reset link in the email</li>
                    <li>Create a new secure password</li>
                    <li>Sign in with your new password</li>
                  </ul>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-border hover:bg-secondary bg-transparent"
                  onClick={() => setSuccess(false)}
                >
                  Resend email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1.5">
                    Email address
                    <Lock className="h-3 w-3 text-accent" />
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-secondary border-border"
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll send a secure reset link to this email address
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-accent/50 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending reset link...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send reset link
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex-col space-y-4">
            {/* Security Features */}
            <div className="w-full grid grid-cols-3 gap-2 py-3 border-t border-border">
              <div className="flex flex-col items-center gap-1 text-center">
                <Lock className="h-4 w-4 text-accent" />
                <span className="text-[10px] text-muted-foreground">End-to-End Encrypted</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-[10px] text-muted-foreground">2FA Protected</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span className="text-[10px] text-muted-foreground">GDPR Compliant</span>
              </div>
            </div>

            <Link href="/login" className="w-full">
              <Button variant="ghost" className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Bottom Security & Terms */}
        <div className="mt-6 space-y-3">
          {/* Ecosystem Connection Status */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Connected to QuantumYield Exchange</span>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Remember your password?{" "}
            <Link href="/login" className="font-medium text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
