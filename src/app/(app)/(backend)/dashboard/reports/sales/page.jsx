"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
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
    totalSales: 4000,
    onlineSales: 2000,
    inStoreSales: 1500,
  },
  {
    date: "2023-02-01",
    totalSales: 3000,
    onlineSales: 1500,
    inStoreSales: 1500,
  },
  {
    date: "2023-03-01",
    totalSales: 2000,
    onlineSales: 9500,
    inStoreSales: 2000,
  },
  {
    date: "2023-04-01",
    totalSales: 2780,
    onlineSales: 4000,
    inStoreSales: 2500,
  },
  {
    date: "2023-05-01",
    totalSales: 2000,
    onlineSales: 4800,
    inStoreSales: 2000,
  },
  {
    date: "2023-06-01",
    totalSales: 2500,
    onlineSales: 4000,
    inStoreSales: 2500,
  },
  {
    date: "2023-07-01",
    totalSales: 3500,
    onlineSales: 4300,
    inStoreSales: 2000,
  },
]

export default function SalesReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Sales Report</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In-Store Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Sales Trends</CardTitle>
            <p className="text-sm text-muted-foreground">
              Comparison of total, online, and in-store sales over time
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
              <LineChart data={data}>
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
                <Line
                  type="monotone"
                  dataKey="totalSales"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  dot={{ strokeWidth: 2, r: 4 }}
                  name="Total Sales"
                />
                <Line
                  type="monotone"
                  dataKey="onlineSales"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ strokeWidth: 2, r: 4 }}
                  name="Online Sales"
                />
                <Line
                  type="monotone"
                  dataKey="inStoreSales"
                  stroke="#0f172a"
                  strokeWidth={2}
                  dot={{ strokeWidth: 2, r: 4 }}
                  name="In-Store Sales"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

