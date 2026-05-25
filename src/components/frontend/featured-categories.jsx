"use client"

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import Link from 'next/link'

const categories = [
  { id: 1, name: "Wings", icon: "https://api.bengalmeat.com/images/b2c_cat_img/9c1039f7a2e9e9ad417e98b6637d225aa.png" },
  { id: 2, name: "Chicken", icon: "https://api.bengalmeat.com/images/b2c_cat_img/e9156527da4ecc58d1ac62d3ad3dc1084.png" },
  { id: 3, name: "Meat", icon: "https://api.bengalmeat.com/images/b2c_cat_img/1043d92c30eecabc8bd595ee66a2d2c83.png" },
  { id: 4, name: "Fish", icon: "https://api.bengalmeat.com/images/b2c_cat_img/9c1039f7a2e9e9ad417e98b6637d225aa.png" },
  { id: 5, name: "Vegetables", icon: "https://api.bengalmeat.com/images/b2c_cat_img/e9156527da4ecc58d1ac62d3ad3dc1084.png" },
  { id: 6, name: "Fruits", icon: "https://api.bengalmeat.com/images/b2c_cat_img/1043d92c30eecabc8bd595ee66a2d2c83.png" },
  { id: 7, name: "Dairy", icon: "https://api.bengalmeat.com/images/b2c_cat_img/9c1039f7a2e9e9ad417e98b6637d225aa.png" },
  { id: 8, name: "Bakery", icon: "https://api.bengalmeat.com/images/b2c_cat_img/e9156527da4ecc58d1ac62d3ad3dc1084.png" },
  { id: 9, name: "Snacks", icon: "https://api.bengalmeat.com/images/b2c_cat_img/1043d92c30eecabc8bd595ee66a2d2c83.png" },
  { id: 10, name: "Beverages", icon: "https://api.bengalmeat.com/images/b2c_cat_img/9c1039f7a2e9e9ad417e98b6637d225aa.png" },
]

const adBanners = [
  {
    title: "Everyday Fresh & Clean with Our Products",
    bgColor: "bg-[#F2F0EA]",
    bgImage: "https://nest-frontend-v6.vercel.app/assets/imgs/banner/banner-1.png",
  },
  {
    title: "Make your Breakfast Healthy and Easy",
    bgColor: "bg-[#FDF1F1]",
    bgImage: "https://nest-frontend-v6.vercel.app/assets/imgs/banner/banner-2.png",
  },
  {
    title: "The best Organic Products Online",
    bgColor: "bg-[#F2F6F8]",
    bgImage: "assets/ads/ad_3.png",
  },
]

export function FeaturedCategories() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 1280px)': { slidesToScroll: 7 },
      '(min-width: 1024px)': { slidesToScroll: 5 },
      '(min-width: 768px)': { slidesToScroll: 3 },
      '(min-width: 640px)': { slidesToScroll: 2 },
    }
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div className="relative py-12"
      style={{
        backgroundImage: `url('https://github.com/Sabbir-Hasan303/Sabbir-s-Blog/blob/main/images/VMAI%20Images/feature-category-bg.png?raw=true')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0" />

      <div className="relative container mx-auto space-y-12">
        {/* Categories Carousel */}
        <div className="relative md:px-4 overflow-hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex-[0_0_50%] sm:flex-[0_0_33.333333%] md:flex-[0_0_25%] lg:flex-[0_0_20%] xl:flex-[0_0_14.285714%] px-3"
                >
                  <div className="group cursor-pointer">
                    <div className={cn(
                      "relative rounded-lg p-4",
                      "transition-all duration-300 ease-in-out",
                      "bg-white",
                      "group-hover:shadow-lg", "group-hover:bg-yellow-400"
                    )}>
                      <div className="aspect-square relative transition-transform duration-300 group-hover:scale-110 w-4/5 mx-auto">
                        <Image
                          src={category.icon}
                          alt={category.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-center mt-4 font-medium text-gray-800">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-[46%] -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 hidden lg:block z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-[46%] -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 hidden lg:block z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dot Navigation */}
          <div className="flex justify-center space-x-2 mt-6">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  selectedIndex === idx
                    ? "bg-yellow-400 w-4"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Ad Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {adBanners.map((banner, index) => (
            <div
              key={index}
              className={cn(
                "relative rounded-2xl overflow-hidden",
                "transition-transform duration-300 hover:scale-[1.02]",
                "bg-cover bg-center h-[250px]"
              )}
              style={{ backgroundImage: `url(${banner.bgImage})` }}
            >
              <div className="absolute inset-0" />
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <h3 className="text-2xl font-semibold max-w-[210px] mt-5">{banner.title}</h3>
                <Link href="/shop">
                    <button className="bg-white text-green-600 px-6 py-2 rounded-full hover:bg-green-600 hover:text-white transition-colors w-fit">
                        Shop Now
                    </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

