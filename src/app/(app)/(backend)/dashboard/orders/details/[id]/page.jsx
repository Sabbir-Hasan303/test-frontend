"use client"

import { useState } from "react"
import { ArrowLeft, Check, Download } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

/**
 * @typedef {Object} OrderProduct
 * @property {string} id
 * @property {string} name
 * @property {string} variation
 * @property {number} quantity
 * @property {number} price
 * @property {number} total
 */

/**
 * @typedef {Object} OrderTimeline
 * @property {string} title
 * @property {string} description
 * @property {string} timestamp
 * @property {'completed' | 'current' | 'pending'} status
 */

const products = [
  {
    id: "P001",
    name: "G15 Gaming Laptop",
    variation: "15-inch",
    quantity: 3,
    price: 240.59,
    total: 721.77,
  },
  {
    id: "P002",
    name: "Sony Alpha ILCE 6000Y 24.3 MP Mirrorless Digital SLR Camera",
    variation: "Black",
    quantity: 5,
    price: 135.99,
    total: 679.95,
  },
  {
    id: "P003",
    name: "Sony Over-Ear Wireless Headphone with Mic",
    variation: "White",
    quantity: 1,
    price: 99.49,
    total: 99.49,
  },
  {
    id: "P004",
    name: "Adam ROMA USB-C / USB-A 3.1 (2-in-1 Flash Drive) - 128GB",
    variation: "128GB",
    quantity: 2,
    price: 350.19,
    total: 700.38,
  },
]

const timeline = [
  {
    title: "The packing has been started",
    description: "Confirmed by Gaston Lapierre",
    timestamp: "April 23, 2024, 09:40 am",
    status: "completed",
  },
  {
    title: "The invoice has been sent to the customer",
    description: "Invoice email was sent to hello@johndoemuffin.com",
    timestamp: "April 23, 2024, 09:40 am",
    status: "completed",
  },
  {
    title: "The invoice has been created",
    description: "Invoice created by Gaston Lapierre",
    timestamp: "April 23, 2024, 09:40 am",
    status: "completed",
  },
  {
    title: "Order Payment",
    description: "Using Master Card",
    timestamp: "April 23, 2024, 09:40 am",
    status: "completed",
  },
  {
    title: "Order confirmed by Gaston Lapierre",
    description: "Order 1 • Order 2 • Order 3 • Order 4",
    timestamp: "April 23, 2024, 09:40 am",
    status: "completed",
  },
]

const progressSteps = [
  { label: "Order Confirming", status: "completed" },
  { label: "Payment Pending", status: "completed" },
  { label: "Processing", status: "current" },
  { label: "Shipping", status: "pending" },
  { label: "Delivered", status: "pending" },
]

export default function OrderDetailsPage({ params }) {
  const [isProcessing, setIsProcessing] = useState(true)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isCancelAlertOpen, setIsCancelAlertOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState("")

  const handleMarkAsComplete = () => {
    setIsProcessing(false)
    // Here you would typically make an API call to update the order status
  }

  const calculateSubtotal = () => {
    return products.reduce((sum, product) => sum + product.total, 0)
  }

  const subtotal = calculateSubtotal()
  const discount = 60.00
  const deliveryCharge = 0.00
  const tax = 20.00
  const total = subtotal - discount + deliveryCharge + tax

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/orders">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to orders</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">Order Details</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground">#{params.id}</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Paid</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
          <AlertDialog open={isCancelAlertOpen} onOpenChange={setIsCancelAlertOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto" onClick={() => setIsCancelAlertOpen(true)}>
                Cancel Order
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel this order? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="my-4">
                <label htmlFor="cancelReason" className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for cancellation:
                </label>
                <textarea
                  id="cancelReason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Please provide a reason for cancelling this order"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => {
                  setIsCancelAlertOpen(false);
                  setCancelReason("");
                }}>
                  No, keep order
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  // Add your cancel order logic here, including the reason
                  console.log('Order cancelled. Reason:', cancelReason);
                  setIsCancelAlertOpen(false);
                  setCancelReason("");
                }}>
                  Yes, cancel order
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="outline" className="border-gray-300 w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
          </Button>
        </div>
      </div>

      {isProcessing && (
        <>
          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogTrigger asChild>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setIsAlertOpen(true)}
              >
                <Check className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Mark As Complete Processing/ Shipping/ Delivered</span>
                <span className="sm:hidden">Mark Complete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to mark this order as complete? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  handleMarkAsComplete();
                  setIsAlertOpen(false);
                }}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex justify-between mb-2">
              {progressSteps.map((step) => (
                <div key={step.label} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-full h-2 rounded ${
                      step.status === "completed"
                        ? "bg-green-500"
                        : step.status === "current"
                        ? "bg-orange-500"
                        : "bg-gray-200"
                    }`}
                  />
                  <span className="mt-2 text-sm text-muted-foreground">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6 overflow-hidden">
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Variation</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.variation}</TableCell>
                      <TableCell className="text-right">{product.quantity}</TableCell>
                      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${product.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products From Order #{params.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Variation</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.variation}</TableCell>
                      <TableCell className="text-right">{product.quantity}</TableCell>
                      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${product.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sub Total :</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount :</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Charge :</span>
                  <span>${deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Tax (15.5%) :</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total Amount</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <h3 className="font-medium">Alice S. Shepherd</h3>
            <p className="text-sm text-muted-foreground">4251 Private Lane,</p>
            <p className="text-sm text-muted-foreground">Valdosta, GA 31601</p>
            <div className="text-sm text-muted-foreground">
              <div>Phone : 229-269-1411</div>
              <div>Mobile : 740-302-6656</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Type :</span>
              <span>Credit Card</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction ID :</span>
              <span>#DN768139053</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Card Holder Name :</span>
              <span>Gaston Lapierre</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative border-l border-gray-200 ml-3 space-y-8">
            {timeline.map((event, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[25px] mt-1.5">
                  <div className="h-4 w-4 rounded-full border-2 border-green-500 bg-white" />
                </div>
                <div className="mb-1">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
                <time className="text-xs text-muted-foreground">{event.timestamp}</time>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

