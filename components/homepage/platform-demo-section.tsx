"use client"

import { useState } from "react"
import { FeatureDemoModal } from "./feature-demo-modal"
import { QThreadsIcon, QCirclesIcon, QGramIcon } from "@/components/icons/q-logo"
import { Bitcoin, Eye, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PlatformDemoSection() {
  const [openModal, setOpenModal] = useState<string | null>(null)

  const platforms = [
    {
      id: "q-vibes",
      icon: QThreadsIcon,
      name: "Q Vibes",
      description: "Real-time microblogging with categories and instant rewards",
      points: "2-25 pts",
      features: ["Category-based feeds", "Quote and reply threads", "Instant engagement"],
      color: "from-accent/20 to-accent/5"
    },
    {
      id: "q-circles",
      icon: QCirclesIcon,
      name: "Q Circles",
      description: "Build communities with powerful moderation and events",
      points: "5-50 pts",
      features: ["Member management", "Event planning", "Moderation tools"],
      color: "from-champagne/20 to-champagne/5"
    },
    {
      id: "q-gram",
      icon: QGramIcon,
      name: "Q Gram",
      description: "Visual storytelling with AI moderation and creator rewards",
      points: "25-200 pts",
      features: ["Stories & highlights", "Visual discovery", "Creator monetization"],
      color: "from-pink-500/20 to-pink-500/5"
    }
  ]

  return (
    <>
      {/* Platform Cards Grid */}
      <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-3">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="group relative rounded-2xl border border-border bg-gradient-to-br from-card via-card to-card/80 p-6 sm:p-8 transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Corner accent */}
            <div className="absolute top-0 right-0 h-24 w-24 bg-accent/5 rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="relative">
              {/* Icon with animated background */}
              <div className="mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 transition-transform group-hover:rotate-3">
                <platform.icon className="h-7 w-7 sm:h-8 sm:w-8 text-accent transition-all" />
              </div>

              {/* Platform badge */}
              <div className="absolute top-0 right-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent border border-accent/20">
                LIVE
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                {platform.name}
              </h3>

              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {platform.description}
              </p>

              {/* Features List */}
              <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                {platform.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground group/item hover:text-foreground transition-colors"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-accent/20 group-hover/item:ring-4 transition-all" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Reward indicator */}
              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Earn per activity</span>
                <div className="flex items-center gap-1.5">
                  <Bitcoin className="h-3.5 w-3.5 text-accent" />
                  <span className="text-sm font-semibold text-accent">{platform.points}</span>
                </div>
              </div>

              {/* View Demo Button */}
              <Button
                onClick={() => setOpenModal(platform.id)}
                className="w-full mt-4 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground transition-all group/btn"
              >
                <Eye className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                <span>View Full Demo</span>
                <ExternalLink className="h-3.5 w-3.5 ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Demo Modals */}
      {platforms.map((platform) => (
        <FeatureDemoModal
          key={platform.id}
          featureId={platform.id}
          open={openModal === platform.id}
          onOpenChange={(open) => setOpenModal(open ? platform.id : null)}
        />
      ))}
    </>
  )
}
