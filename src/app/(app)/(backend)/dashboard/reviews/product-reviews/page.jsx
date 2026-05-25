"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Trash2, Check, X } from 'lucide-react'
import { ReviewModal } from '@/components/backend/review-modal'

/**
 * @typedef {Object} Review
 * @property {string} productName
 * @property {string} productId
 * @property {string} category
 * @property {string} reviewerName
 * @property {string} date
 * @property {string} review
 * @property {number} rating
 * @property {'Pending'|'Approved'|'Rejected'} approvalStatus
 * @property {string} reviewerImage
 */

const reviews = [
  {
    productName: "Chicken Nuggets",
    productId: "#345234",
    category: "Frozen Item",
    reviewerName: "Alice Jonson",
    date: "Oct 17, 2024, 05:45pm",
    review: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    rating: 5,
    approvalStatus: "Pending",
    reviewerImage: "/placeholder-user.jpg",
  },
  {
    productName: "Chicken Nuggets",
    productId: "#345234",
    category: "Frozen Item",
    reviewerName: "Alice Jonson",
    date: "Oct 17, 2024, 05:45pm",
    review: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    rating: 5,
    approvalStatus: "Approved",
    reviewerImage: "/placeholder-user.jpg",
  },
  // Add more mock reviews as needed
]

export default function ProductReviewsPage() {
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [productFilter, setProductFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReview, setSelectedReview] = useState(null)

  const filteredReviews = reviews
    .filter((review) => {
      const categoryMatch = categoryFilter === "all" || review.category === categoryFilter
      const productMatch = productFilter === "all" || review.productId === productFilter
      const ratingMatch = ratingFilter === "all" || review.rating.toString() === ratingFilter
      const searchMatch =
        review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.review.toLowerCase().includes(searchQuery.toLowerCase())

      return categoryMatch && productMatch && ratingMatch && searchMatch
    })


  const handleApprove = (index) => {
    console.log(`Approving review at index ${index}`)
  }

  const handleReject = (index) => {
    console.log(`Rejecting review at index ${index}`)
  }

  const handleView = (review) => {
    setSelectedReview(review)
  }

  const handleDelete = (index) => {
    console.log(`Deleting review at index ${index}`)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">New Reviews</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {/* Add more category options as needed */}
            <SelectItem value="Frozen Item">Frozen Item</SelectItem>
          </SelectContent>
        </Select>
        <Select value={productFilter} onValueChange={setProductFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            {/* Add more product options as needed */}
            <SelectItem value="#345234">Chicken Nuggets</SelectItem>
          </SelectContent>
        </Select>
        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            {/* Add more rating options as needed */}
            <SelectItem value="5">5.0*</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Product ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Reviewer Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>A. Status</TableHead>
              <TableHead>Manage</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review, index) => (
              <TableRow key={index}>
                <TableCell>{review.productName}</TableCell>
                <TableCell>{review.productId}</TableCell>
                <TableCell>{review.category}</TableCell>
                <TableCell>{review.reviewerName}</TableCell>
                <TableCell>{review.date}</TableCell>
                <TableCell>
                  {review.review.length > 50 ? `${review.review.substring(0, 50)}...` : review.review}
                </TableCell>
                <TableCell>{review.rating}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      review.approvalStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : review.approvalStatus === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {review.approvalStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleApprove(index)}>
                      <Check className="w-4 h-4 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleReject(index)}>
                      <X className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleView(review)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
    </div>
  )
}

