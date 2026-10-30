"use client"

import { useState, useEffect } from "react"
import { useSupabase } from "@/lib/supabase/client-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Wallet, Plus, Trash2, CheckCircle2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ConnectedWallet {
  id: string
  wallet_address: string
  wallet_type: string
  is_primary: boolean
  connected_at: string
}

export function WalletConnect() {
  const supabase = useSupabase()
  const { toast } = useToast()
  const [wallets, setWallets] = useState<ConnectedWallet[]>([])
  const [loading, setLoading] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [walletType, setWalletType] = useState("evm")

  useEffect(() => {
    loadWallets()
  }, [])

  const loadWallets = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", user.id)
      .order("is_primary", { ascending: false })

    if (!error && data) {
      setWallets(data)
    }
  }

  const handleAddWallet = async () => {
    if (!walletAddress.trim()) {
      toast({ title: "Error", description: "Please enter a wallet address", variant: "destructive" })
      return
    }

    setLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      return
    }

    const { error } = await supabase.from("wallets").insert({
      user_id: user.id,
      wallet_address: walletAddress,
      wallet_type: walletType,
      is_primary: wallets.length === 0,
    })

    setLoading(false)

    if (error) {
      toast({ title: "Error", description: "Failed to connect wallet", variant: "destructive" })
    } else {
      toast({ title: "Success", description: "Wallet connected successfully" })
      setWalletAddress("")
      setShowAdd(false)
      loadWallets()
    }
  }

  const handleRemoveWallet = async (walletId: string) => {
    const { error } = await supabase.from("wallets").delete().eq("id", walletId)

    if (error) {
      toast({ title: "Error", description: "Failed to remove wallet", variant: "destructive" })
    } else {
      toast({ title: "Success", description: "Wallet removed" })
      loadWallets()
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-accent/10 to-accent/5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-accent" />
              Connected Wallets
            </CardTitle>
            <CardDescription>Manage your Web3 wallet connections</CardDescription>
          </div>
          <Button onClick={() => setShowAdd(!showAdd)} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Wallet
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {showAdd && (
          <div className="mb-4 rounded-lg border border-border bg-card/50 p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wallet-type">Wallet Type</Label>
              <Select value={walletType} onValueChange={setWalletType}>
                <SelectTrigger id="wallet-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="evm">EVM (Ethereum, Polygon, BSC)</SelectItem>
                  <SelectItem value="bitcoin">Bitcoin</SelectItem>
                  <SelectItem value="solana">Solana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wallet-address">Wallet Address</Label>
              <Input
                id="wallet-address"
                placeholder="0x... or bc1..."
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddWallet} disabled={loading} className="flex-1">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Connect Wallet
              </Button>
              <Button onClick={() => setShowAdd(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        )}

        {wallets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Wallet className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold">No wallets connected</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-sm">
              Connect your Web3 wallet to receive Bitcoin Points directly
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {wallets.map((wallet) => (
              <div
                key={wallet.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/5"
              >
                <Avatar className="h-10 w-10 border-2 border-accent/20">
                  <AvatarFallback className="bg-accent/10 text-accent">
                    {wallet.wallet_type === "evm" ? "Ξ" : wallet.wallet_type === "bitcoin" ? "₿" : "◎"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium capitalize">{wallet.wallet_type}</p>
                    {wallet.is_primary && (
                      <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                        <CheckCircle2 className="h-3 w-3" />
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-mono truncate">{wallet.wallet_address}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveWallet(wallet.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
