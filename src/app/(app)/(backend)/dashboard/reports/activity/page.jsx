"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const data = [
  {
    date: "2023-01-01",
    activeUsers: 4000,
    newSignups: 3000,
    purchases: 2000,
  },
  {
    date: "2023-02-01",
    activeUsers: 3000,
    newSignups: 2000,
    purchases: 1500,
  },
  {
    date: "2023-03-01",
    activeUsers: 5000,
    newSignups: 4500,
    purchases: 3000,
  },
  {
    date: "2023-04-01",
    activeUsers: 3000,
    newSignups: 2500,
    purchases: 2000,
  },
  {
    date: "2023-05-01",
    activeUsers: 3000,
    newSignups: 2500,
    purchases: 2000,
  },
  {
    date: "2023-06-01",
    activeUsers: 3000,
    newSignups: 2500,
    purchases: 2000,
  },
  {
    date: "2023-07-01",
    activeUsers: 3500,
    newSignups: 2500,
    purchases: 2000,
  },
]

export default function ActivityReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Customer Activity Report</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Sign-ups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Customer Activity Trends</CardTitle>
            <p className="text-sm text-muted-foreground">
              Overview of active users, new sign-ups, and purchases over time
            </p>
          </div>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString('default', { month: 'short' })
                  }}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Area
                  type="monotone"
                  dataKey="activeUsers"
                  stackId="1"
                  stroke="#14b8a6"
                  fill="#14b8a6"
                  fillOpacity={0.4}
                />
                <Area
                  type="monotone"
                  dataKey="newSignups"
                  stackId="1"
                  stroke="#f97316"
                  fill="#f97316"
                  fillOpacity={0.4}
                />
                <Area
                  type="monotone"
                  dataKey="purchases"
                  stackId="1"
                  stroke="#0f172a"
                  fill="#0f172a"
                  fillOpacity={0.4}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

