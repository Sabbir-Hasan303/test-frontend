"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ArrowLeft } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} picture
 * @property {string} role
 * @property {string} email
 * @property {string} phone
 * @property {string|null} address
 * @property {string|null} nid
 * @property {string[]} permissions
 */

// Mock function to fetch user data
const fetchUserData = async () => {
  // This would be an API call in a real application
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    name: "Alice Jonson",
    picture: "/placeholder-user.jpg",
    role: "dealer",
    email: "example@gmail.com",
    phone: "+236257462357462",
    address: "42929 Velma Rapids, USA",
    nid: "236257462357462",
    permissions: ["Permission1", "Permission1", "Permission1", "Permission1"],
  }
}

export default function UserViewPage({ params }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUserData(params.id)
      .then(user => {
        setUser(user)
        setIsLoading(false)
      })
  }, [params.id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>User not found.</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/users">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Users</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">View User</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-[150px_1fr] gap-4">
          <div className="flex justify-center">
            <Image
              src={user.picture}
              alt={user.name}
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div className="space-y-1"> {/* Changed class from space-y-2 to space-y-1 */}
            <div className="flex justify-between">
              <span className="font-medium">Role:</span>
              <span>{user.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Phone:</span>
              <span>{user.phone}</span>
            </div>
            {user.nid && (
              <div className="flex justify-between">
                <span className="font-medium">NID:</span>
                <span>{user.nid}</span>
              </div>
            )}
          </div>
        </CardContent>
        {user.permissions && user.permissions.length > 0 && (
          <CardContent>
            <div className="space-y-2">
              <span className="font-medium">Permissions:</span>
              <div className="flex flex-wrap gap-2">
                {user.permissions.map((permission, index) => (
                  <Badge key={index} variant="secondary">
                    {permission}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

