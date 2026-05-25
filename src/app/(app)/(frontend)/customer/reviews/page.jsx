"use client"

import { useState } from 'react'
import { CustomerLayout } from "@/components/frontend/customer/customer-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ThumbsUp } from 'lucide-react'
import Image from "next/image"
import Link from 'next/link'

const reviews = [
  {
    id: '1',
    slug: 'organic-moringa-powder',
    productName: 'Organic Avocado',
    productImage: '/assets/Products/Chicken_Wings.jpg',
    rating: 5,
    comment: 'Excellent quality and taste! These avocados were perfectly ripe and had a creamy texture. Will definitely buy again.',
    date: '2023-05-05',
    helpfulVotes: 12
  },
  {
    id: '2',
    slug: 'organic-moringa-powder',
    productName: 'Fresh Strawberries',
    productImage: '/assets/Products/Chicken_Momo.jpg',
    rating: 4,
    comment: 'Very fresh and sweet. The strawberries were juicy and had a great flavor. Just a few were slightly overripe, hence the 4-star rating.',
    date: '2023-05-20',
    helpfulVotes: 8
  },
  {
    id: '3',
    slug: 'organic-moringa-powder',
    productName: 'Organic Chicken',
    productImage: '/assets/Products/Daal_Puri.png',
    rating: 5,
    comment: 'Delicious and tender. This organic chicken was of superior quality. It cooked evenly and remained juicy. Highly recommend!',
    date: '2023-05-25',
    helpfulVotes: 15
  },
]

export default function ReviewsPage() {
  const [expandedReview, setExpandedReview] = useState(null)

  return (
    <CustomerLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6 text-[#253D4E]">My Reviews</h1>
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Link href={`/products/${review.slug}`}>
                        <div className="relative w-16 h-16 rounded-md overflow-hidden">
                        <Image
                            src={review.productImage}
                            alt={review.productName}
                            layout="fill"
                            objectFit="cover"
                        />
                        </div>
                    </Link>
                    <div>
                      <Link href={`/products/${review.slug}`}>
                        <CardTitle className="text-lg font-semibold hover:text-green-600">{review.productName}</CardTitle>
                      </Link>
                      <p className="text-sm text-gray-500">Reviewed on: {review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className={`text-gray-700 ${
                  expandedReview === review.id ? '' : 'line-clamp-3'
                }`}>
                  {review.comment}
                </p>
                {review.comment.length > 150 && (
                  <Button
                    variant="link"
                    onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                    className="mt-2 p-0 h-auto font-semibold text-[#3BB77E]"
                  >
                    {expandedReview === review.id ? 'Show less' : 'Read more'}
                  </Button>
                )}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">{review.helpfulVotes} found this helpful</span>
                  </div>
                  {/* <Button variant="outline" size="sm" className="text-[#3BB77E] border-[#3BB77E]">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Review
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CustomerLayout>
  )
}
