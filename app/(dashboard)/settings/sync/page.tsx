"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  RefreshCw,
  Download,
  Upload,
  Sparkles,
  Calendar,
  Check,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { useSupabase } from "@/lib/supabase/client-provider"
import { useToast } from "@/hooks/use-toast"

type SocialPlatform = {
  id: string
  name: string
  icon: any
  color: string
  connected: boolean
  lastSync?: Date
  postsImported?: number
}

type SyncJob = {
  id: string
  platform: string
  status: "pending" | "running" | "completed" | "failed"
  progress: number
  startedAt: Date
  completedAt?: Date
  itemsProcessed: number
  itemsTotal: number
}

export default function SyncSettingsPage() {
  const supabase = useSupabase()
  const { toast } = useToast()
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    { id: "twitter", name: "Twitter / X", icon: Twitter, color: "#1DA1F2", connected: false },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "#E4405F", connected: false },
    { id: "facebook", name: "Facebook", icon: Facebook, color: "#4267B2", connected: false },
    { id: "youtube", name: "YouTube", icon: Youtube, color: "#FF0000", connected: false },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "#0077B5", connected: false },
  ])
  const [syncJobs, setSyncJobs] = useState<SyncJob[]>([])
  const [autoSync, setAutoSync] = useState(false)
  const [aiGeneration, setAiGeneration] = useState(false)
  const [syncing, setSyncing] = useState<string | null>(null)

  const handleConnect = async (platformId: string) => {
    toast({
      title: "Connecting...",
      description: `Opening ${platforms.find((p) => p.id === platformId)?.name} authentication`,
    })

    // Simulate OAuth flow
    setTimeout(() => {
      setPlatforms((prev) => prev.map((p) => (p.id === platformId ? { ...p, connected: true } : p)))
      toast({
        title: "Connected!",
        description: `Successfully connected to ${platforms.find((p) => p.id === platformId)?.name}`,
      })
    }, 2000)
  }

  const handleDisconnect = async (platformId: string) => {
    setPlatforms((prev) =>
      prev.map((p) => (p.id === platformId ? { ...p, connected: false, lastSync: undefined, postsImported: 0 } : p)),
    )
    toast({
      title: "Disconnected",
      description: `Disconnected from ${platforms.find((p) => p.id === platformId)?.name}`,
    })
  }

  const handleSyncNow = async (platformId: string) => {
    setSyncing(platformId)

    // Create sync job
    const newJob: SyncJob = {
      id: Date.now().toString(),
      platform: platformId,
      status: "running",
      progress: 0,
      startedAt: new Date(),
      itemsProcessed: 0,
      itemsTotal: 100,
    }
    setSyncJobs((prev) => [newJob, ...prev])

    // Simulate sync progress
    for (let i = 0; i <= 100; i += 20) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setSyncJobs((prev) =>
        prev.map((job) => (job.id === newJob.id ? { ...job, progress: i, itemsProcessed: i } : job)),
      )
    }

    // Complete sync
    setSyncJobs((prev) =>
      prev.map((job) =>
        job.id === newJob.id
          ? { ...job, status: "completed", progress: 100, completedAt: new Date(), itemsProcessed: 100 }
          : job,
      ),
    )

    setPlatforms((prev) =>
      prev.map((p) =>
        p.id === platformId ? { ...p, lastSync: new Date(), postsImported: (p.postsImported || 0) + 100 } : p,
      ),
    )

    setSyncing(null)
    toast({
      title: "Sync Complete",
      description: `Imported 100 posts from ${platforms.find((p) => p.id === platformId)?.name}`,
    })
  }

  const handleBulkImport = () => {
    toast({
      title: "Bulk Import Started",
      description: "Importing content from all connected platforms",
    })

    platforms
      .filter((p) => p.connected)
      .forEach((platform) => {
        setTimeout(() => handleSyncNow(platform.id), Math.random() * 1000)
      })
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold">Sync & Import</h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Connect and sync content from other social media platforms
        </p>
      </div>

      <Tabs defaultValue="platforms" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary mb-4 sm:mb-6">
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="import">Import</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        {/* Platforms Tab */}
        <TabsContent value="platforms" className="space-y-4">
          <div className="grid gap-4">
            {platforms.map((platform) => {
              const Icon = platform.icon
              return (
                <Card key={platform.id} className="border-border bg-card">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div
                          className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: platform.color + "20" }}
                        >
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: platform.color }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm sm:text-base">{platform.name}</h3>
                            {platform.connected && (
                              <Badge variant="secondary" className="bg-accent/20 text-accent text-xs">
                                <Check className="h-3 w-3 mr-1" />
                                Connected
                              </Badge>
                            )}
                          </div>
                          {platform.connected && platform.lastSync && (
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                              Last synced: {platform.lastSync.toLocaleString()}
                            </p>
                          )}
                          {platform.connected && platform.postsImported !== undefined && (
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {platform.postsImported} posts imported
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {platform.connected ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSyncNow(platform.id)}
                              disabled={syncing === platform.id}
                              className="bg-transparent"
                            >
                              {syncing === platform.id ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              ) : (
                                <RefreshCw className="h-4 w-4 mr-2" />
                              )}
                              Sync Now
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDisconnect(platform.id)}>
                              Disconnect
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleConnect(platform.id)}
                            className="bg-accent hover:bg-accent/90"
                          >
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Import Tab */}
        <TabsContent value="import" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Bulk Import</CardTitle>
              <CardDescription>Import all content from connected platforms at once</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full bg-accent hover:bg-accent/90"
                onClick={handleBulkImport}
                disabled={!platforms.some((p) => p.connected)}
              >
                <Download className="h-4 w-4 mr-2" />
                Import from All Platforms
              </Button>

              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-3">Recent Sync Jobs</h4>
                <div className="space-y-3">
                  {syncJobs.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">No sync jobs yet</p>
                  ) : (
                    syncJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                        <div className="flex items-center gap-3">
                          {job.status === "completed" && <Check className="h-5 w-5 text-green-500" />}
                          {job.status === "running" && <Loader2 className="h-5 w-5 animate-spin text-accent" />}
                          {job.status === "failed" && <X className="h-5 w-5 text-red-500" />}
                          <div>
                            <p className="text-sm font-medium">{platforms.find((p) => p.id === job.platform)?.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {job.itemsProcessed} / {job.itemsTotal} items
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {job.status === "running" && (
                            <p className="text-sm font-medium text-accent">{job.progress}%</p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {job.completedAt?.toLocaleTimeString() || "In progress..."}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Manual Upload</CardTitle>
              <CardDescription>Upload media and posts directly from your device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                <Button variant="outline" className="bg-transparent">
                  Choose Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                AI Content Generation
              </CardTitle>
              <CardDescription>Automatically generate posts from your imported content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable AI Generation</p>
                  <p className="text-sm text-muted-foreground">
                    Use AI to create new posts based on your imported content
                  </p>
                </div>
                <Switch checked={aiGeneration} onCheckedChange={setAiGeneration} />
              </div>

              {aiGeneration && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="space-y-2">
                    <Label>Generation Style</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="bg-accent/10 border-accent">
                        Creative
                      </Button>
                      <Button variant="outline" className="bg-transparent">
                        Professional
                      </Button>
                      <Button variant="outline" className="bg-transparent">
                        Casual
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Content Types</Label>
                    <div className="space-y-2">
                      {["Text Posts", "Image Captions", "Video Descriptions", "Thread Summaries"].map((type) => (
                        <div key={type} className="flex items-center justify-between">
                          <span className="text-sm">{type}</span>
                          <Switch defaultChecked />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Scheduled Sync
              </CardTitle>
              <CardDescription>Automatically sync content at regular intervals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto Sync</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically import new content from connected platforms
                  </p>
                </div>
                <Switch checked={autoSync} onCheckedChange={setAutoSync} />
              </div>

              {autoSync && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="space-y-2">
                    <Label>Sync Frequency</Label>
                    <div className="grid grid-cols-4 gap-2">
                      <Button variant="outline" className="bg-accent/10 border-accent text-xs">
                        Hourly
                      </Button>
                      <Button variant="outline" className="bg-transparent text-xs">
                        Daily
                      </Button>
                      <Button variant="outline" className="bg-transparent text-xs">
                        Weekly
                      </Button>
                      <Button variant="outline" className="bg-transparent text-xs">
                        Custom
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-accent">Premium Feature</p>
                      <p className="text-muted-foreground">Automatic sync requires a premium subscription</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Content Aggregation</CardTitle>
              <CardDescription>Combine and analyze content from multiple sources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary text-center">
                  <p className="text-2xl font-bold text-accent">
                    {platforms.reduce((sum, p) => sum + (p.postsImported || 0), 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Posts Imported</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary text-center">
                  <p className="text-2xl font-bold text-accent">{platforms.filter((p) => p.connected).length}</p>
                  <p className="text-sm text-muted-foreground">Connected Platforms</p>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                View Analytics Dashboard
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
