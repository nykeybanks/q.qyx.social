"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCcw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="dark bg-background">
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="w-full max-w-lg space-y-6 text-center">
            <div className="inline-flex rounded-full bg-destructive/10 p-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-foreground">Critical Error</h1>
              <p className="mt-2 text-muted-foreground">
                The application encountered a critical error and needs to restart.
              </p>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-mono text-muted-foreground">{error.message}</p>
            </div>

            <Button onClick={reset} className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Restart Application
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
