'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useCart } from '@/components/frontend/context/cart-context'
import { CartSidebar } from '@/components/frontend/products/cart-sidebar'

export function FloatingCart() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { state } = useCart()
  const controls = useAnimation()

  // Calculate the total number of items
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    // Trigger the jump animation when the cart state changes
    controls.start({
      y: [0, -10, 0],
      transition: { duration: 0.3 }
    })
  }, [state, controls])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-1/2 right-[11px] transform -translate-y-1/2 z-40 w-[90px] hidden md:block"
      >
        <motion.button
          onClick={() => setIsSidebarOpen(true)}
          className="w-full cart-indicator"
          animate={controls}
        >
          <div className="relative group">
            <div className="bg-green-600 text-white px-4 py-2.5 rounded-t-lg shadow-lg border-r-4 border-yellow-400">
              <div className="w-4 h-1.5 bg-white mx-auto mb-1 rounded-b-sm" />
              <div className="text-sm font-medium">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </div>
            </div>
            <div className="bg-orange-600 text-white px-4 py-2.5 rounded-b-lg shadow-lg border-r-4 border-yellow-400">
              <div className="text-sm font-medium">৳{state.totalAmount.toFixed(2)}</div>
            </div>
          </div>
        </motion.button>
      </motion.div>

      <CartSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  )
}

