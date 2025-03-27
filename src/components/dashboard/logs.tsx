"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SyncStatus } from "@/components/dashboard/sync-status"
import { LogsViewer } from "@/components/dashboard/logs-viewer"
import { PerformanceMetrics } from "@/components/dashboard/performance-metrics"
import { TransactionDetails } from "@/components/dashboard/transaction-details"
import { NotificationCenter } from "@/components/dashboard/notification-center"

export function LogsDashboard() {
    const [activeTab, setActiveTab] = useState("logs")

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Logs & Monitoring</h1>
                    <p className="text-muted-foreground">
                        Monitor blockchain transactions, system performance, and synchronization status
                    </p>
                </div>
                <NotificationCenter />
            </div>

            <SyncStatus />

            <Tabs defaultValue="logs" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 md:grid-cols-4 w-full md:w-auto">
                    <TabsTrigger value="logs">Logs</TabsTrigger>
                    <TabsTrigger value="metrics">Performance</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    <TabsTrigger value="settings" className="hidden md:block">
                        Settings
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="logs" className="mt-4">
                    <LogsViewer />
                </TabsContent>
                <TabsContent value="metrics" className="mt-4">
                    <PerformanceMetrics />
                </TabsContent>
                <TabsContent value="transactions" className="mt-4">
                    <TransactionDetails />
                </TabsContent>
                <TabsContent value="settings" className="mt-4">
                    <div className="rounded-lg border bg-card p-6">
                        <h3 className="text-lg font-medium mb-4">Log Settings</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Log Retention Period</label>
                                    <select className="w-full p-2 rounded-md border">
                                        <option>7 days</option>
                                        <option>30 days</option>
                                        <option>90 days</option>
                                        <option>1 year</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Export Format</label>
                                    <select className="w-full p-2 rounded-md border">
                                        <option>JSON</option>
                                        <option>CSV</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Notification Settings</label>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="critical-errors" defaultChecked />
                                        <label htmlFor="critical-errors">Critical Errors</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="sync-interruptions" defaultChecked />
                                        <label htmlFor="sync-interruptions">Synchronization Interruptions</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="performance-degradation" defaultChecked />
                                        <label htmlFor="performance-degradation">Performance Degradation</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="completed-jobs" defaultChecked />
                                        <label htmlFor="completed-jobs">Completed Large Indexing Jobs</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

