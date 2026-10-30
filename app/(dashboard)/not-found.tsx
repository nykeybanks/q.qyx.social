import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DashboardNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 sm:p-8 min-h-96">
      <AlertCircle className="h-12 w-12 text-muted-foreground" />
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <p className="text-muted-foreground">This section doesn't exist</p>
      </div>
      <Link href="/vibes">
        <Button variant="outline" className="gap-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          Back to Vibes
        </Button>
      </Link>
    </div>
  )
}
