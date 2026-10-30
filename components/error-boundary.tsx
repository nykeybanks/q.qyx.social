"use client"

import React from "react"

import { Component, type ReactNode } from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[v0] Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex items-center justify-center min-h-[50vh] p-4">
          <div className="flex flex-col items-center gap-4 rounded-lg border border-destructive/20 bg-gradient-to-b from-destructive/5 to-destructive/2 p-6 sm:p-8 max-w-md">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-foreground">Something went wrong</h3>
              <p className="text-sm text-muted-foreground">We encountered an unexpected error</p>
            </div>
            {this.state.error && process.env.NODE_ENV === "development" && (
              <div className="rounded-lg bg-muted p-3 w-full max-h-32 overflow-auto">
                <p className="text-xs font-mono text-muted-foreground break-all">{this.state.error.message}</p>
              </div>
            )}
            <Button
              onClick={() => {
                this.setState({ hasError: false, error: undefined })
                window.location.reload()
              }}
              className="w-full gap-2 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:shadow-lg hover:shadow-accent/30 transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              Reload Page
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
