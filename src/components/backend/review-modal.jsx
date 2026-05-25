"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Star } from 'lucide-react'

// ReviewModal component implementation
export function ReviewModal({ review, onClose }) {
  // Check if review is null and return null if so
  if (!review) {
    return null
  }

  return (
    <Dialog open={!!review} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <Image src={review.reviewerImage} width={40} height={40} alt="Reviewer" className="rounded-full" />
            <div>
              <div className="font-medium">{review.reviewerName}</div>
              <div className="text-sm text-muted-foreground">{review.date}</div>
            </div>
            <div className="ml-auto flex gap-1">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{review.review}</p>
        </div>
        <div className="mt-6 flex gap-2 justify-end">
          <Button variant="destructive" onClick={() => {
            // Handle reject logic here
            onClose()
          }}>Reject</Button>
          <Button onClick={() => {
            // Handle approve logic here
            onClose()
          }}>Approve</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

