"use client"

import { useState } from "react"
import { Pencil, Search, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

/**
 * @typedef {Object} Subscriber
 * @property {string} id
 * @property {string} serialNo
 * @property {string} name
 * @property {string} email
 */

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
})

// Mock data - replace with API call
const subscribers = Array.from({ length: 68 }, (_, i) => ({
  id: `sub_${i + 1}`,
  serialNo: String(i + 1).padStart(2, '0'),
  name: `Subscriber ${i + 1}`,
  email: `subscriber${i + 1}@example.com`,
}))

export default function NewsletterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [editingSubscriber, setEditingSubscriber] = useState(null)
  const itemsPerPage = 10

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subscriber.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSubscribers = filteredSubscribers.slice(startIndex, endIndex)

  const handleEdit = (subscriber) => {
    setEditingSubscriber(subscriber)
    form.reset({
      name: subscriber.name,
      email: subscriber.email,
    })
  }

  const onSubmit = (values) => {
    // Here you would typically update the subscriber in your backend
    console.log(values)
    setEditingSubscriber(null)
  }

  const handleDelete = (subscriberId) => {
    // Here you would typically delete the subscriber from your backend
    console.log("Deleting subscriber:", subscriberId)
  }

  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Previous button
    buttons.push(
      <Button
        key="prev"
        variant="outline"
        size="icon"
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
    )

    // First page
    if (startPage > 1) {
      buttons.push(
        <Button
          key={1}
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(1)}
        >
          1
        </Button>
      )
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1">...</span>)
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="icon"
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Button>
      )
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2">...</span>)
      }
      buttons.push(
        <Button
          key={totalPages}
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Button>
      )
    }

    // Next button
    buttons.push(
      <Button
        key="next"
        variant="outline"
        size="icon"
        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    )

    return buttons
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Newsletter Subscription</h1>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subscribers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SL</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentSubscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell>{subscriber.serialNo}</TableCell>
                <TableCell>{subscriber.name}</TableCell>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
                      onClick={() => handleEdit(subscriber)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit subscriber</span>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <div
                          className="h-8 w-8 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 flex items-center justify-center rounded-md cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete subscriber</span>
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Subscriber</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this subscriber? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(subscriber.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center space-x-2">
        {renderPaginationButtons()}
      </div>

      <Dialog open={!!editingSubscriber} onOpenChange={(open) => !open && setEditingSubscriber(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subscriber</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

