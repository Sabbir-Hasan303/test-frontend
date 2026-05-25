"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
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

// Sample data structure for refund requests
const refundRequests = [
  {
    orderId: "#345234",
    amount: 250,
    paymentMethod: "Card",
    paymentDate: "15/10/2024",
    refundReason: "Lorem Ipsum is simply dummy text of the printing...",
    refundStatus: "Accepted",
  },
  {
    orderId: "#345234",
    amount: 250,
    paymentMethod: "bKash",
    paymentDate: "15/10/2024",
    refundReason: "Lorem Ipsum is simply dummy text of the printing...",
    refundStatus: "Accepted",
  },
  {
    orderId: "#345234",
    amount: 250,
    paymentMethod: "ABBL",
    paymentDate: "15/10/2024",
    refundReason: "Lorem Ipsum is simply dummy text of the printing...",
    refundStatus: "Declined",
  },
]

export default function RefundRequestPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredRequests = refundRequests.filter(request =>
    request.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(request =>
    paymentMethodFilter === "all" ? true :
    request.paymentMethod.toLowerCase() === paymentMethodFilter.toLowerCase()
  ).filter(request =>
    statusFilter === "all" ? true :
    request.refundStatus.toLowerCase() === statusFilter.toLowerCase()
  )

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentRequests = filteredRequests.slice(startIndex, endIndex)

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Refund Request</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="card">Card</SelectItem>
            <SelectItem value="bkash">bKash</SelectItem>
            <SelectItem value="abbl">ABBL</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Refund Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Refund Reason</TableHead>
              <TableHead>Refund Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRequests.map((request, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link href={`/dashboard/accounts/refund-request/${request.orderId.replace('#', '')}`} className="block hover:bg-muted/50">
                    {request.orderId}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/accounts/refund-request/${request.orderId.replace('#', '')}`} className="block hover:bg-muted/50">
                    ${request.amount}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/accounts/refund-request/${request.orderId.replace('#', '')}`} className="block hover:bg-muted/50">
                    {request.paymentMethod}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/accounts/refund-request/${request.orderId.replace('#', '')}`} className="block hover:bg-muted/50">
                    {request.paymentDate}
                  </Link>
                </TableCell>
                <TableCell className="max-w-[300px] truncate">
                  <Link href={`/dashboard/accounts/refund-request/${request.orderId.replace('#', '')}`} className="block hover:bg-muted/50" title={request.refundReason}>
                    {request.refundReason}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/accounts/refund-request/${request.orderId.replace('#', '')}`} className="block hover:bg-muted/50">
                    <Badge variant="secondary" className={getStatusColor(request.refundStatus)}>
                      {request.refundStatus}
                    </Badge>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
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
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

