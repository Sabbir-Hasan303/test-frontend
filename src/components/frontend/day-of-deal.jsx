"use client"

import { useState, useEffect, useCallback } from 'react'
import { Star, ChevronLeft, ChevronRight, Heart, Eye, ShoppingCart, Clock } from 'lucide-react'
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QuickViewModal } from "./quick-view-modal"
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} title
 * @property {string} image
 * @property {number} price
 * @property {number} originalPrice
 * @property {number} rating
 * @property {number} reviews
 * @property {string} category
 * @property {string} seller
 * @property {{text: string, variant: 'hot'|'sale'}} [badge]
 */

/** @type {Product[]} */
const products = [
  {
    id: 1,
    slug: 'organic-moringa-powder',
    title: "Dal Puri",
    image: "/assets/Products/Dal_Puri.jpg",
    price: 54.85,
    originalPrice: 55.8,
    rating: 4.0,
    reviews: 2,
    category: "Hodo Foods",
    seller: "NestFood"
  },
  {
    id: 2,
    slug: 'organic-moringa-powder',
    title: "Chicken Momo",
    image: "/assets/Products/Chicken_Momo.jpg",
    price: 32.85,
    originalPrice: 33.8,
    rating: 4.0,
    reviews: 4,
    category: "Mixers",
    seller: "NestFood"
  },
  {
    id: 3,
    slug: 'organic-moringa-powder',
    title: "Chicken Shami Kabab",
    image: "/assets/Products/Chicken_Shami_Kabab.jpg",
    price: 35.85,
    originalPrice: 37.8,
    rating: 4.0,
    reviews: 4,
    category: "Snack",
    seller: "NestFood",
    badge: {
      text: "Sale",
      variant: "sale"
    }
  },
  {
    id: 4,
    slug: 'organic-moringa-powder',
    title: "Chicken Nuggets",
    image: "/assets/Products/Chicken_Nuggets.jpg",
    price: 23.85,
    originalPrice: 25.8,
    rating: 4.0,
    reviews: 4,
    category: "Coffee",
    seller: "Old El Paso",
    badge: {
      text: "Hot",
      variant: "hot"
    }
  },
  {
    id: 5,
    slug: 'organic-moringa-powder',
    title: "Chicken Burger Patty",
    image: "/assets/Products/Chicken_Burger_Patty.jpg",
    price: 22.85,
    originalPrice: 24.8,
    rating: 4.0,
    reviews: 2,
    category: "Cream",
    seller: "Tyson"
  }
]

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
              product.badge.variant === "hot" && "bg-red-500 text-white",
              product.badge.variant === "sale" && "bg-green-500 text-white"
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
        <Link href={`/products/${product.slug}`}>
            <h3 className="font-semibold text-gray-800 mb-1 text-lg hover:text-green-600">{product.title}</h3>
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
          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-green-600">৳{product.price.toFixed(2)}</span>
            <span className="text-sm text-red-500 line-through ml-2">৳{product.originalPrice.toFixed(2)}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-green-50 hover:bg-green-500 text-green-600 hover:text-white border-green-200 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
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

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 19,
    minutes: 7,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-3 flex flex-col items-center">
      <div className="flex flex-row items-center gap-2">
        <Clock className="h-6 w-6 text-yellow-400" />
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center">
              <div className="relative">
                <svg className="w-12 h-12">
                  <circle
                    className="text-gray-300"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth="3"
                    cx="24"
                    cy="24"
                    r="20"
                  />
                  <circle
                    className="text-green-400"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth="3"
                    cx="24"
                    cy="24"
                    r="20"
                    strokeDasharray="126"
                    strokeDashoffset={126 - (126 * value) / 60}
                    style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                  {value.toString().padStart(2, '0')}
                </div>
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide">{key}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}

export function DayOfDeal() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 1280px)': { slidesToScroll: 4 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 640px)': { slidesToScroll: 1 },
    }
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 10000)
    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
          <div className="mb-6 lg:mb-0 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Deals of the <span className="text-green-600">Day</span>
            </h2>
            <p className="text-gray-600">
              Hurry up and get your favorite products before they're gone!
            </p>
          </div>
          <CountdownTimer />
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {products.map((product) => (
                <div key={product.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%] xl:flex-[0_0_25%] px-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md border-gray-200 hover:bg-green-500 hover:text-white transition-colors duration-300"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md border-gray-200 hover:bg-green-500 hover:text-white transition-colors duration-300"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}

