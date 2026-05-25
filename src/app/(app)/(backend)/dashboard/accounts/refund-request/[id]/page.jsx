"use client"

import { ArrowLeft } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

// Sample data structure for order products
const fetchRefundRequestDetails = async (id) => {
  // This would be an API call in a real application
  return {
    orderId: id,
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    orderDate: "2023-05-15",
    refundRequestDate: "2023-05-20",
    totalAmount: 299.97,
    refundReason: "Items arrived damaged",
    refundStatus: "Pending",
    products: [
      {
        id: "P001",
        name: "Premium Headphones",
        price: 129.99,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
        variation: "Black"
      },
      {
        id: "P002",
        name: "Wireless Mouse",
        price: 49.99,
        quantity: 2,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "P003",
        name: "USB-C Cable",
        price: 14.99,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  }
}

export default function RefundRequestDetailsPage({ params }) {
  const [refundRequest, setRefundRequest] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [declineReason, setDeclineReason] = useState("")

  // In a real application, you would fetch the data here
  useState(() => {
    fetchRefundRequestDetails(params.id).then(data => {
      setRefundRequest(data)
      setIsLoading(false)
    })
  })

  if (isLoading || !refundRequest) {
    return <div>Loading...</div>
  }

  const handleAcceptRefund = () => {
    // Handle accept logic here
    // console.log("Refund accepted")
  }

  const handleDeclineRefund = () => {
    // Handle decline logic here
    // console.log("Refund declined:", declineReason)
    setDeclineReason("")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800"
      case "Declined":
        return "bg-red-100 text-red-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/accounts/refund-request">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to refund requests</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Refund Request Details</h1>
            <p className="text-sm text-muted-foreground">Order ID: {refundRequest.orderId}</p>
          </div>
        </div>
        <Badge variant="secondary" className={getStatusColor(refundRequest.refundStatus)}>
          {refundRequest.refundStatus}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Customer Name:</span>
              <span>{refundRequest.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Customer Email:</span>
              <span>{refundRequest.customerEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Order Date:</span>
              <span>{refundRequest.orderDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Refund Request Date:</span>
              <span>{refundRequest.refundRequestDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Amount:</span>
              <span>${refundRequest.totalAmount.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Refund Request Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="refundReason">Refund Reason</Label>
              <Textarea
                id="refundReason"
                value={refundRequest.refundReason}
                readOnly
                className="h-[100px] resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Variation</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refundRequest.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                      <span>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.variation || 'N/A'}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell className="text-right">${(product.price * product.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="font-medium">Total Amount:</span>
          <span className="font-medium">${refundRequest.totalAmount.toFixed(2)}</span>
        </CardFooter>
      </Card>

      <div className="flex justify-end gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Decline Refund</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Decline Refund Request</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to decline this refund request? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="declineReason">Reason for declining</Label>
                <Textarea
                  id="declineReason"
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  placeholder="Please provide a reason for declining this refund request"
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeclineRefund}>Decline Refund</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Accept Refund</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Accept Refund Request</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to accept this refund request? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAcceptRefund}>Accept Refund</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

