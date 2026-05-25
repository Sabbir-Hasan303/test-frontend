"use client"

import {Minus, Plus, Star} from 'lucide-react'
import Image from "next/image"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogTitle} from "@/components/ui/dialog"
import {cn} from "@/lib/utils"
import Link from 'next/link'

/**
 * @typedef {Object} QuickViewModalProps
 * @property {boolean} isOpen
 * @property {() => void} onClose
 * @property {{
 *   title: string,
 *   image: string,
 *   price: number,
 *   originalPrice: number,
 *   rating: number,
 *   reviews: number
 * }} product
 */

/** @param {QuickViewModalProps} props */
export function QuickViewModal({isOpen, onClose, product}) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState("250g")

    const images = [
        product.image,
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400"
    ]

    const sizes = [
        {value: "250g", label: "250g"},
        {value: "500g", label: "500g"},
        {value: "1kg", label: "1kg"},
        {value: "2kg", label: "2kg"}
    ]

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[900px] p-0 max-h-[90vh] overflow-y-auto">
                <DialogTitle className="sr-only">Product Quick View</DialogTitle>
                <DialogDescription className="sr-only"> Detailed view of the product with images, description, and purchase options. </DialogDescription> {/* <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button> */}
                <div className="grid md:grid-cols-2 gap-6 p-4 md:p-6">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="relative aspect-square">
                            <Image src={images[selectedImage]} alt={product.title} fill className="object-contain"/>
                        </div>
                        <div className="flex gap-4">
                            {images.map((image, index) => (
                                <button key={index} className={cn(
                                    "relative w-20 h-20 border rounded-lg overflow-hidden",
                                    selectedImage === index && "border-[#3BB77E]"
                                )} onClick={() => setSelectedImage(index)}>
                                    <Image src={image} alt={`Product view ${index + 1}`} fill className="object-contain p-2"/>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4 md:space-y-6 overflow-y-auto">
                        <div>
                            <Link href={`/products/${product.slug}`}>
                                <h2 className="text-2xl font-semibold text-gray-800 hover:text-green-600 mb-2">
                                    {product.title}
                                </h2>
                            </Link>
                            <div className="flex items-center gap-1">
                                <div className="flex">
                                    {Array.from({length: 5}).map((_, i) => (
                                        <Star key={i} className={cn(
                                            "h-4 w-4",
                                            i < Math.floor(product.rating)
                                            ? "text-[#FDC040] fill-[#FDC040]"
                                            : "text-gray-200"
                                        )}/>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                    ({product.reviews} reviews)
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-gray-600">
                                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1900s. </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-green-600">
                            ৳{product.price.toFixed(2)}
                            </span>
                                            <span className="text-lg text-red-500 line-through">
                                            ৳{product.originalPrice.toFixed(2)}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {sizes.map((size) => (
                                    <Button key={size.value} variant="outline" className={cn(
                                        "px-4 py-2 border rounded-md",
                                        selectedSize === size.value
                                        ? "border-[#3BB77E] text-[#3BB77E] bg-[#DEF9EC]"
                                        : "border-gray-200"
                                    )} onClick={() => setSelectedSize(size.value)}>
                                        {size.label}
                                    </Button>
                                ))}
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center border rounded-md">
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                                        <Minus className="h-4 w-4"/>
                                    </Button>
                                    <div className="w-12 text-center">{quantity}</div>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={() => setQuantity(quantity + 1)}>
                                        <Plus className="h-4 w-4"/>
                                    </Button>
                                </div>
                                <Button className="bg-[#3BB77E] hover:bg-[#3BB77E]/90 text-white px-8"> Add To Cart </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

