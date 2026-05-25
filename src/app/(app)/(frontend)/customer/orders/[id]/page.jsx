"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { CustomerLayout } from "@/components/frontend/customer/customer-layout"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Package, CheckCircle } from 'lucide-react'

// Mock order data
const orderDetails = {
  id: '2',
  date: '2023-05-15',
  total: 79.99,
  status: 'Processing',
  items: [
    { id: 1, name: 'Product 1 Product 1 Product 1', quantity: 1, price: 29.99 },
    { id: 2, name: 'Product 2', quantity: 1, price: 50.00 },
  ],
  shippingAddress: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
    country: 'USA'
  },
  trackingSteps: [
    { id: 1, title: 'Order Placed', description: 'Your order has been placed', completed: true },
    { id: 2, title: 'Processing', description: 'Your order is being processed', completed: true },
    { id: 3, title: 'Shipped', description: 'Your order has been shipped', completed: false },
    { id: 4, title: 'Out for Delivery', description: 'Your order is out for delivery', completed: false },
    { id: 5, title: 'Delivered', description: 'Your order has been delivered', completed: false },
  ]
}

export default function OrderDetailsPage() {
  const params = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    // Simulate API call to fetch order details
    console.log("Fetching order details for ID:", params.id)
    setTimeout(() => {
      setOrder(orderDetails) // Replace with API response in real scenario
    }, 1000)
  }, [params.id])

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

  if (!order) {
    return (
      <CustomerLayout>
        <div className="bg-white shadow rounded-lg p-6">
          <p>Loading order details...</p>
        </div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#253D4E]">Order Details</h1>
          <Badge className={`${getStatusColor(order.status)}`}>
            {order.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Order ID:</strong> #{order.id}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <p><strong>Estimated Delivery:</strong> {order.status === 'Delivered' ? 'Delivered' : '2023-06-20'}</p>
              <p><strong>Tracking Number:</strong> 1Z999AA1123456789</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {order.trackingSteps.map((step, index) => (
                <div key={step.id} className="flex items-center mb-8 last:mb-0">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step.completed ? 'bg-green-500' : 'bg-gray-300'
                  } mr-4`}>
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      index === 1 ? <Package className="w-5 h-5 text-gray-600" /> :
                      index === 2 ? <Truck className="w-5 h-5 text-gray-600" /> :
                      <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                  {index < order.trackingSteps.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  )
}
