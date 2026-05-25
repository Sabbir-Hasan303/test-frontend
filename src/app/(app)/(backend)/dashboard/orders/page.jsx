"use client"

import { ChevronLeft, ChevronRight, Download, Eye, Search } from 'lucide-react'
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

/**
 * @typedef {Object} OrderItem
 * @property {string} id
 * @property {string} name
 * @property {string} variation
 * @property {number} quantity
 * @property {number} price
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} orderDate
 * @property {string} deliveryDate
 * @property {string} customer
 * @property {string} email
 * @property {string} phone
 * @property {string} address
 * @property {string} paymentType
 * @property {string} orderStatus
 * @property {string} deliveryStatus
 * @property {OrderItem[]} items
 * @property {number} subtotal
 * @property {number} deliveryCharge
 * @property {number} total
 */

// Mock data - replace with API call
const orders = [
  {
    id: "#345234",
    orderDate: "16/10/2024",
    deliveryDate: "25/10/2024",
    customer: "Anna M. Hines",
    email: "anna.hines@mail.com",
    phone: "(+1)-555-1564-261",
    address: "West Shewrapara, Mirpur, Dhaka",
    paymentType: "Card",
    orderStatus: "Confirmed",
    deliveryStatus: "Pending",
    items: [
      { id: "1", name: "Product A", variation: "Large", quantity: 2, price: 25.99 },
      { id: "2", name: "Product B", variation: "Red", quantity: 1, price: 34.99 },
    ],
    subtotal: 86.97,
    deliveryCharge: 5.00,
    total: 91.97,
  },
  {
    id: "#345235",
    orderDate: "16/10/2024",
    deliveryDate: "25/10/2024",
    customer: "Candice F. Gilmore",
    email: "candice.gilmore@mail.com",
    phone: "(+257)-755-5532-588",
    address: "Ajampur, Uttora, Dhaka",
    paymentType: "COD",
    orderStatus: "Cancelled",
    deliveryStatus: "Postponed",
    items: [],
    subtotal: 0,
    deliveryCharge: 0,
    total: 0,
  },
  // Add more mock orders as needed
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.email.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(order =>
    statusFilter === "all" ? true :
    order.orderStatus.toLowerCase() === statusFilter.toLowerCase() ||
    order.deliveryStatus.toLowerCase() === statusFilter.toLowerCase()
  )

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentOrders = filteredOrders.slice(startIndex, endIndex)

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDeliveryStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Postponed":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }


  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const openOrderModal = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Orders
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Orders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="postponed">Postponed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Payment Type</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Delivery Status</TableHead>
              <TableHead className="text-right sticky right-0 bg-white shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.1)]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.deliveryDate}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={order.address}>
                  {order.address}
                </TableCell>
                <TableCell>{order.paymentType}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getOrderStatusColor(order.orderStatus)}>
                    {order.orderStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getDeliveryStatusColor(order.deliveryStatus)}>
                    {order.deliveryStatus}
                  </Badge>
                </TableCell>
                <TableCell className="sticky right-0 bg-white">
                  <div className="flex justify-end gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openOrderModal(order)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View order details</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View order details</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>
        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? "default" : "outline"}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        {totalPages > 5 && <span className="mx-2">...</span>}
        {totalPages > 5 && (
          <Button
            variant="outline"
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </Button>
        )}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-6 p-4 border rounded-lg">
              <div className="grid gap-4 md:grid-cols-2 md:divide-x">
                <div className="space-y-2 md:pr-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Order ID:</span>
                    <span>{selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Customer:</span>
                    <span>{selectedOrder.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span>{selectedOrder.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Phone:</span>
                    <span>{selectedOrder.phone}</span>
                  </div>
                </div>
                <div className="space-y-2 md:pl-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Order Date:</span>
                    <span>{selectedOrder.orderDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Delivery Date:</span>
                    <span>{selectedOrder.deliveryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Payment Type:</span>
                    <span>{selectedOrder.paymentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Address:</span>
                    <span className="text-right">{selectedOrder.address}</span>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="font-medium">Order Status:</span>
                  <Badge variant="secondary" className={getOrderStatusColor(selectedOrder.orderStatus)}>
                    {selectedOrder.orderStatus}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Delivery Status:</span>
                  <Badge variant="secondary" className={getDeliveryStatusColor(selectedOrder.deliveryStatus)}>
                    {selectedOrder.deliveryStatus}
                  </Badge>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Variation</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.variation}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end">
                <div className="space-y-2">
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">Subtotal:</span>
                    <span>${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">Delivery Charge:</span>
                    <span>${selectedOrder.deliveryCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">Total:</span>
                    <span>${(selectedOrder.subtotal + selectedOrder.deliveryCharge).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

