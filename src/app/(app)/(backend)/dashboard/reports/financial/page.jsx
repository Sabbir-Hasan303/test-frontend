"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const data = [
  {
    month: "Jan",
    revenue: 4000,
    expenses: 3000,
    profit: 1000,
  },
  {
    month: "Feb",
    revenue: 3000,
    expenses: 2000,
    profit: 1000,
  },
  {
    month: "Mar",
    revenue: 2000,
    expenses: 8000,
    profit: -6000,
  },
  {
    month: "Apr",
    revenue: 2800,
    expenses: 3500,
    profit: -700,
  },
  {
    month: "May",
    revenue: 2000,
    expenses: 4000,
    profit: -2000,
  },
  {
    month: "Jun",
    revenue: 2500,
    expenses: 3500,
    profit: -1000,
  },
  {
    month: "Jul",
    revenue: 3500,
    expenses: 4000,
    profit: -500,
  },
]

export default function FinancialReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Financial Report</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Revenue Vs Expenses</CardTitle>
            <p className="text-sm text-muted-foreground">
              A comparison of revenue and expenses over time
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
              <BarChart data={data}>
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar
                  dataKey="revenue"
                  fill="#14b8a6"
                  radius={[4, 4, 0, 0]}
                  name="Revenue"
                />
                <Bar
                  dataKey="expenses"
                  fill="#f97316"
                  radius={[4, 4, 0, 0]}
                  name="Expenses"
                />
                <Bar
                  dataKey="profit"
                  fill="#0f172a"
                  radius={[4, 4, 0, 0]}
                  name="Profit"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

