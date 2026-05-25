import Image from 'next/image'
import { ShoppingCart, Star, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function ProductCard({ product, onAddToCart, quantity = 0, onUpdateQuantity }) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAddToCart = () => {
    setIsAnimating(true)
    const cartElement = document.querySelector('.cart-indicator')
    if (cartElement) {
      const buttonRect = document.getElementById(`add-button-${product.id}`).getBoundingClientRect()
      const cartRect = cartElement.getBoundingClientRect()

      const x = cartRect.left - buttonRect.left
      const y = cartRect.top - buttonRect.top

      const flyingItem = document.createElement('div')
      flyingItem.className = 'fixed z-50 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center'
      flyingItem.style.cssText = `
        left: ${buttonRect.left}px;
        top: ${buttonRect.top}px;
        transform-origin: center;
      `

      const icon = document.createElement('div')
      icon.className = 'text-white'
      icon.innerHTML = '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM19 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM3 3h2l.4 2M7 13h10l4-8H5.8M7 13L5.8 5M7 13l-2.7-10H2"/></svg>'
      flyingItem.appendChild(icon)
      document.body.appendChild(flyingItem)

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square">
            <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            />
            <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md font-semibold">
            {product.discount} OFF
            </div>
            {product.freeShipping && (
            <div className="absolute bottom-0 left-0 bg-green-500 text-white px-2 py-1 m-2 rounded-md font-semibold text-xs">
                Free Shipping
            </div>
            )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
            <h2 className="text-lg font-semibold mb-2 truncate hover:text-green-600">{product.name}</h2>
        </Link>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
            />
          ))}
          <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg md:text-xl font-bold text-green-600">৳{product.discountedPrice}</span>
            <span className="line-through text-sm ml-2 text-red-600">৳{product.price}</span>
          </div>

          <AnimatePresence mode="wait">
            {!isAnimating && (
              quantity === 0 ? (
                <motion.div
                  key="add-button"
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
                    <span className="hidden md:inline ml-2">Add</span>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="quantity-controls"
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
    </div>
  )
}
