"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, Star } from 'lucide-react'
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data structure for reviews and customers
const fetchCustomerData = async () => {
  // This would be an API call in a real application
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    name: "Alice Jonson",
    picture: "/placeholder.svg?height=100&width=100",
    email: "example@gmail.com",
    phone: "+782354557823",
    address: "1485 NW Street St Wilson WY 83014 (Default)",
    reviews: [
      {
        productName: "Product Name",
        date: "Oct 19, 2024",
        rating: 5,
        review: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      // Add more reviews as needed
    ],
    orderHistory: [], // Replace with actual order history data
  };
}

export default function CustomerViewPage({ params }) {
  const [customer, setCustomer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCustomerData(params.id)
      .then(customer => {
        setCustomer(customer)
        setIsLoading(false)
      })
  }, [params.id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!customer) {
    return <div>Customer not found.</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/customers">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Customers</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Customer Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Image
                src={customer.picture}
                alt={customer.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <CardTitle className="text-lg">{customer.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="font-medium text-base">Contact Info</h2>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-gray-700">Email:</span> {customer.email}
              </div>
              <div>
                <span className="font-medium text-gray-700">Phone:</span> {customer.phone}
              </div>
              <div>
                <span className="font-medium text-gray-700">Address:</span> {customer.address}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <Tabs defaultValue="reviews" className="p-4">
            <TabsList>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="order-history">Order History</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews">
              {customer.reviews.map((review, index) => (
                <div key={index} className="border-b py-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{review.productName}</p>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{review.review}</p>
                  <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="order-history">
              {/* Display order history here */}
              <p>No order history found.</p>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

