"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProductGrid } from "@/components/frontend/shop/product-grid"
import { FilterSidebar } from "@/components/frontend/shop/filter-sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Filter } from 'lucide-react'
import { CartSidebar } from '@/components/frontend/products/cart-sidebar'
import { useCart } from '@/components/frontend/context/cart-context'

export function ProductListingPage() {
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(true)
  const { state } = useCart()

  useEffect(() => {
    const checkWidth = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }

    checkWidth()

    window.addEventListener('resize', checkWidth)

    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible)
  }

  return (
    <div className="bg-gradient-to-b from-white to-green-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-between items-center mb-8 gap-4"
        >
          <Select defaultValue="featured">
            <SelectTrigger className="w-[180px] bg-white border-green-200">
              <SelectValue placeholder="Sort by: Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Sort by: Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-4">
            <Button
              onClick={toggleFilter}
              className="lg:hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            >
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cart-indicator flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 px-4 py-2 rounded-lg text-white shadow-md cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="text-white" />
              <div>
                <span className="font-medium">{state.totalQuantity} items</span>
                <span className="mx-2">|</span>
                <span className="font-medium">${state.totalAmount.toFixed(2)}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="flex flex-col-reverse flex-col lg:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-3/4"
          >
            <ProductGrid />
          </motion.div>
          <AnimatePresence>
            {(isFilterVisible || isLargeScreen) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="lg:w-1/4"
              >
                <FilterSidebar />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  )
}

