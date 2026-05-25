"use client"

import { useCallback, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import useEmblaCarousel from 'embla-carousel-react'

const features = [
  {
    title: "Premium Quality Meat",
    description: "We source the finest cuts from trusted local farms, ensuring top-notch quality in every bite.",
    image: "https://api.bengalmeat.com/images/why_bengal_meat/75271f96dbf23d6816c54019c4addc52.jpg",
    icon: "🥩"
  },
  {
    title: "Farm-to-Table Freshness",
    description: "Our efficient supply chain brings you the freshest meat, straight from the farm to your table.",
    image: "https://api.bengalmeat.com/images/why_bengal_meat/75271f96dbf23d6816c54019c4addc52.jpg",
    icon: "🚚"
  },
  {
    title: "Wide Selection",
    description: "From prime cuts to exotic meats, we offer a diverse range to satisfy every palate.",
    image: "https://api.bengalmeat.com/images/why_bengal_meat/75271f96dbf23d6816c54019c4addc52.jpg",
    icon: "🍖"
  },
  {
    title: "Expert Butchers",
    description: "Our skilled butchers ensure perfect cuts and can provide custom orders to meet your needs.",
    image: "https://api.bengalmeat.com/images/why_bengal_meat/75271f96dbf23d6816c54019c4addc52.jpg",
    icon: "🔪"
  },
  {
    title: "Sustainable Practices",
    description: "We prioritize eco-friendly and ethical sourcing, supporting sustainable farming practices.",
    image: "https://api.bengalmeat.com/images/why_bengal_meat/75271f96dbf23d6816c54019c4addc52.jpg",
    icon: "🌱"
  }
]

export function WhyVillageMeat() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 4 },
      '(min-width: 768px)': { slidesToScroll: 3 },
      '(max-width: 767px)': { slidesToScroll: 2 },
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Why Choose Village Meat</h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Experience the difference with Village Meat. We're committed to bringing you the highest quality meat products,
          backed by our passion for excellence and customer satisfaction.
        </p>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex-[0_0_50%] sm:flex-[0_0_33.333333%] lg:flex-[0_0_25%] px-2 sm:px-3 md:px-4"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                    <div className="relative h-48 sm:h-56 md:h-64">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <span className="text-4xl sm:text-5xl md:text-6xl">{feature.icon}</span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 md:p-6">
                      <h3 className="text-xl sm:text-2xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full shadow-lg"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full shadow-lg"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}

