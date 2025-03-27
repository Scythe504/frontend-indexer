"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Download, RefreshCw, Filter } from "lucide-react"

type LogLevel = "info" | "warning" | "error" | "debug"

interface LogEntry {
  id: string
  timestamp: string
  level: LogLevel
  message: string
  source: string
  details?: string
}

// Sample log data
const sampleLogs: LogEntry[] = [
  {
    id: "log-1",
    timestamp: "2024-05-21 14:32:40",
    level: "info",
    message: "Transaction processed successfully",
    source: "Indexer",
    details:
      "Transaction xHHAv1arJkMAX5g18mZvb2XiPpGpLESFTXcQG2LP5gDZDL8a9UCB4p9fGdp5KdKgviyiEKbFTkvzK3B4pHAwV9E processed",
  },
  {
    id: "log-2",
    timestamp: "2024-05-21 14:32:38",
    level: "info",
    message: "Token transfer detected",
    source: "Indexer",
    details:
      "Transfer of 149.783915 ORCA from Hq8MmCBFavX2GooSCk9XFp4Whue3wmC3jaZqk1zDgSXx to Hxw77h9fEx598afiiZunwHaX3vYu9UskDk9EpPNZp1mG",
  },
  {
    id: "log-3",
    timestamp: "2024-05-21 14:32:35",
    level: "warning",
    message: "High latency detected",
    source: "System",
    details: "API response time exceeded threshold: 1200ms",
  },
  {
    id: "log-4",
    timestamp: "2024-05-21 14:32:30",
    level: "error",
    message: "Failed to connect to RPC endpoint",
    source: "System",
    details: "Connection timeout after 5000ms",
  },
  {
    id: "log-5",
    timestamp: "2024-05-21 14:32:25",
    level: "info",
    message: "New block received",
    source: "Indexer",
    details: "Block 328885460 received and queued for processing",
  },
  {
    id: "log-6",
    timestamp: "2024-05-21 14:32:20",
    level: "debug",
    message: "Processing transaction batch",
    source: "Indexer",
    details: "Batch size: 25 transactions",
  },
  {
    id: "log-7",
    timestamp: "2024-05-21 14:32:15",
    level: "info",
    message: "Webhook triggered",
    source: "System",
    details: "Webhook ID: wh_123456 triggered by new transaction",
  },
  {
    id: "log-8",
    timestamp: "2024-05-21 14:32:10",
    level: "warning",
    message: "Memory usage high",
    source: "System",
    details: "Current usage: 85% of allocated memory",
  },
]

export function LogsViewer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null)

  const filteredLogs = sampleLogs.filter((log) => {
    const matchesSearch =
      searchTerm === "" ||
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "system" && log.source === "System") ||
      (activeCategory === "indexing" && log.source === "Indexer") ||
      (activeCategory === "errors" && log.level === "error")

    return matchesSearch && matchesCategory
  })

  const toggleLogExpansion = (id: string) => {
    setExpandedLogId(expandedLogId === id ? null : id)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>Log Explorer</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Filter:</span>
              <select className="text-sm border rounded-md p-1">
                <option>Last 1 hour</option>
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
              </select>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All Logs</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="indexing">Indexing</TabsTrigger>
              <TabsTrigger value="errors">Errors</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="border rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-2 text-xs font-medium text-muted-foreground">Timestamp</th>
                    <th className="text-left p-2 text-xs font-medium text-muted-foreground">Level</th>
                    <th className="text-left p-2 text-xs font-medium text-muted-foreground">Source</th>
                    <th className="text-left p-2 text-xs font-medium text-muted-foreground">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-muted/50 cursor-pointer"
                        onClick={() => toggleLogExpansion(log.id)}
                      >
                        <td className="p-2 text-xs whitespace-nowrap">{log.timestamp}</td>
                        <td className="p-2">
                          <LogLevelBadge level={log.level} />
                        </td>
                        <td className="p-2 text-xs">{log.source}</td>
                        <td className="p-2 text-xs">{log.message}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-muted-foreground">
                        No logs found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {expandedLogId && (
            <div className="border rounded-md p-4 bg-muted/20">
              <h4 className="text-sm font-medium mb-2">Log Details</h4>
              <pre className="text-xs whitespace-pre-wrap bg-muted p-3 rounded-md overflow-x-auto">
                {JSON.stringify(
                  sampleLogs.find((log) => log.id === expandedLogId),
                  null,
                  2,
                )}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function LogLevelBadge({ level }: { level: LogLevel }) {
  const variants = {
    info: "bg-blue-50 text-blue-700 hover:bg-blue-50",
    warning: "bg-amber-50 text-amber-700 hover:bg-amber-50",
    error: "bg-red-50 text-red-700 hover:bg-red-50",
    debug: "bg-gray-50 text-gray-700 hover:bg-gray-50",
  }

  return (
    <Badge variant="outline" className={variants[level]}>
      {level}
    </Badge>
  )
}

