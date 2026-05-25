"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const pieData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 30 },
  { name: "Home & Garden", value: 20 },
  { name: "Books", value: 15 },
]

const COLORS = ['#14b8a6', '#f97316', '#0f172a', '#eab308']

const lowStockItems = [
  {
    name: "Smartphone X",
    category: "Electronics",
    currentStock: 5,
    reorderPoint: 10,
  },
  {
    name: "Designer T-shirt",
    category: "Clothing",
    currentStock: 8,
    reorderPoint: 15,
  },
  {
    name: "Garden Hose",
    category: "Home & Garden",
    currentStock: 3,
    reorderPoint: 7,
  },
  {
    name: "Bestseller Novel",
    category: "Books",
    currentStock: 2,
    reorderPoint: 5,
  },
]

export default function InventoryReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Inventory Report</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <CardDescription className="text-xs">Items below reorder point</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock Items</CardTitle>
            <CardDescription className="text-xs">Requires immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Inventory by Category</CardTitle>
              <CardDescription>
                Distribution of stock across product categories
              </CardDescription>
            </div>
            <Select defaultValue="current">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{
                      paddingTop: "20px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
            <CardDescription>
              Items that need to be restocked soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Reorder Point</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockItems.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.currentStock}</TableCell>
                    <TableCell>{item.reorderPoint}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

