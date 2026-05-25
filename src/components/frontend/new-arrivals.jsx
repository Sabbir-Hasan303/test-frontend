"use client"

import { useState, useEffect } from "react"
import { Star, Heart, Eye, ShoppingCart } from 'lucide-react'
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QuickViewModal } from "./quick-view-modal"
import Link from "next/link"


const products = [
  {
    id: 1,
    slug: 'organic-moringa-powder',
    title: "Chicken Strips",
    image: "/assets/Products/Chicken_Strips.jpg",
    price: 4.99,
    originalPrice: 6.99,
    rating: 4.5,
    reviews: 100,
    category: "Fruits",
    badge: {
      text: "NEW",
      variant: "new"
    }
  },
  {
    id: 2,
    slug: 'organic-moringa-powder',
    title: "Paratha",
    image: "/assets/Products/Paratha.png",
    price: 3.99,
    originalPrice: 5.99,
    rating: 4.0,
    reviews: 80,
    category: "Fruits",
    badge: {
      text: "SALE",
      variant: "sale"
    }
  },
  {
    id: 3,
    slug: 'organic-moringa-powder',
    title: "Daal Puri",
    image: "/assets/Products/Daal_Puri.png",
    price: 9.99,
    originalPrice: 12.99,
    rating: 4.8,
    reviews: 120,
    category: "Meat",
    badge: {
      text: "NEW",
      variant: "new"
    }
  },
  {
    id: 4,
    slug: 'organic-moringa-powder',
    title: "Chicken Lollypop",
    image: "/assets/Products/Chicken_Lollypop.jpg",
    price: 14.99,
    originalPrice: 18.99,
    rating: 4.6,
    reviews: 90,
    category: "Seafood"
  },
  {
    id: 5,
    slug: 'organic-moringa-powder',
    title: "Chicken Meat Ball",
    image: "/assets/Products/Meat_Ball.png",
    price: 2.99,
    originalPrice: 3.99,
    rating: 4.2,
    reviews: 70,
    category: "Vegetables",
    badge: {
      text: "SALE",
      variant: "sale"
    }
  },
  {
    id: 6,
    slug: 'organic-moringa-powder',
    title: "Chicken Nuggets",
    image: "/assets/Products/Chicken_Nuggets.jpg",
    price: 3.49,
    originalPrice: 4.49,
    rating: 4.7,
    reviews: 85,
    category: "Bakery"
  }
]

const categories = ["ALL", "FRUITS", "VEGETABLES", "MEAT", "SEAFOOD", "BAKERY"]

function ProductCard({ product }) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="group bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        {product.badge && (
          <Badge
            className={cn(
              "absolute top-3 left-3 z-10 px-3 py-1 text-xs font-semibold",
              product.badge.variant === "sale" && "bg-red-500 text-white",
              product.badge.variant === "new" && "bg-green-500 text-white"
            )}
          >
            {product.badge.text}
          </Badge>
        )}
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full bg-white shadow-md"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-600")} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full bg-white shadow-md"
              onClick={() => setIsQuickViewOpen(true)}
            >
              <Eye className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <Link href={`/products/${product.slug}`}>
            <h3 className="font-semibold text-gray-800 hover:text-green-600 mb-1 text-lg line-clamp-1">{product.title}</h3>
        </Link>
        <div className="flex items-center mb-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex xl:flex-col flex-row items-center gap-1">
            <div className="text-lg font-bold text-green-600">৳{product.price.toFixed(2)}</div>
            <div className="text-sm text-red-500 line-through">৳{product.originalPrice.toFixed(2)}</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-green-50 hover:bg-green-500 text-green-600 hover:text-white border-green-200 rounded-full px-2 text-sm font-medium transition-colors duration-300"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Add</span>
          </Button>
        </div>
      </div>
      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={product}
      />
    </div>
  )
}

export function NewArrivals() {
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [visibleProducts, setVisibleProducts] = useState(6)

  const filteredProducts = products.filter(product =>
    activeCategory === "ALL" ||
    product.category.toUpperCase() === activeCategory
  )

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleProducts(6) // XL screens: 6 products
      } else if (window.innerWidth >= 1024) {
        setVisibleProducts(4) // LG screens: 4 products
      } else if (window.innerWidth >= 768) {
        setVisibleProducts(3) // MD screens: 3 products
      } else {
        setVisibleProducts(2) // SM screens: 2 products
      }
    }

    handleResize() // Initial call
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <h2 className="text-3xl font-bold mb-2">
              New <span className="text-green-600">Arrivals</span>
            </h2>
            <p className="text-gray-600">
              Discover our latest products and enjoy free shipping on all orders!
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={cn(
                  "text-sm font-medium rounded-full",
                  activeCategory === category
                    ? "bg-green-500 text-white"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                )}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredProducts.slice(0, visibleProducts).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length > visibleProducts && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="bg-white hover:bg-green-500 text-green-600 hover:text-white border-green-200 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300"
              onClick={() => setVisibleProducts(prev => prev + 6)}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

