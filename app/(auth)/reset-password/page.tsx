"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase/client-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QLogo } from "@/components/icons/q-logo"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Shield, Lock, CheckCircle, ArrowRight, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [initialized, setInitialized] = useState(false)
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

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setInitialized(true)
      } else {
        setError("You must be logged in to reset your password")
        setTimeout(() => router.push("/login"), 2000)
      }
    }
    checkSession()
  }, [supabase, router])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!allRequirementsMet) {
      setError("Please meet all password requirements")
      return
    }

    if (!passwordsMatch) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    setError(null)

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setTimeout(() => {
      router.push("/vibes")
    }, 2000)
  }

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-3 sm:p-4 overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/3 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-accent/8 blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/3 right-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl animate-pulse animation-delay-300" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-4 sm:space-y-6">
        {/* Security Badge */}
        <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-20">
          <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent/30 to-accent/20 backdrop-blur-xl border border-accent/40 px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-lg hover:shadow-accent/50 transition-all duration-300">
            <Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-accent" />
            <span className="text-[10px] sm:text-xs font-bold text-accent">SECURED</span>
          </div>
        </div>

        {/* Logo Section */}
        <div className="mb-6 sm:mb-8 flex flex-col items-center space-y-3 sm:space-y-4 pt-8 sm:pt-10">
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-accent/30 blur-2xl group-hover:bg-accent/40 transition-all duration-500 scale-75" />
            <div className="absolute inset-0 rounded-full bg-accent/15 blur-3xl group-hover:bg-accent/25 transition-all duration-500 scale-100" />
            <QLogo className="relative h-14 w-14 sm:h-16 sm:w-16 text-accent group-hover: transition-all duration-300" />
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Reset Password</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Create a new secure password for your account</p>
          </div>
        </div>

        {/* Enhanced Card */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl hover:shadow-accent/20 transition-all duration-300 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-accent via-accent/50 to-accent/20 animate-gradient-x" />

          <CardHeader className="text-center space-y-2 sm:space-y-3 pb-4 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl font-bold flex items-center justify-center gap-2">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              Set New Password
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Choose a strong password to protect your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pb-4 sm:pb-6">
            <form onSubmit={handleResetPassword} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs sm:text-sm">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-500/50 bg-green-500/10">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-xs sm:text-sm text-green-500">
                    Password reset successfully! Redirecting...
                  </AlertDescription>
                </Alert>
              )}

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
                  New Password
                  <Lock className="h-3 w-3 text-accent" />
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
                  Confirm Password
                  <Lock className="h-3 w-3 text-accent" />
                </Label>
                <div className="relative group">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-secondary/50 border-border/50 focus:border-accent/50 focus:bg-secondary transition-all text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors group-focus-within:text-accent"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="text-xs text-destructive">Passwords do not match</p>
                )}
                {passwordsMatch && confirmPassword && (
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Passwords match
                  </p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="space-y-2 rounded-lg bg-secondary/30 p-3 sm:p-4">
                <p className="text-xs font-semibold text-foreground">Password Requirements:</p>
                <div className="space-y-1.5">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className={`h-1.5 w-1.5 rounded-full transition-all ${req.met ? "bg-green-500" : "bg-gray-400"}`} />
                      <span className={req.met ? "text-green-500" : ""}>{req.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-10 sm:h-11 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:to-accent shadow-lg hover:shadow-accent/50 transition-all duration-300 active:scale-95 text-sm sm:text-base font-semibold group/btn"
                disabled={loading || !allRequirementsMet || !passwordsMatch}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <span>Reset Password</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="space-y-2 sm:space-y-3">
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/login" className="font-semibold text-accent hover:text-accent/80 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
