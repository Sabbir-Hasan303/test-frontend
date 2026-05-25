"use client"

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const marqueeStyles = `
  @keyframes marquee {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  .animate-marquee {
    display: inline-block;
    white-space: nowrap;
    animation: marquee 60s linear infinite;
  }
`;

const slides = [
  {
    title: "Fresh Meat",
    subtitle: "Big Discount",
    image: "/assets/banner/banner2.jpeg",
  },
  {
    title: "Premium Cuts",
    subtitle: "Special Offer",
    image: "https://static1.bigstockphoto.com/9/3/2/large1500/239993596.jpg",
  },
  {
    title: "Quality Meat",
    subtitle: "Best Prices",
    image: "/assets/banner/banner.jpeg",
  },
]

const newsFlashes = [
  "Breaking News: Fresh meat delivery available in your area",
  "Special Offer: 20% off on all premium cuts this weekend",
  "New Arrival: Wagyu beef now in stock",
  "Flash Sale: Buy one get one free on selected items",
]

export function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = marqueeStyles;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative">
      <div className="relative h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
            <div className="relative z-20 container h-full flex flex-col justify-center pl-4 md:pl-8 lg:pl-12">
              <div className="max-w-xl space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  {slide.title}
                </h1>
                <p className="text-2xl md:text-3xl text-white/90">
                  {slide.subtitle}
                </p>
                <div className="flex items-center max-w-md gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-full">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="rounded-full border-0 bg-white/80"
                  />
                  <Button className="rounded-full bg-green-600 hover:bg-green-700">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-2 rounded-full"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-2 rounded-full"
        >
          <ChevronRight className="h-6 w-6 text-black" />
        </button>
      </div>
      <div className="bg-gray-100 py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap" style={{ animationDuration: '60s' }}>
          {newsFlashes.map((news, index) => (
            <span key={index} className="inline-block px-8 tracking-[0.25em] font-light uppercase text-gray-600">
              📢 News Flash: {news}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

