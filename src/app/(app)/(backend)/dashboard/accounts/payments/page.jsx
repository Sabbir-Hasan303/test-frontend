"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
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
import { Badge } from "@/components/ui/badge"

// Sample payments data
const payments = [
  {
    orderId: "#345234",
    amount: 250,
    paymentMethod: "Card",
    paymentStatus: "Complete",
    paymentDate: "15/10/2024",
  },
  {
    orderId: "#345235",
    amount: 250,
    paymentMethod: "COD",
    paymentStatus: "Pending",
    paymentDate: "-",
  },
  // Add more mock data as needed
]

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredPayments = payments.filter(payment =>
    payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(payment =>
    statusFilter === "all" ? true : payment.paymentStatus.toLowerCase() === statusFilter.toLowerCase()
  )

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPayments = filteredPayments.slice(startIndex, endIndex)

  const getStatusColor = (status) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Payments</h1>
      </div>

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
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Update Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPayments.map((payment) => (
              <TableRow key={payment.orderId}>
                <TableCell>
                  <Link href={`/dashboard/orders/details/${payment.orderId}`} className="hover:underline">
                    {payment.orderId}
                  </Link>
                </TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.paymentMethod}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(payment.paymentStatus)}>
                    {payment.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>{payment.paymentDate}</TableCell>
                <TableCell>
                  {payment.paymentStatus === "Complete" ? (
                    <span className="text-green-600 font-medium">Completed</span>
                  ) : (
                    <Select
                      defaultValue={payment.paymentStatus.toLowerCase()}
                      onValueChange={() => {
                        // Here you would typically call an API to update the status
                        // console.log(`Updating status for ${payment.orderId} to ${value}`)
                      }}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="complete">Complete</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
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
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          disabled
        >
          {currentPage}
        </Button>
        {currentPage < totalPages && (
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {currentPage + 1}
          </Button>
        )}
        {currentPage + 1 < totalPages && (
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setCurrentPage(currentPage + 2)}
          >
            {currentPage + 2}
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
    </div>
  )
}

