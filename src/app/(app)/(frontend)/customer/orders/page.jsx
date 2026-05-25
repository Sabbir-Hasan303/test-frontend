"use client"

import { useState } from "react"
import { CustomerLayout } from "@/components/frontend/customer/customer-layout"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye } from 'lucide-react'
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock order data
const orders = [
  { id: '1', date: '2023-05-01', total: 125.99, status: 'Delivered', items: 3 },
  { id: '2', date: '2023-05-15', total: 79.99, status: 'Processing', items: 2 },
  { id: '3', date: '2023-05-22', total: 199.99, status: 'Shipped', items: 4 },
  { id: '4', date: '2023-06-05', total: 149.99, status: 'Processing', items: 3 },
  { id: '5', date: '2023-06-10', total: 89.99, status: 'Delivered', items: 1 },
]

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 5
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <CustomerLayout>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <h1 className="text-2xl font-semibold mb-6 text-[#253D4E]">My Orders</h1>
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/customer/orders/${order.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile view */}
        <div className="md:hidden space-y-4">
          {currentOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle className="text-lg">Order #{order.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Date:</div>
                  <div>{order.date}</div>
                  <div>Total:</div>
                  <div>${order.total.toFixed(2)}</div>
                  <div>Items:</div>
                  <div>{order.items}</div>
                  <div>Status:</div>
                  <div>
                    <Badge className={`${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href={`/customer/orders/${order.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      View Order
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
            <Button
              key={i}
              onClick={() => paginate(i + 1)}
              variant={currentPage === i + 1 ? "default" : "outline"}
              className="mx-1"
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>
    </CustomerLayout>
  )
}
