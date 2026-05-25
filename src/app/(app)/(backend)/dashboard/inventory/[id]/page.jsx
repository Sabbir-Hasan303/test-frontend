"use client"

import { Switch } from "@/components/ui/switch"
import { ArrowLeft, ArrowUpDown, Download, Plus, Search } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

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
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"
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
import { useForm } from "react-hook-form"

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

// Mock function to fetch warehouse data
// const fetchWarehouseData = async (id) => {
//   // This would be an API call in a real application
//   return {
//     id,
//     name: "Central Fulfillment",
//     location: "123 Commerce St, NY",
//     manager: "John Doe",
//   }
// }

export default function WarehouseInventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategory] = useState("all")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null })
  const [currentPage, setCurrentPage] = useState(1)
  const [activeStatus, setActiveStatus] = useState({})
  const itemsPerPage = 5

  const toggleActiveStatus = (productId) => {
    setActiveStatus(prev => ({ ...prev, [productId]: !prev[productId] }))
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortConfig) return 0
    const direction = sortConfig.direction === 'ascending' ? 1 : -1
    return a[sortConfig.key] > b[sortConfig.key] ? direction : -direction
  })

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const [openDialog, setOpenDialog] = useState(false)
  const form = useForm({
    defaultValues: {
      product: "",
      variation: "",
      quantity: 0,
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    setOpenDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/inventory">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to warehouses</span>
          </Link>
        </Button>
        <h1 className="text-xl md:text-2xl font-semibold">Dealer Inventory</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={categoryFilter} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Finished Good">Finished Good</SelectItem>
                  <SelectItem value="Raw Material">Raw Material</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Export Low Stock
                </Button>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Inventory</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="product"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select product" />
                                </SelectTrigger>
                                <SelectContent>
                                  {products.map((product) => (
                                    <SelectItem key={product.id} value={product.id}>
                                      {product.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="variation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Variation</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select variation" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1kg">1kg</SelectItem>
                                  <SelectItem value="2kg">2kg</SelectItem>
                                  <SelectItem value="5kg">5kg</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <Input type="number" {...field} />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Update Inventory</Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>
                    <Button variant="ghost" className="hover:bg-transparent" onClick={() => requestSort('category')}>
                      Category
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" className="hover:bg-transparent" onClick={() => requestSort('available')}>
                      Available
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" className="hover:bg-transparent" onClick={() => requestSort('totalSell')}>
                      Total Sell
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead>Added Date</TableHead>
                  <TableHead className="text-center">Status</TableHead>
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
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell className="text-right">{product.available}</TableCell>
                    <TableCell className="text-right">{product.totalSell}</TableCell>
                    <TableCell className="text-right">${product.unitPrice}</TableCell>
                    <TableCell>{product.addedDate}</TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={activeStatus[product.id] || false}
                        onCheckedChange={() => toggleActiveStatus(product.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

