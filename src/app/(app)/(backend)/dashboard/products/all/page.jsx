"use client"

import { ArrowUpDown, ChevronLeft, ChevronRight, Eye, Pencil, Star, Trash2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

// This would typically come from your API
const products = [
  {
    id: "PROD001",
    name: "Product 1",
    category: "Frozen Items",
    weight: "1kg",
    price: 100,
    quantity: 10,
    sales: 1000,
    rating: 4,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "PROD002",
    name: "Product 2",
    category: "Chicken Items",
    weight: "2kg",
    price: 200,
    quantity: 20,
    sales: 2000,
    rating: 3,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "PROD003",
    name: "Product 3",
    category: "Category 3",
    weight: "3kg",
    price: 300,
    quantity: 30,
    sales: 3000,
    rating: 5,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "PROD004",
    name: "Product 4",
    category: "Category 4",
    weight: "4kg",
    price: 400,
    quantity: 40,
    sales: 4000,
    rating: 4,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "PROD005",
    name: "Product 5",
    category: "Category 5",
    weight: "5kg",
    price: 500,
    quantity: 50,
    sales: 5000,
    rating: 3,
    image: "/placeholder.svg?height=50&width=50",
  },
]

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
      <span className="ml-1">{rating}</span>
    </div>
  )
}

function FilterOptions() {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="books">Books</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sort">Sort By</Label>
          <Select>
            <SelectTrigger id="sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button>Apply Filters</Button>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const [searchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedAndFilteredProducts = useMemo(() => {
    let sortableProducts = [...filteredProducts]
    if (sortConfig !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableProducts
  }, [filteredProducts, sortConfig])

  const totalPages = Math.ceil(sortedAndFilteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = sortedAndFilteredProducts.slice(startIndex, endIndex)

  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Product Lists</h1>
      </div>
      <FilterOptions />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('name')}>
                  PRODUCT NAME <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('id')}>
                  PRODUCT ID <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('category')}>
                  CATEGORY <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('weight')}>
                  WEIGHT <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('price')}>
                  PRICE <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('quantity')}>
                  QUANTITY <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('sales')}>
                  SALES <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('rating')}>
                  RATING <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                    <span>{product.name}</span>
                  </div>
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.weight}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.sales}</TableCell>
                <TableCell>
                  <RatingStars rating={product.rating} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800"
                      asChild
                    >
                      <Link href={`/dashboard/products/view/${product.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View product</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
                      asChild
                    >
                      <Link href={`/dashboard/products/edit/${product.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit product</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete product</span>
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
          className="h-8 w-8 p-0"
          onClick={() => setCurrentPage(currentPage - 1)}
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
          className="h-8 w-8 p-0"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
    </div>
  )
}

