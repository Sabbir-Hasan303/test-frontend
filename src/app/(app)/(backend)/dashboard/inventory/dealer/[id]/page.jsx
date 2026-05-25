"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock function to fetch dealer data
const fetchDealerData = async (id) => {
  // This would be an API call in a real application
  return {
    id,
    name: "Central Fulfillment",
    location: "123 Commerce St, NY",
    manager: "John Doe",
    contactNumber: "+1 (555) 123-4567",
    stockAvailable: 6490,
    stockShipping: 3022,
    revenue: 25737,
  }
}

export default function DealerViewPage({ params }) {
  const [dealer, setDealer] = useState(null)

  useEffect(() => {
    const loadDealerData = async () => {
      const data = await fetchDealerData(params.id)
      setDealer(data)
    }
    loadDealerData()
  }, [params.id])

  if (!dealer) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/inventory">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to dealer list</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Dealer Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{dealer.name}</CardTitle>
            <CardDescription>{dealer.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-bold">${dealer.revenue.toLocaleString()}</p>
              </div>
              <Badge variant={dealer.revenue > 50000 ? "success" : "default"}>
                {dealer.revenue > 50000 ? "High Performer" : "Standard"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dealer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Manager:</span>
              <span>{dealer.manager}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Contact Number:</span>
              <span>{dealer.contactNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Stock Available:</span>
              <span>{dealer.stockAvailable}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Stock Shipping:</span>
              <span>{dealer.stockShipping}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Edit Dealer Information</Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No recent activity to display.</p>
        </CardContent>
      </Card>
    </div>
  )
}

