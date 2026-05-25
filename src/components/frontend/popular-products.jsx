"use client"

import { ChevronLeft, ChevronRight, Star, Heart, Eye, ShoppingCart } from 'lucide-react'
import Image from "next/image"
import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QuickViewModal } from "@/components/frontend/quick-view-modal"
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'

/**

 * @property {{text: string, variant: 'hot'|'sale'|'new'|'discount'}} [badge]
 */


const products = [
  {
    id: 1,
    slug: 'organic-moringa-powder',
    title: "Chicken Wings",
    image: "/assets/Products/Chicken_Wings.jpg",
    price: 28.85,
    originalPrice: 32.8,
    rating: 4.0,
    reviews: 4,
    brand: "NestFood",
    category: "Snack",
    badge: {
      text: "Hot",
      variant: "hot"
    }
  },
  {
    id: 2,
    slug: 'organic-moringa-powder',
    title: "Chicken Momo",
    image: "/assets/Products/Chicken_Momo.jpg",
    price: 52.85,
    originalPrice: 55.8,
    rating: 3.5,
    reviews: 3,
    brand: "Stouffer",
    category: "Hodo Foods",
    badge: {
      text: "Sale",
      variant: "sale"
    }
  },
  {
    id: 3,
    slug: 'organic-moringa-powder',
    title: "Dal Puri",
    image: "/assets/Products/Daal_Puri.png",
    price: 48.85,
    originalPrice: 52.8,
    rating: 4.0,
    reviews: 3,
    brand: "StarKist",
    category: "Snack",
    badge: {
      text: "New",
      variant: "new"
    }
  },
  {
    id: 4,
    slug: 'organic-moringa-powder',
    title: "Chicken Popcorn",
    image: "/assets/Products/Chicken_Popcorn.jpg",
    price: 17.85,
    originalPrice: 19.8,
    rating: 4.0,
    reviews: 3,
    brand: "NestFood",
    category: "Vegetables",
  },
  {
    id: 5,
    slug: 'organic-moringa-powder',
    title: "Paratha",
    image: "/assets/Products/Paratha.png",
    price: 23.85,
    originalPrice: 25.8,
    rating: 4.0,
    reviews: 3,
    brand: "NestFood",
    category: "Snack",
  },
  {
    id: 6,
    slug: 'organic-moringa-powder',
    title: "Dal Puri",
    image: "/assets/Products/Dal_Puri.jpg",
    price: 54.85,
    originalPrice: 55.8,
    rating: 4.0,
    reviews: 3,
    brand: "Chobani",
    category: "Dairy",
  },
  {
    id: 7,
    slug: 'organic-moringa-powder',
    title: "Chicken Strips",
    image: "/assets/Products/Chicken_Strips.jpg",
    price: 54.85,
    originalPrice: 55.8,
    rating: 4.0,
    reviews: 3,
    brand: "Chobani",
    category: "Dairy",
  },
]

/** @param {{product: Product}} props */
function ProductCard({ product }) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <>
      <div className="group relative bg-white rounded-2xl transition-all duration-300 hover:shadow-xl border border-gray-100 overflow-hidden">
        {product.badge && (
          <Badge
            className={cn(
              "absolute top-3 left-3 z-10 px-2 py-1 text-xs font-semibold",
              product.badge.variant === "hot" && "bg-orange-500 text-white",
              product.badge.variant === "sale" && "bg-blue-500 text-white",
              product.badge.variant === "new" && "bg-green-500 text-white",
              product.badge.variant === "discount" && "bg-red-500 text-white"
            )}
          >
            {product.badge.text}
          </Badge>
        )}
        <div className="relative aspect-square overflow-hidden">
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
            <h3 className="font-semibold text-gray-800 mb-1 text-base md:text-lg line-clamp-2 hover:text-green-600">
                {product.title.length > 15
                 ? `${product.title.substring(0, 15)}...`
                : product.title}
            </h3>
          </Link>
          <div className="flex items-center mb-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base md:text-lg font-bold text-green-600">৳{product.price.toFixed(2)}</div>
              <div className="text-sm text-red-500 line-through ml-2">৳{product.originalPrice.toFixed(2)}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-green-50 hover:bg-green-500 text-green-600 hover:text-white border-green-200 rounded-full px-3 py-1 text-sm font-medium transition-colors duration-300"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              <span className="hidden md:block">Add</span>
            </Button>
          </div>
        </div>
      </div>

      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={product}
      />
    </>
  )
}

export function PopularProducts() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 1280px)': { slidesToScroll: 5 },
      '(min-width: 1024px)': { slidesToScroll: 4 },
      '(min-width: 768px)': { slidesToScroll: 3 },
      '(min-width: 640px)': { slidesToScroll: 2 },
    }
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  // Auto-play functionality
//   useEffect(() => {
//     if (!emblaApi) return
//     const interval = setInterval(() => {
//       emblaApi.scrollNext()
//     }, 10000)
//     return () => clearInterval(interval)
//   }, [emblaApi])

  return (
    <section className="py-16">
      <div className="container mx-auto px-3">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Popular Products</h2>
            <p className="text-gray-600">Discover our best-selling items loved by customers</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full border-gray-300 hover:bg-green-500 hover:text-white transition-colors duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full border-gray-300 hover:bg-green-500 hover:text-white transition-colors duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {products.map((product) => (
              <div key={product.id} className="flex-[0_0_50%] md:flex-[0_0_33.333333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] px-1">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

