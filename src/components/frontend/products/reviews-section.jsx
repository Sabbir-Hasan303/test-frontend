'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Send, ThumbsUp, MessageCircle, ImageIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

/**
 * @typedef {Object} Review
 * @property {string} id
 * @property {string} user
 * @property {number} rating
 * @property {string} date
 * @property {string} text
 * @property {string[]} [images]
 */

/**
 * @typedef {Object} Answer
 * @property {string} id
 * @property {string} user
 * @property {string} text
 * @property {string} date
 */

/**
 * @typedef {Object} Question
 * @property {string} id
 * @property {string} user
 * @property {string} question
 * @property {string} date
 * @property {Answer[]} answers
 */

/** @type {Review[]} */
const reviews = [
  {
    id: '1',
    user: 'Mariya Lytra',
    rating: 4,
    date: '2023-12-01',
    text: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',
    images: ['/assets/Products/Mini_Samussa.png', '/assets/Products/Meat_Ball.png', '/assets/Products/Daal_Puri.png']
  },
  {
    id: '2',
    user: 'Moris Willson',
    rating: 3,
    date: '2023-11-30',
    text: 'Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.'
  }
]

/** @type {Question[]} */
const questions = [
  {
    id: '1',
    user: 'John D.',
    question: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',
    date: '2023-12-01',
    answers: [
      {
        id: '1',
        user: 'Seller',
        text: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',
        date: '2023-12-02'
      }
    ]
  }
]

const ratingCounts = {
  5: 146,
  4: 29,
  3: 8,
  2: 7,
  1: 15
}

export function ReviewsSection() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isWritingReview, setIsWritingReview] = useState(false)
  const [newReviewRating, setNewReviewRating] = useState(0)
  const questionInputRef = useRef(null)
  const totalReviews = Object.values(ratingCounts).reduce((a, b) => a + b, 0)
  const averageRating = (Object.entries(ratingCounts).reduce((acc, [rating, count]) => acc + (Number(rating) * count), 0) / totalReviews).toFixed(1)

  const scrollToQuestionInput = () => {
    if (questionInputRef.current) {
      questionInputRef.current.scrollIntoView({ behavior: 'smooth' })
      questionInputRef.current.focus()
    }
  }

  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="detail" className="w-full">
          <div className="relative border-b mb-8">
            <ScrollArea className="w-full">
              <div className="flex pb-px">
                <TabsList className="h-10 items-center justify-start bg-transparent space-x-4">
                  <TabsTrigger
                    value="detail"
                    className="text-sm md:text-lg data-[state=active]:text-white data-[state=active]:bg-green-600 data-[state=active]:border-green-600 border-b-2 border-transparent px-4 rounded-md"
                  >
                    Detail
                  </TabsTrigger>
                  <TabsTrigger
                    value="specifications"
                    className="text-sm md:text-lg data-[state=active]:text-white data-[state=active]:bg-green-600 data-[state=active]:border-green-600 border-b-2 border-transparent px-4 rounded-md whitespace-nowrap"
                  >
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="text-sm md:text-lg data-[state=active]:text-white data-[state=active]:bg-green-600 data-[state=active]:border-green-600 border-b-2 border-transparent px-4 rounded-md"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          <TabsContent value="reviews" className="focus-visible:outline-none">
            <div className="grid md:grid-cols-12 gap-6">
              {/* Overall Rating Card */}
              <motion.div
                className="md:col-span-4 w-full bg-white p-4 rounded-xl shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{averageRating}</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(Number(averageRating))
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {totalReviews} verified ratings
                  </div>
                </div>

                {/* Rating Bars */}
                <div className="space-y-2 mt-6">
                  {Object.entries(ratingCounts)
                    .sort(([a], [b]) => Number(b) - Number(a))
                    .map(([rating, count]) => (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="flex items-center gap-1 w-8">
                          <span className="text-xs font-medium">{rating}</span>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        </div>
                        <Progress
                          value={(count / totalReviews) * 100}
                          className="h-1.5 flex-1"
                        />
                        <div className="w-8 text-xs text-gray-500 text-right">
                          {count}
                        </div>
                      </div>
                    ))}
                </div>

                <Button
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-sm"
                  onClick={() => setIsWritingReview(!isWritingReview)}
                >
                  {isWritingReview ? 'Cancel Review' : 'Write a Review'}
                </Button>
              </motion.div>

              {/* Reviews List */}
              <div className="md:col-span-8 w-full">
                {/* Write Review Section */}
                <AnimatePresence>
                  {isWritingReview && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white p-4 rounded-xl shadow-sm mb-6 overflow-hidden"
                    >
                      <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
                      <div className="flex items-center mb-4">
                        <span className="text-sm mr-2">Your Rating:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 cursor-pointer ${
                              star <= newReviewRating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-200'
                            }`}
                            onClick={() => setNewReviewRating(star)}
                          />
                        ))}
                      </div>
                      <Textarea
                        placeholder="Write your review here..."
                        className="mb-4 min-h-[120px] text-sm"
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-600">Add images (optional)</span>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700 text-sm">
                          Submit Review
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-4 w-full">
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-4 rounded-xl shadow-sm w-full overflow-hidden"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-base text-gray-900">{review.user}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(review.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-600">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          <span className="text-xs">Helpful</span>
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">{review.text}</p>
                      {review.images && (
                        <ScrollArea className="w-full whitespace-nowrap rounded-lg mb-4">
                          <div className="flex gap-2 pb-4">
                            {review.images.map((image, index) => (
                              <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedImage(image)}
                                className="relative w-16 h-16 rounded-lg overflow-hidden ring-1 ring-gray-200 hover:ring-green-500 transition-all flex-shrink-0"
                              >
                                <Image
                                  src={image}
                                  alt={`Review image ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </motion.button>
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      )}
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="hover:text-green-600">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          <span className="text-xs">Reply</span>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                <ScrollArea className="w-full mt-6">
                  <div className="flex items-center justify-start gap-1 pb-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 hover:bg-green-50 hover:text-green-600"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {[1, 2, 3, 4, '...', 41].map((page, i) => (
                      <Button
                        key={i}
                        variant={page === 1 ? 'default' : 'outline'}
                        className={`h-8 w-8 ${page === 1 ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-50 hover:text-green-600'}`}
                      >
                        <span className="text-xs">{page}</span>
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 hover:bg-green-50 hover:text-green-600"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>

            {/* Questions & Answers */}
            <div className="mt-8 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Questions & Answers</h2>
                  <div className="text-gray-500">
                    <span className="font-semibold text-green-600">175</span> Questions{' '}
                    <span className="font-semibold text-green-600">724</span> Answers
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700" onClick={scrollToQuestionInput}>
                  Ask a New Question
                </Button>
              </div>

              <div className="space-y-6">
                {questions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 font-bold shrink-0">
                        Q
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">{question.user}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(question.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{question.question}</p>
                      </div>
                    </div>

                    {question.answers.map((answer, index) => (
                      <motion.div
                        key={answer.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="ml-14 mt-4 pt-4 border-t"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 font-bold shrink-0">
                            A
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-gray-900">{answer.user}</span>
                              <span className="text-sm text-gray-500">
                                {new Date(answer.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{answer.text}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* Ask Question Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 bg-white p-6 rounded-2xl shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Add images to your question (optional)</span>
                </div>
                <Textarea
                  ref={questionInputRef}
                  placeholder="Enter your question(s) here..."
                  className="mb-4 min-h-[120px]"
                />
                <Button className="bg-green-600 hover:bg-green-700">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Question
                </Button>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="detail" className="focus-visible:outline-none">
            <div className="prose max-w-none">
              <h2 className="text-xl font-bold mb-4">Product Details</h2>
              <p className="text-sm text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.<br /><br />

                Any Product types that You want - Simple, Configurable<br />
                Downloadable/Digital Products, Virtual Products<br />
                Inventory Management with Backordered items<br />
                Flatlock seams throughout.<br /><br />

            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="focus-visible:outline-none">
            <div className="prose max-w-none">
              <h2 className="text-xl font-bold mb-4">Product Specifications</h2>
              <div className="text-sm text-gray-600">

                <p className="font-Poppins text-[#777] text-[14px] font-normal leading-[28px] mb-[16px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
                <ul className="pl-[24px]">
                    <li className="list-disc mb-[4px] text-[15px] text-[#777] tracking-[0.02rem] leading-[1.6] max-[575px]:mb-[10px]"><span className="mr-[25px] min-w-[150px] text-[15px] text-[#4b5966] inline-block font-medium tracking-[0.02rem] max-[575px]:w-full">Model</span> SKU140</li>
                    <li className="list-disc mb-[4px] text-[15px] text-[#777] tracking-[0.02rem] leading-[1.6] max-[575px]:mb-[10px]"><span className="mr-[25px] min-w-[150px] text-[15px] text-[#4b5966] inline-block font-medium tracking-[0.02rem] max-[575px]:w-full">Weight</span> 500 g</li>
                    <li className="list-disc mb-[4px] text-[15px] text-[#777] tracking-[0.02rem] leading-[1.6] max-[575px]:mb-[10px]"><span className="mr-[25px] min-w-[150px] text-[15px] text-[#4b5966] inline-block font-medium tracking-[0.02rem] max-[575px]:w-full">Dimensions</span> 35 × 30 × 7 cm</li>
                    <li className="list-disc mb-[4px] text-[15px] text-[#777] tracking-[0.02rem] leading-[1.6] max-[575px]:mb-[10px]"><span className="mr-[25px] min-w-[150px] text-[15px] text-[#4b5966] inline-block font-medium tracking-[0.02rem] max-[575px]:w-full">Color</span> Black, Pink, Red, White</li>
                    <li className="list-disc mb-[4px] text-[15px] text-[#777] tracking-[0.02rem] leading-[1.6] max-[575px]:mb-[10px]"><span className="mr-[25px] min-w-[150px] text-[15px] text-[#4b5966] inline-block font-medium tracking-[0.02rem] max-[575px]:w-full">Size</span> 10 X 20</li>
                </ul>

              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Image Preview Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-3xl w-full aspect-square"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage}
                  alt="Review image preview"
                  fill
                //   className="object-contain"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

