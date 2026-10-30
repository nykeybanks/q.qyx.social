"use client"

import { useEffect, useState } from "react"
import { Activity } from "lucide-react"

interface PerformanceMetrics {
  fps: number
  memory: number
  loadTime: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memory: 0,
    loadTime: 0,
  })

  useEffect(() => {
    // Calculate load time
    if (typeof window !== "undefined" && window.performance) {
      const perfData = window.performance.timing
      const loadTime = perfData.loadEventEnd - perfData.navigationStart
      setMetrics((prev) => ({ ...prev, loadTime: Math.round(loadTime) }))
    }

    // Monitor FPS
    let frameCount = 0
    let lastTime = performance.now()

    const countFrame = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        setMetrics((prev) => ({ ...prev, fps: frameCount }))
        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(countFrame)
    }

    const rafId = requestAnimationFrame(countFrame)

    // Monitor memory (if available)
    const memoryInterval = setInterval(() => {
      const performanceObj = performance as unknown as { memory?: { usedJSHeapSize: number } }
      if (performanceObj.memory) {
        const usedMemory = performanceObj.memory.usedJSHeapSize / 1048576 // Convert to MB
        setMetrics((prev) => ({ ...prev, memory: Math.round(usedMemory) }))
      }
    }, 2000)

    return () => {
      cancelAnimationFrame(rafId)
      clearInterval(memoryInterval)
    }
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-lg border border-border bg-card p-3 shadow-lg text-xs font-mono">
      <div className="flex items-center gap-2 mb-2 text-accent">
        <Activity className="h-3 w-3" />
        <span className="font-semibold">Performance</span>
      </div>
      <div className="space-y-1 text-muted-foreground">
        <div>
          FPS: <span className="text-foreground">{metrics.fps}</span>
        </div>
        <div>
          Memory: <span className="text-foreground">{metrics.memory} MB</span>
        </div>
        <div>
          Load: <span className="text-foreground">{metrics.loadTime} ms</span>
        </div>
      </div>
    </div>
  )
}
