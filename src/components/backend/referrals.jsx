"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Facebook", value: 400 },
  { name: "Instagram", value: 600 },
  { name: "Twitter", value: 500 },
  { name: "LinkedIn", value: 300 },
  { name: "Pinterest", value: 450 },
  { name: "Others", value: 470 }
]

export function Referrals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Referrals</CardTitle>
        <p className="text-sm text-muted-foreground">January - June 2024</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="name"
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
              />
              <Bar
                dataKey="value"
                fill="#f97316"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-end mt-2">
          <p className="text-sm text-muted-foreground">Showing total referrals</p>
        </div>
      </CardContent>
    </Card>
  )
}

