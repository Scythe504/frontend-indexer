"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  type: "info" | "warning" | "error" | "success"
  read: boolean
}

// Sample notifications
const sampleNotifications: Notification[] = [
  {
    id: "n1",
    title: "Indexing Complete",
    message: "Block range 328885400-328885460 has been successfully indexed.",
    timestamp: "2 minutes ago",
    type: "success",
    read: false,
  },
  {
    id: "n2",
    title: "High Memory Usage",
    message: "System memory usage has exceeded 80% threshold.",
    timestamp: "15 minutes ago",
    type: "warning",
    read: false,
  },
  {
    id: "n3",
    title: "API Latency Spike",
    message: "Database write latency has increased to 350ms.",
    timestamp: "1 hour ago",
    type: "warning",
    read: true,
  },
  {
    id: "n4",
    title: "Connection Error",
    message: "Failed to connect to RPC endpoint after 3 retries.",
    timestamp: "2 hours ago",
    type: "error",
    read: true,
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
              Mark all read
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll} disabled={notifications.length === 0}>
              Clear all
            </Button>
          </div>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-muted/50 cursor-pointer ${notification.read ? "opacity-70" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-2">
                    <NotificationIcon type={notification.type} />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                    </div>
                    {!notification.read && (
                      <div className="ml-auto">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              <p>No notifications</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function NotificationIcon({ type }: { type: Notification["type"] }) {
  const iconClasses = {
    info: "bg-blue-100 text-blue-700",
    warning: "bg-amber-100 text-amber-700",
    error: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700",
  }

  return (
    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${iconClasses[type]}`}>
      {type === "info" && <span>i</span>}
      {type === "warning" && <span>!</span>}
      {type === "error" && <span>×</span>}
      {type === "success" && <span>✓</span>}
    </div>
  )
}

