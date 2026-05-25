"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AboutHero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <Image
        src="/assets/about/banner.jpeg"
        alt="Village Meat Agro facility"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-75" />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 transition-all duration-300 hover:scale-105">
            Your Trusted Source for Quality Meat Products
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Delivering premium meat products with a commitment to quality, freshness, and customer satisfaction
          </p>
        </motion.div>
      </div>
    </section>
  )
}

