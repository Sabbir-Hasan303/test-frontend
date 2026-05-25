"use client"

import * as React from "react"
import { Plus, X } from 'lucide-react'
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function ImageUpload({ maxImages = 5, className, ...props }) {
  const [images, setImages] = React.useState([])
  const fileInputRef = React.useRef(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(prev => [...prev, ...newImages].slice(0, maxImages))
    }
  }

  const deleteImage = (indexToDelete) => {
    setImages(prev => prev.filter((_, index) => index !== indexToDelete))
  }

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative w-24 h-24 group">
            <Image
              src={image}
              alt={`Product image ${index + 1}`}
              className="rounded-lg object-cover"
              fill
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-0 right-0 -mt-2 -mr-2 hidden group-hover:flex"
              onClick={() => deleteImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {images.length < maxImages && (
          <div className="flex items-center gap-4">
            {images.length > 0 && (
              <div className="relative w-24 h-24">
                <Image
                  src={images[images.length - 1]}
                  alt="Last uploaded image"
                  className="rounded-lg object-cover"
                  fill
                />
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              className="w-24 h-24 flex flex-col items-center justify-center gap-1 border-dashed"
              onClick={handleClick}
            >
              <Plus className="h-8 w-8" />
              <span className="text-xs">Add Images</span>
            </Button>
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground">up to {maxImages} images</p>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
    </div>
  )
}

