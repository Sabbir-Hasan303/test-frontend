"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingCart, Plus, Minus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {number} originalPrice
 * @property {string} image
 * @property {number} rating
 * @property {number} reviews
 * @property {boolean} isHot
 */

/**
 * @param {Object} props
 * @param {Product} props.product
 * @param {() => void} props.onAddToCart
 */
export function ProductCard({ product, onAddToCart, quantity = 0, onUpdateQuantity }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAddToCart = () => {
    setIsAnimating(true)
    const cartElement = document.querySelector('.cart-indicator')
    if (cartElement) {
      const buttonRect = document.getElementById(`add-button-${product.id}`).getBoundingClientRect()
      const cartRect = cartElement.getBoundingClientRect()

      const x = cartRect.left - buttonRect.left
      const y = cartRect.top - buttonRect.top

      // Create and animate the flying item
      const flyingItem = document.createElement('div')
      flyingItem.className = 'fixed z-50'
      flyingItem.style.cssText = `
        left: ${buttonRect.left}px;
        top: ${buttonRect.top}px;
        transform-origin: center;
      `

      const icon = document.createElement('div')
      icon.className = 'bg-green-500 rounded-full p-2'
      icon.innerHTML = '<svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM19 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM3 3h2l.4 2M7 13h10l4-8H5.8M7 13L5.8 5M7 13l-2.7-10H2"/></svg>'
      flyingItem.appendChild(icon)
      document.body.appendChild(flyingItem)

      // Animate using keyframes
      flyingItem.animate([
        {
          transform: 'scale(1) translate(0, 0)',
          opacity: 1
        },
        {
          transform: `scale(0.5) translate(${x}px, ${y}px)`,
          opacity: 0
        }
      ], {
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }).onfinish = () => {
        flyingItem.remove()
        setIsAnimating(false)
        onAddToCart(product)
      }
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden relative border shadow-md"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {product.isHot && (
        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 z-10">
          Hot
        </Badge>
      )}
      <motion.button
        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsLiked(!isLiked)}
      >
        <Heart className={`w-5 h-5 ${isLiked ? 'text-red-600 fill-red-600' : 'text-gray-400'}`} />
      </motion.button>
      <div className="p-4">
        <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          />
        </div>

        <Link href={`/products/${product.slug}`}>
            <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 mb-2 truncate">{product.name}</h3>
        </Link>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <motion.svg
              key={i}
              className={`w-5 h-5 ${
                i < product.rating ? "text-yellow-600" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg md:text-2xl font-bold text-green-700">
            ৳{product.price}
            </div>
            <div className="text-sm text-red-500 line-through ml-2">
            ৳{product.originalPrice}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isAnimating && (
              quantity === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    id={`add-button-${product.id}`}
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="hidden md:block ml-2">Add</span>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center border-2 rounded-lg"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                    className="px-2"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-3 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                    className="px-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

