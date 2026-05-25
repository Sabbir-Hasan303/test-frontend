"use client"

import { ArrowUpDown, ChevronLeft, ChevronRight, Eye, Pencil, Trash2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
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

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} picture
 * @property {string} role
 * @property {string} email
 * @property {string} phone
 * @property {string} address
 * @property {number} totalOrder
 * @property {number} totalValue
 * @property {number} totalReview
 * @property {'Active'|'Blocked'} status
 */

/** @type {User[]} */
const users = [
  {
    id: 1,
    name: "Alice Jonson",
    picture: "/placeholder-user.jpg",
    role: "admin",
    email: "example@gmail.com",
    phone: "+4325345525534",
    address: "42929 Velma Rapids, USA",
    totalOrder: 90,
    totalValue: 9000,
    totalReview: 90,
    status: "Active",
  },
  {
    id: 2,
    name: "Alice Jonson",
    picture: "/placeholder-user.jpg",
    role: "dealer",
    email: "example@gmail.com",
    phone: "+4325345525534",
    address: "42929 Velma Rapids, USA",
    totalOrder: 90,
    totalValue: 9000,
    totalReview: 90,
    status: "Blocked",
  },
]

export default function CustomerListPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredUsers = useMemo(() => {
    return users
      .filter(user => statusFilter === "all" || user.status === statusFilter)
      .filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery) ||
        user.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
  }, [statusFilter, searchQuery])

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...filteredUsers];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [filteredUsers, sortConfig]);


  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = sortedUsers.slice(startIndex, endIndex)

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
        <div className="flex items-center gap-x-2">
          <span className="text-muted-foreground">Total Customer</span>
          <Badge className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-lg font-medium tabular-nums">
            {users.length}
          </Badge>
        </div>
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
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
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
            {currentUsers.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <Image
                    src={user.picture}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.totalOrder}</TableCell>
                <TableCell>{user.totalValue}/=</TableCell>
                <TableCell>{user.totalReview}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/users/view/${user.id}`}> {/* Use dynamic user ID */}
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View User</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
                      asChild
                    >
                      <Link href={`/dashboard/users/edit/${user.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit User</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete User</span>
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
          <span className="sr-only">Previous</span>
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

