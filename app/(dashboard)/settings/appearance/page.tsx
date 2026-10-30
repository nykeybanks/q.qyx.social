"use client"

import { useState } from "react"
import { Check, Moon, Palette, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

export default function AppearanceSettings() {
  const { toast } = useToast()
  const [theme, setTheme] = useState("dark")
  const [accentColor, setAccentColor] = useState("gold")
  const [fontSize, setFontSize] = useState("medium")

  const accentColors = [
    { name: "Quantum Gold", value: "gold", color: "#C9A86A" },
    { name: "Champagne", value: "champagne", color: "#E6C7A0" },
    { name: "Platinum", value: "platinum", color: "#ECECEC" },
    { name: "Silver", value: "silver", color: "#C0C0C0" },
    { name: "Titanium", value: "titanium", color: "#B0B0B0" },
  ]

  const fontSizes = [
    { name: "Small", value: "small" },
    { name: "Medium", value: "medium" },
    { name: "Large", value: "large" },
  ]

  const handleSave = () => {
    localStorage.setItem("theme", theme)
    localStorage.setItem("accentColor", accentColor)
    localStorage.setItem("fontSize", fontSize)

    toast({
      title: "Settings saved",
      description: "Your appearance preferences have been updated.",
    })
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-1">Appearance</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">Customize how Q Social looks and feels</p>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="space-y-6 sm:space-y-8">
          {/* Theme */}
          <div>
            <Label className="text-sm sm:text-base font-semibold mb-3 block">Theme</Label>
            <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-2 gap-3 sm:gap-4">
              <label
                className={`flex items-center justify-center gap-2 p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  theme === "light" ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                }`}
              >
                <RadioGroupItem value="light" className="sr-only" />
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm font-medium">Light</span>
              </label>

              <label
                className={`flex items-center justify-center gap-2 p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  theme === "dark" ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                }`}
              >
                <RadioGroupItem value="dark" className="sr-only" />
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm font-medium">Dark</span>
              </label>
            </RadioGroup>
          </div>

          {/* Accent Color */}
          <div>
            <Label className="text-sm sm:text-base font-semibold mb-3 block">Accent Color</Label>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setAccentColor(color.value)}
                  className={`relative aspect-square rounded-lg border-2 transition-all hover:scale-105 ${
                    accentColor === color.value ? "border-accent" : "border-border"
                  }`}
                  style={{ backgroundColor: color.color }}
                >
                  {accentColor === color.value && (
                    <Check className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow-md" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <Label className="text-sm sm:text-base font-semibold mb-3 block">Font Size</Label>
            <RadioGroup value={fontSize} onValueChange={setFontSize} className="space-y-2 sm:space-y-3">
              {fontSizes.map((size) => (
                <label
                  key={size.value}
                  className={`flex items-center gap-3 p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    fontSize === size.value ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                  }`}
                >
                  <RadioGroupItem value={size.value} />
                  <span className="text-xs sm:text-sm font-medium">{size.name}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Save Button */}
          <Button onClick={handleSave} className="w-full sm:w-auto">
            <Palette className="h-4 w-4 mr-2" />
            Save Appearance
          </Button>
        </div>
      </Card>
    </div>
  )
}
