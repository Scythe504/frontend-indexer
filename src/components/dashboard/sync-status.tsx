"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Clock } from "lucide-react"

export function SyncStatus() {
  const [syncProgress, setSyncProgress] = useState(87)
  const [activeStreams, setActiveStreams] = useState(3)
  const [inactiveStreams, setInactiveStreams] = useState(1)
  const [estimatedTime, setEstimatedTime] = useState("00:12:34")
  const [status, setStatus] = useState<"healthy" | "warning" | "error">("healthy")

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        const newProgress = prev + Math.random() * 0.5
        return newProgress > 100 ? 100 : newProgress
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Synchronization Status</CardTitle>
            <CardDescription>Real-time blockchain data indexing status</CardDescription>
          </div>
          <StatusIndicator status={status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Indexing Progress</span>
              <span className="font-medium">{syncProgress.toFixed(2)}%</span>
            </div>
            <Progress value={syncProgress} className="h-2" />
          </div>

          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Data Streams</span>
            <div className="flex gap-2 items-center">
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                {activeStreams} Active
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">
                {inactiveStreams} Inactive
              </Badge>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Estimated Time Remaining</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{estimatedTime}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Last Block Processed</span>
            <div className="font-medium">328885460</div>
            <div className="text-xs text-muted-foreground">2 seconds ago</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusIndicator({ status }: { status: "healthy" | "warning" | "error" }) {
  return (
    <div className="flex items-center gap-2">
      {status === "healthy" && (
        <>
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-sm font-medium text-green-700">System Healthy</span>
        </>
      )}
      {status === "warning" && (
        <>
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <span className="text-sm font-medium text-amber-700">Warning</span>
        </>
      )}
      {status === "error" && (
        <>
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-sm font-medium text-red-700">Error</span>
        </>
      )}
    </div>
  )
}

