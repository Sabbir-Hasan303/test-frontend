"use client"

import { useState } from "react"
import { Eye, Pencil, Search, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
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

// Sample data structure for blogs
const blogs = [
  {
    id: "1",
    title: "Chicken Nuggets",
    author: "Author",
    category: "Frozen Item",
    tags: ["Chicken", "Frozen", "Fast Food", "Snacks"],
    postedAt: "30/09/2024 05:45pm",
    visited: 15,
    status: "Published",
  },
  {
    id: "2",
    title: "Chicken Nuggets",
    author: "Author",
    category: "Frozen Item",
    tags: ["Chicken", "Frozen", "Fast Food", "Snacks"],
    postedAt: "30/09/2024 05:45pm",
    visited: 15,
    status: "Draft",
  },
  // Add more mock data as needed
]

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredBlogs = blogs.filter(blog =>
    (blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (categoryFilter === "all" || blog.category === categoryFilter)
  )

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex)

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">All Blogs</h1>
        <Button asChild>
          <Link href="/dashboard/content/blogs/new">Add New Blog</Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Frozen Item">Frozen Item</SelectItem>
            <SelectItem value="Fresh Item">Fresh Item</SelectItem>
            <SelectItem value="Packaged Item">Packaged Item</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search blogs..."
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
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Posted At</TableHead>
              <TableHead>Visited</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.category}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{blog.postedAt}</TableCell>
                <TableCell>{blog.visited}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(blog.status)}>
                    {blog.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800"
                      asChild
                    >
                      <Link href={`/dashboard/content/blogs/view/${blog.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View blog</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
                      asChild
                    >
                      <Link href={`/dashboard/content/blogs/edit/${blog.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit blog</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete blog</span>
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

