"use client"

import { useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from 'embla-carousel-react'


const categories = [
  {
    id: "beef",
    name: "Beef",
    image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "poultry",
    name: "Poultry",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "mutton",
    name: "Mutton",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "fish",
    name: "Fish",
    image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "vegetables",
    name: "Vegetables",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=1000&auto=format&fit=crop",
  },
]

export function ShopByCategory() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 4 },
      '(max-width: 639px)': { slidesToScroll: 2 },
    }
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <section className="py-12 bg-white">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-[#253D4E] mb-8">
          Shop By Category
        </h2>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex-[0_0_50%] sm:flex-[0_0_25%] px-2 sm:px-3"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-white text-lg sm:text-xl font-semibold">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white shadow-md border-gray-200"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white shadow-md border-gray-200"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

