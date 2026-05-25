"use client"

import {useState} from "react"
import {ShoppingCart, Star} from 'lucide-react'
import Image from "next/image"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import Link from "next/link"


const products = [{
    id: 1, slug: 'organic-moringa-powder', title: "Dal Puri", image: "/assets/Products/Dal_Puri.jpg", price: 54.85, originalPrice: 55.8, rating: 4.0, reviews: 2, category: "Hodo Foods", seller: "NestFood"
}, {
    id: 2, slug: 'organic-moringa-powder', title: "Chicken Popcorn", image: "/assets/Products/Chicken_Popcorn.jpg", price: 32.85, originalPrice: 33.8, rating: 4.0, reviews: 4, category: "Mixers", seller: "NestFood"
}, {
    id: 3, slug: 'organic-moringa-powder', title: "Chicken Momo", image: "/assets/Products/Chicken_Momo.jpg", price: 35.85, originalPrice: 37.8, rating: 4.0, reviews: 4, category: "Snack", seller: "NestFood", badge: {
        text: "Sale", variant: "sale"
    }
}, {
    id: 4, slug: 'organic-moringa-powder', title: "Chicken Wings", image: "/assets/Products/Chicken_Wings.jpg", price: 23.85, originalPrice: 25.8, rating: 4.0, reviews: 4, category: "Coffee", seller: "Old El Paso", badge: {
        text: "Hot", variant: "hot"
    }
}, {
    id: 5, slug: 'organic-moringa-powder', title: "Meat Ball", image: "/assets/Products/Meat_Ball.png", price: 22.85, originalPrice: 24.8, rating: 4.0, reviews: 2, category: "Cream", seller: "Tyson"
}]

function ProductCard({product}) {
    return (
        <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    {product.badge && (
                        <Badge className={cn("absolute top-3 left-3 z-10 px-3 py-1 text-[12px] font-medium", product.badge.variant === "hot" && "bg-[#F59758] text-white", product.badge.variant === "sale" && "bg-[#67BCEE] text-white")}>
                            {product.badge.text}
                        </Badge>)}

                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transform transition-transform duration-300 group-hover:scale-105"/>
                </div>
            </Link>
            <div className="p-4 space-y-2">
                <p className="text-xs text-gray-500">{product.category}</p>
                <Link href={`/products/${product.slug}`}>
                    <h3 className="font-medium text-sm md:text-lg line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] group-hover:text-green-600 transition-colors">
                        {product.title}
                    </h3>
                </Link>
                <div className="flex items-center gap-1">
                    <div className="flex">
                        {Array.from({length: 5}).map((_, i) => (
                            <Star key={i} className={cn("h-3 w-3 sm:h-4 sm:w-4", i < Math.floor(product.rating) ? "text-[#FDC040] fill-[#FDC040]" : "text-gray-200")}/>))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <span className="text-base sm:text-lg font-bold text-green-600">৳{product.price.toFixed(2)}</span>
                        <span className="text-xs sm:text-sm text-red-400 line-through">৳{product.originalPrice.toFixed(2)}</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-8 w-8 sm:h-10 sm:w-20 rounded-full bg-green-50 px-4 hover:bg-green-600 text-green-600 hover:text-white border-green-600">
                        <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5"/><span className="hidden sm:inline">Add</span>
                    </Button>
                </div>
            </div>
        </div>)
}

export function PerfectPairings() {
    const [activeIndex] = useState(0)
    const [productsPerView] = useState({
        xl: 5,  // Large screens
        lg: 4,  // Laptop
        md: 3,  // Tablet
        sm: 2   // Mobile
    })

    const totalSlides = Math.ceil(products.length / productsPerView.xl)
    return (
        <section className="py-12"
        style={{
            backgroundImage: `url('https://github.com/Sabbir-Hasan303/Sabbir-s-Blog/blob/main/images/VMAI%20Images/feature-category-bg.png?raw=true')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
            <div className="container">
                <div className="mb-8">
                    <h2 className="text-3xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                        <span className="text-green-600">Perfect Pairings:</span> Combo Offers You Can&apos;t Resist!
                    </h2>
                </div>

                <div className="relative overflow-hidden">
                    <div className="flex transition-transform duration-300 ease-out" style={{
                        transform: `translateX(-${activeIndex * 100}%)`
                    }}>
                        {Array.from({length: totalSlides}).map((_, slideIndex) => (
                            <div key={slideIndex} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-w-full">
                                {products
                                    .slice(slideIndex * productsPerView.xl, (slideIndex + 1) * productsPerView.xl)
                                    .map((product) => (
                                        <ProductCard key={product.id} product={product}/>))}
                            </div>))}
                    </div>
                </div>
            </div>
        </section>)
}

