"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1000,
  },
  {
    name: "Feb",
    total: 1800,
  },
  {
    name: "Mar",
    total: 1400,
  },
  {
    name: "Apr",
    total: 800,
  },
  {
    name: "May",
    total: 1600,
  },
  {
    name: "Jun",
    total: 1700,
  },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
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
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#2D4356" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

