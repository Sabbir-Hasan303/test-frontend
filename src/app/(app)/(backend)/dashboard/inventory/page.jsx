"use client"

import { useState } from "react"
import { Pencil, Search, Trash2 } from 'lucide-react'
import Link from "next/link"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

// Mock data - replace with API call
const dealers = [
  {
    id: "WH-001",
    name: "Central Fulfillment",
    location: "123 Commerce St, NY",
    manager: "John Doe",
    contactNumber: "+1 (555) 123-4567",
    stockAvailable: 6490,
    stockShipping: 3022,
    revenue: 25737,
  },
  {
    id: "WH-002",
    name: "East Coast Hub",
    location: "456 Market Ave, NY",
    manager: "Jane Smith",
    contactNumber: "+1 (555) 234-5678",
    stockAvailable: 7362,
    stockShipping: 4253,
    revenue: 67351,
  },
  {
    id: "WH-003",
    name: "West Coast Depot",
    location: "789 Trade Blvd, CA",
    manager: "Richard Roe",
    contactNumber: "+1 (555) 345-6789",
    stockAvailable: 8842,
    stockShipping: 3221,
    revenue: 45865,
  },
  {
    id: "WH-004",
    name: "Southern Distribution",
    location: "101 Supply Rd, TX",
    manager: "Alice Johnson",
    contactNumber: "+1 (555) 456-7890",
    stockAvailable: 5463,
    stockShipping: 2100,
    revenue: 54655,
  },
]

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeFilter, setTimeFilter] = useState("this-month")
  const [openDialog, setOpenDialog] = useState(false)

  const formSchema = z.object({
    dealerName: z.string().min(2, "Dealer name must be at least 2 characters."),
    location: z.string().min(2, "Location must be at least 2 characters."),
    managerName: z.string().min(2, "Manager name must be at least 2 characters."),
    managerEmail: z.string().email("Invalid email address."),
    contactNumber: z.string().min(10, "Contact number must be at least 10 characters."),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dealerName: "",
      location: "",
      managerName: "",
      managerEmail: "",
      contactNumber: "",
    },
  })

  // Handle form submission with error handling
  const onSubmit = async (values) => {
    try {
      // Here you would typically send the data to your backend
      console.log(values)
      setOpenDialog(false)
      // Reset form after successful submission
      form.reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      // You can add toast notification here for error
    }
  }

  const filteredDealers = dealers.filter(dealer =>
    dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.manager.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dealer List</h1>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>Add New Dealer</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Dealer</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="dealerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dealer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter dealer name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="managerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manager Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter manager name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="managerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manager Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter manager email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Create Dealer</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search dealers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Stock Available</TableHead>
              <TableHead className="text-right">Stock Shipping</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDealers.map((dealer) => (
              <TableRow key={dealer.id}>
                <TableCell>{dealer.id}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/inventory/dealer/${dealer.id}`} className="hover:underline">
                    {dealer.name}
                  </Link>
                </TableCell>
                <TableCell>{dealer.location}</TableCell>
                <TableCell>{dealer.manager}</TableCell>
                <TableCell>{dealer.contactNumber}</TableCell>
                <TableCell className="text-right">{dealer.stockAvailable}</TableCell>
                <TableCell className="text-right">{dealer.stockShipping}</TableCell>
                <TableCell className="text-right">${dealer.revenue.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
                      asChild
                    >
                      <Link href={`/dashboard/inventory/dealer/${dealer.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit dealer</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete dealer</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <Button variant="outline" size="sm">Previous</Button>
        <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
        <Button variant="outline" size="sm">2</Button>
        <Button variant="outline" size="sm">3</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  )
}

