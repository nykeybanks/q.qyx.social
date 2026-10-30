"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownLeft, Plus, Gift, TrendingUp, History, Download, Filter } from "lucide-react"

interface Transaction {
  id: string
  transaction_type: string
  amount: number
  source: string
  status: string
  created_at: string
  metadata?: any
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

const getTransactionIcon = (type: string) => {
  switch (type) {
    case "earned":
      return <Plus className="h-4 w-4 text-green-500" />
    case "withdrawn":
      return <ArrowUpRight className="h-4 w-4 text-orange-500" />
    case "bonus":
      return <Gift className="h-4 w-4 text-accent" />
    case "mining":
      return <TrendingUp className="h-4 w-4 text-accent" />
    default:
      return <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "default"
    case "pending":
      return "secondary"
    case "failed":
      return "destructive"
    default:
      return "outline"
  }
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [filter, setFilter] = useState<string>("all")

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "all") return true
    return t.transaction_type === filter
  })

  const handleExport = () => {
    const csv = [
      ["Date", "Type", "Amount", "Source", "Status"].join(","),
      ...filteredTransactions.map((t) =>
        [
          new Date(t.created_at).toLocaleDateString(),
          t.transaction_type,
          t.amount,
          t.source || "System",
          t.status,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transactions-${Date.now()}.csv`
    a.click()
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-accent" />
            Transaction History
          </CardTitle>
          <CardDescription>Your Bitcoin Points transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <History className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No transactions yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Your transaction history will appear here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-accent" />
              Transaction History
            </CardTitle>
            <CardDescription>Your Bitcoin Points transaction history</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[140px] bg-secondary">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="earned">Earned</SelectItem>
                <SelectItem value="withdrawn">Withdrawn</SelectItem>
                <SelectItem value="bonus">Bonus</SelectItem>
                <SelectItem value="mining">Mining</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleExport} className="bg-secondary">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="divide-y divide-border">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center gap-3 p-4 transition-colors hover:bg-accent/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                  {getTransactionIcon(transaction.transaction_type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium capitalize truncate">
                      {transaction.transaction_type.replace("_", " ")}
                    </p>
                    <Badge variant={getStatusColor(transaction.status)} className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{transaction.source || "System"}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(transaction.created_at), { addSuffix: true })}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${
                      transaction.transaction_type === "withdrawn" ? "text-orange-500" : "text-green-500"
                    }`}
                  >
                    {transaction.transaction_type === "withdrawn" ? "-" : "+"}
                    {transaction.amount.toFixed(8)} BTC
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
