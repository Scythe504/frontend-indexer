"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

// Sample performance data
const performanceData = [
  { time: "00:00", tps: 120, latency: 250, memory: 45, cpu: 30 },
  { time: "01:00", tps: 132, latency: 245, memory: 48, cpu: 32 },
  { time: "02:00", tps: 101, latency: 290, memory: 46, cpu: 28 },
  { time: "03:00", tps: 134, latency: 240, memory: 50, cpu: 35 },
  { time: "04:00", tps: 90, latency: 310, memory: 52, cpu: 38 },
  { time: "05:00", tps: 110, latency: 280, memory: 55, cpu: 40 },
  { time: "06:00", tps: 140, latency: 220, memory: 60, cpu: 45 },
  { time: "07:00", tps: 180, latency: 190, memory: 65, cpu: 50 },
  { time: "08:00", tps: 220, latency: 170, memory: 70, cpu: 55 },
  { time: "09:00", tps: 270, latency: 150, memory: 75, cpu: 60 },
  { time: "10:00", tps: 250, latency: 160, memory: 72, cpu: 58 },
  { time: "11:00", tps: 210, latency: 180, memory: 68, cpu: 52 },
]

const indexingSuccessData = [
  { name: "Successful", value: 92, color: "#10b981" },
  { name: "Failed", value: 5, color: "#ef4444" },
  { name: "Pending", value: 3, color: "#f59e0b" },
]

export function PerformanceMetrics() {
  const [timeRange, setTimeRange] = useState("24h")

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Transaction Processing Rate</CardTitle>
            <Tabs defaultValue="24h" value={timeRange} onValueChange={setTimeRange}>
              <TabsList>
                <TabsTrigger value="1h">1h</TabsTrigger>
                <TabsTrigger value="24h">24h</TabsTrigger>
                <TabsTrigger value="7d">7d</TabsTrigger>
                <TabsTrigger value="30d">30d</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="tps"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorTps)"
                  name="Transactions/sec"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Database Latency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="latency" stroke="#ff9800" name="Latency (ms)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Indexing Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={indexingSuccessData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {indexingSuccessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Resource Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="memory" fill="#3b82f6" name="Memory (%)" />
                <Bar dataKey="cpu" fill="#10b981" name="CPU (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-md shadow-md p-2 text-xs">
        <p className="font-medium">{`Time: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }

  return null
}

