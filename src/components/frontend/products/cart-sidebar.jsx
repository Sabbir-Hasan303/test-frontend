"use client"

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/components/frontend/context/cart-context'
import Link from 'next/link'

/**
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 */
export function CartSidebar({ isOpen, onClose }) {
  const { state, dispatch } = useCart()

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id })
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
    }
  }

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-xl"
          >
            {/* Header */}
            <div className="bg-yellow-400 py-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium">
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span>{state.totalQuantity}</span>
                <span>items</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-yellow-500"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {state.totalQuantity > 0 && (
              <div className="bg-green-100 py-2 px-6 text-green-700 text-sm">
                Shop ৳265 more for free shipping
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-auto p-6">
              {state.items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex gap-4 py-4 border-b relative group"
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-red-600 font-bold">৳{item.price}</span>
                      <span className="text-sm text-gray-500 line-through">৳{item.originalPrice}</span>
                      <span className="text-sm text-gray-500">৳{item.discount} off</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-1 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-700 hover:text-white"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-6">
              <div className="flex items-center gap-2 mb-6">
                <Input
                  placeholder="Type your coupon code"
                  className="flex-1"
                />
                <Button className="bg-red-600 hover:bg-red-700 whitespace-nowrap">
                  Apply coupon
                </Button>
              </div>

              <div className="flex items-center justify-between py-4 border-t">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-xl">৳{state.totalAmount}</span>
              </div>

              <Link href="/checkout">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-lg">
                  Place order
                </Button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

