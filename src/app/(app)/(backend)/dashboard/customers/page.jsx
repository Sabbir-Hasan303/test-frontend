"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import Image from "next/image"
import { Pencil, Search, Trash2, Eye, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react'
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

// Sample data structure for customers
const customers = [
  {
    id: 1,
    name: "Alice Jonson",
    picture: "/placeholder.svg?height=40&width=40",
    email: "example@gmail.com",
    phone: "+4325345525534",
    totalOrder: 90,
    totalValue: 9000,
    totalReview: 90,
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    picture: "/placeholder.svg?height=40&width=40",
    email: "example2@gmail.com",
    phone: "+4325345525535",
    totalOrder: 45,
    totalValue: 4500,
    totalReview: 45,
    status: "Blocked",
  },
  // Add more mock data as needed
]

export default function CustomerListPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredCustomers = useMemo(() => {
    return customers
      .filter(customer => statusFilter === "all" || customer.status === statusFilter)
      .filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery)
      )
  }, [statusFilter, searchQuery])

  const sortedCustomers = useMemo(() => {
    let sortableCustomers = [...filteredCustomers];
    if (sortConfig !== null) {
      sortableCustomers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCustomers;
  }, [filteredCustomers, sortConfig]);

  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCustomers = sortedCustomers.slice(startIndex, endIndex)

  const requestSort = (key) => {
    let direction = "ascending"
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">All Customers</h1>

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:justify-end">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex-1 sm:w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
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
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('name')}>
                  User Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Picture</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('email')}>
                  Email <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('totalOrder')}>
                  Total Order <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('totalValue')}>
                  Total Value <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('totalReview')}>
                  Total Review <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('status')}>
                  Status <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>
                  <Image
                    src={customer.picture}
                    alt={customer.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.totalOrder}</TableCell>
                <TableCell>{customer.totalValue}/=</TableCell>
                <TableCell>{customer.totalReview}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Badge
                      variant="secondary"
                      className={
                        customer.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/customers/view/${customer.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View customer</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
                      asChild
                    >
                      <Link href={`/dashboard/customers/edit/${customer.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit customer</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete customer</span>
                    </Button>
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
        <Button variant="outline" size="sm" disabled>
          {currentPage}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  )
}

