"use client"

import { Download, Plus } from 'lucide-react'
import Image from "next/image"
import { useState } from "react"

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

// Mock data - replace with API call
const products = [
  {
    id: "a113",
    name: "G15 Gaming Laptop",
    image: "/placeholder.svg?height=40&width=40",
    category: "Finished Good",
    sku: "FG758949",
    available: 3521,
    totalSell: 6532,
    unitPrice: 56.99,
    addedDate: "12 April 2018",
  },
  {
    id: "a123",
    name: "Sony Alpha ILCE 6000Y",
    image: "/placeholder.svg?height=40&width=40",
    category: "Raw material",
    sku: "FH85T940",
    available: 4562,
    totalSell: 256,
    unitPrice: 167.99,
    addedDate: "10 April 2018",
  },
  {
    id: "a133",
    name: "Sony Wireless Headphone",
    image: "/placeholder.svg?height=40&width=40",
    category: "Finished Good",
    sku: "W748939",
    available: 125,
    totalSell: 4512,
    unitPrice: 747.99,
    addedDate: "25 December 2017",
  },
  {
    id: "a143",
    name: "Apple iPad Pro",
    image: "/placeholder.svg?height=40&width=40",
    category: "Raw Material",
    sku: "GFD7890",
    available: 4523,
    totalSell: 1241,
    unitPrice: 34.76,
    addedDate: "05 May 2018",
  },
  {
    id: "a153",
    name: "Adam ROMA USB-C",
    image: "/placeholder.svg?height=40&width=40",
    category: "Finished Good",
    sku: "K849035",
    available: 1475,
    totalSell: 2345,
    unitPrice: 345.45,
    addedDate: "31 March 2018",
  },
]

export default function DealerInventoryPage() {
  const [filters, setFilters] = useState({
    search: "",
    productId: "",
    category: "all",
  })

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase())
    const matchesId = filters.productId ? product.id.includes(filters.productId) : true
    const matchesCategory = filters.category === "all" || product.category === filters.category
    return matchesSearch && matchesId && matchesCategory
  })

  const handleClearFilters = () => {
    setFilters({
      search: "",
      productId: "",
      category: "all",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Inventory</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Low Stock Products
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-4">
          <div className="font-medium">Filter Products</div>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Search by name..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <div>
              <Input
                placeholder="Filter by Product Id"
                value={filters.productId}
                onChange={(e) => setFilters({ ...filters, productId: e.target.value })}
              />
            </div>
            <div>
              <Select
                value={filters.category}
                onValueChange={(value) => setFilters({ ...filters, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Finished Good">Finished Good</SelectItem>
                  <SelectItem value="Raw Material">Raw Material</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleClearFilters}
              >
                Clear
              </Button>
              <Button className="flex-1">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Available</TableHead>
                <TableHead className="text-right">Total Sell</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>#{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Added: {product.addedDate}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell className="text-right">{product.available}</TableCell>
                  <TableCell className="text-right">{product.totalSell}</TableCell>
                  <TableCell className="text-right">${product.unitPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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

