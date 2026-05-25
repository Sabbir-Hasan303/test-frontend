"use client"

import { ArrowLeft, ArrowUpDown, Eye, Search, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// This would typically come from your API
const fetchProductData = async (id) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    id: id,
    name: "Sample Product",
    category: "Sample Category",
    price: 100,
    sales: 1000,
    rating: 4,
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300&text=Image+2",
      "/placeholder.svg?height=300&width=300&text=Image+3",
      "/placeholder.svg?height=300&width=300&text=Image+4",
      "/placeholder.svg?height=300&width=300&text=Image+5",
    ],
    description: "This is a sample product description. It would typically contain detailed information about the product, its features, and its benefits.",
    variations: [
      { weight: "1kg", price: 100 },
      { weight: "2kg", price: 180 },
      { weight: "5kg", price: 400 },
    ],
  }
}

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

const dealerData = [
  {
    name: "Dealer A",
    location: "New York",
    variations: [
      { weight: "1kg", stock: 20, sold: 50 },
      { weight: "2kg", stock: 15, sold: 60 },
      { weight: "5kg", stock: 15, sold: 40 },
    ]
  },
  {
    name: "Dealer B",
    location: "Los Angeles",
    variations: [
      { weight: "1kg", stock: 10, sold: 30 },
      { weight: "2kg", stock: 10, sold: 40 },
      { weight: "5kg", stock: 10, sold: 30 },
    ]
  },
  {
    name: "Dealer C",
    location: "Chicago",
    variations: [
      { weight: "1kg", stock: 5, sold: 20 },
      { weight: "2kg", stock: 10, sold: 30 },
      { weight: "5kg", stock: 5, sold: 30 },
    ]
  },
]

export default function ProductDetailsPage({ params }) {
  const [product, setProduct] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState(null)
  const [expandedDealer, setExpandedDealer] = useState(null)

  useEffect(() => {
    fetchProductData(params.id).then(setProduct)
  }, [params.id])

  const sortedDealers = useMemo(() => {
    let sortableDealers = [...dealerData]
    if (sortConfig !== null) {
      sortableDealers.sort((a, b) => {
        if (sortConfig.key === 'name') {
          return sortConfig.direction === 'ascending'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        } else if (sortConfig.key === 'location') {
          return sortConfig.direction === 'ascending'
            ? a.location.localeCompare(b.location)
            : b.location.localeCompare(a.location)
        }
        const aTotal = a.variations.reduce((sum, v) => sum + v[sortConfig.key], 0)
        const bTotal = b.variations.reduce((sum, v) => sum + v[sortConfig.key], 0)
        return sortConfig.direction === 'ascending' ? aTotal - bTotal : bTotal - aTotal
      })
    }
    return sortableDealers
  }, [sortConfig])

  const filteredDealers = useMemo(() => {
    return sortedDealers.filter(dealer =>
      dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [sortedDealers, searchTerm])

  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/products/all">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to products</span>
            </Link>
          </Button>
          <h1 className="text-xl md:text-2xl font-semibold">Product Details</h1>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="w-full">
          <CardContent className="p-4 md:p-6 space-y-4">
            <div className="relative w-full aspect-square">
              <Image
                src={product.images[selectedImageIndex]}
                alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {product.images.map((image, index) => (
                <div key={index} className="flex-shrink-0">
                  <Image
                    src={image}
                    alt={`${product.name} - Thumbnail ${index + 1}`}
                    width={60}
                    height={60}
                    className={`rounded-lg object-cover cursor-pointer ${
                      index === selectedImageIndex ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.category}</CardDescription>
            <div className="mt-2 text-lg font-semibold">
              ${Math.min(...product.variations.map(v => v.price))} - ${Math.max(...product.variations.map(v => v.price))}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Variations:</h3>
              {product.variations.map((variation, index) => (
                <div key={index} className="flex justify-between items-center bg-muted p-2 rounded-md">
                  <span>{variation.weight}</span>
                  <span>${variation.price}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Total Sales:</span>
              <span>{product.sales}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Rating:</span>
              <RatingStars rating={product.rating} />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Product Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{product.description}</p>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/products/edit/${product.id}`}>
                Edit Product
              </Link>
            </Button>
            <Button variant="destructive">Delete Product</Button>
          </CardFooter>
        </Card>
      </div>
      <Card className="md:col-span-2 overflow-hidden">
        <CardHeader>
          <CardTitle>Dealer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="w-full sm:w-64">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search dealers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" onClick={() => requestSort('name')}>
                      Dealer Name <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => requestSort('location')}>
                      Location <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => requestSort('stock')}>
                      Total In Stock <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => requestSort('sold')}>
                      Total Sold <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Show Variation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDealers.map((dealer) => (
                  <React.Fragment key={dealer.name}>
                    <TableRow>
                      <TableCell>{dealer.name}</TableCell>
                      <TableCell>{dealer.location}</TableCell>
                      <TableCell>{dealer.variations.reduce((sum, v) => sum + v.stock, 0)}</TableCell>
                      <TableCell>{dealer.variations.reduce((sum, v) => sum + v.sold, 0)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setExpandedDealer(expandedDealer === dealer.name ? null : dealer.name)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">{expandedDealer === dealer.name ? 'Hide' : 'Show'} Variations</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedDealer === dealer.name && (
                      <TableRow>
                        <TableCell colSpan={4}>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Weight</TableHead>
                                <TableHead>In Stock</TableHead>
                                <TableHead>Sold</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {dealer.variations.map((variation) => (
                                <TableRow key={variation.weight}>
                                  <TableCell>{variation.weight}</TableCell>
                                  <TableCell>{variation.stock}</TableCell>
                                  <TableCell>{variation.sold}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

