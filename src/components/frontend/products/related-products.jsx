'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import useEmblaCarousel from 'embla-carousel-react'

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} image
 * @property {number} price
 * @property {number} originalPrice
 * @property {number} rating
 * @property {number} reviewCount
 * @property {string} brand
 * @property {string} category
 */

/** @type {Product[]} */
const relatedProducts = [
  {
    id: '1',
    slug: 'organic-moringa-powder',
    name: 'Chobani Complete Vanilla Greek Yogurt',
    image: '/assets/Products/Daal_Puri.png',
    price: 54.85,
    originalPrice: 55.80,
    rating: 4,
    reviewCount: 2,
    brand: 'Hodo Foods',
    category: 'Dairy'
  },
  {
    id: '2',
    slug: 'organic-moringa-powder',
    name: 'Canada Dry Ginger Ale - 2 L Bottle',
    image: '/assets/Products/Meat_Ball.png',
    price: 32.85,
    originalPrice: 33.80,
    rating: 4,
    reviewCount: 4,
    brand: 'Mixers',
    category: 'Beverages'
  },
  {
    id: '3',
    slug: 'organic-moringa-powder',
    name: 'Organic Spirulina Powder',
    image: '/assets/Products/Mini_Samussa.png',
    price: 89.99,
    originalPrice: 119.90,
    rating: 5,
    reviewCount: 12,
    brand: 'Organic Foods',
    category: 'Supplements'
  },
  {
    id: '4',
    slug: 'organic-moringa-powder',
    name: 'Organic Acai Berry Powder',
    image: '/assets/Products/Nuggets.png',
    price: 129.99,
    originalPrice: 159.90,
    rating: 4,
    reviewCount: 32,
    brand: 'Pure Foods',
    category: 'Supplements'
  },
  {
    id: '5',
    slug: 'organic-moringa-powder',
    name: 'Organic Maca Root Powder',
    image: '/assets/Products/Paratha.png',
    price: 99.99,
    originalPrice: 129.90,
    rating: 4,
    reviewCount: 16,
    brand: 'Natural Foods',
    category: 'Supplements'
  },
  {
    id: '6',
    slug: 'organic-moringa-powder',
    name: 'Organic Maca Root Powder',
    image: '/assets/Products/Paratha.png',
    price: 99.99,
    originalPrice: 129.90,
    rating: 4,
    reviewCount: 16,
    brand: 'Natural Foods',
    category: 'Supplements'
  }
]

export function RelatedProducts() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 2,
    breakpoints: {
      '(min-width: 1280px)': { slidesToScroll: 5 },
      '(min-width: 1024px)': { slidesToScroll: 4 },
      '(min-width: 768px)': { slidesToScroll: 3 },
      '(min-width: 640px)': { slidesToScroll: 2 },
    }
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    // Auto-play functionality
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)

    return () => {
      emblaApi.off('select', onSelect)
      clearInterval(interval)
    }
  }, [emblaApi])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {relatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-[0_0_50%] min-w-0 px-2 md:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%]"
                >
                  <Card className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-2 sm:p-4">
                      <Link href={`/products/${product.slug}`}>
                        <div className="relative h-48 mb-4 rounded-md overflow-hidden bg-gray-50 group p-2">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="p-0 transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">{product.brand}</p>
                          <h3 className="font-medium text-gray-900 line-clamp-2 min-h-[48px]">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < product.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-gray-200 text-gray-200'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-500">({product.reviewCount})</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-green-600">
                              ${product.price.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <Button
                        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium"
                        size="sm"
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className={`absolute top-1/2 -left-2 sm:-left-4 transform -translate-y-1/2 rounded-full shadow-lg transition-all hover:scale-110 z-10 bg-white
              ${!canScrollPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-50'}`}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={`absolute top-1/2 -right-2 sm:-right-4 transform -translate-y-1/2 rounded-full shadow-lg transition-all hover:scale-110 z-10 bg-white
              ${!canScrollNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-50'}`}
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}

