'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, Share2, ShoppingBag, Truck, Shield, Clock, Award, ZoomIn, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FloatingCart } from '@/components/frontend/products/floating-cart'
import { useCart } from '@/components/frontend/context/cart-context'
import { CartSidebar } from '@/components/frontend/products/cart-sidebar'

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {number} currentPrice
 * @property {number} originalPrice
 * @property {number} discount
 * @property {string} description
 * @property {number} ratings
 * @property {number} stars
 * @property {string[]} images
 * @property {string} type
 * @property {string} sku
 * @property {string} mfg
 * @property {string[]} tags
 * @property {string} life
 * @property {string} stock
 * @property {{value: string, label: string}[]} weightOptions
 * @property {{standard: {text: string, guarantee: string, cost: number}, cashOnDelivery: boolean, returns: string}} delivery
 */

/**
 * @param {Object} props
 * @param {Product} props.product
 */
export function ProductView({ product }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedWeight, setSelectedWeight] = useState(product.weightOptions[0].value)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const { state, dispatch } = useCart()
  const isInCart = state.items.some(item => item.id === product.id)
  const cartItem = state.items.find(item => item.id === product.id)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const highlights = [
    { icon: Shield, title: 'Premium Quality', text: '100% Authentic Product' },
    { icon: Clock, title: 'Fast Delivery', text: 'Quick Processing Time' },
    { icon: Award, title: 'Best Price', text: 'Factory Direct Prices' },
  ]

  return (
    <>
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <motion.div
              className="relative aspect-square bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="absolute top-3 left-3 z-10 bg-gradient-to-r from-pink-500 to-rose-500 px-3 py-1 text-white text-xs sm:text-sm">
                Sale Off
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white h-8 w-8 sm:h-9 sm:w-9"
              >
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full"
                >
                  <Image
                    src={product.images[currentImage]}
                    alt={product.name}
                    fill
                    className={`object-contain p-4 transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-3 right-3 z-10 bg-white/80 hover:bg-white h-8 w-8 sm:h-9 sm:w-9"
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <ZoomIn className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-1/2 left-2 right-2 sm:left-4 sm:right-4 flex justify-between transform -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 hover:bg-white h-8 w-8 sm:h-9 sm:w-9"
                  onClick={() => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 hover:bg-white h-8 w-8 sm:h-9 sm:w-9"
                  onClick={() => setCurrentImage((prev) => (prev + 1) % product.images.length)}
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2 px-1 scrollbar-hide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentImage(index)}
                  className={`flex-shrink-0 relative w-16 h-16 sm:w-24 sm:h-24 mt-2 ml-2 rounded-lg overflow-hidden
                    ${currentImage === index
                      ? 'ring-2 ring-green-500 ring-offset-2'
                      : 'ring-1 ring-gray-200'}`}
                >
                  <Image
                    src={image}
                    alt={`Product view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900"
              >
                {product.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-4"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${i < product.stars ? 'text-yellow-400' : 'text-gray-200'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">| {product.ratings} Ratings</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-baseline gap-2 sm:gap-4 bg-gray-50 p-3 sm:p-4 rounded-lg"
              >
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">৳{product.currentPrice.toFixed(2)}</span>
                <span className="text-base sm:text-lg text-gray-500 line-through">M.R.P : ৳{product.originalPrice.toFixed(2)}</span>
                <span className="text-green-600 font-semibold">-{product.discount}%</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
            >
              {highlights.map((item, index) => (
                <div key={index} className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-green-600" />
                  <h3 className="font-medium text-xs sm:text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.text}</p>
                </div>
              ))}
            </motion.div>

            <div className="space-y-6">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{product.description}</p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-gray-50 p-3 sm:p-4 rounded-lg text-xs sm:text-sm">
                <div>
                  <span className="text-gray-500">Type: </span>
                  <span className="text-green-600 font-medium">{product.type}</span>
                </div>
                <div>
                  <span className="text-gray-500">SKU: </span>
                  <span className="font-medium">{product.sku}</span>
                </div>
                <div>
                  <span className="text-gray-500">MFG: </span>
                  <span className="font-medium">{product.mfg}</span>
                </div>
                <div>
                  <span className="text-gray-500">Tags: </span>
                  <span className="font-medium">{product.tags.join(', ')}</span>
                </div>
                <div>
                  <span className="text-gray-500">LIFE: </span>
                  <span className="font-medium">{product.life}</span>
                </div>
                <div>
                  <span className="text-gray-500">Stock: </span>
                  <span className="text-green-600 font-medium">{product.stock}</span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-medium">WEIGHT</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product.weightOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedWeight(option.value)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-2 transition-colors text-sm sm:text-base
                        ${selectedWeight === option.value
                          ? 'border-green-500 bg-green-50 text-green-600'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                {isInCart ? (
                  <div className="flex items-center border-2 rounded-lg">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        const newQuantity = (cartItem?.quantity || 1) - 1;
                        if (newQuantity === 0) {
                          dispatch({ type: 'REMOVE_ITEM', payload: product.id });
                        } else {
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: product.id, quantity: newQuantity }
                          });
                        }
                      }}
                      className="px-3 sm:px-4 py-2 border-r-2"
                    >
                      -
                    </motion.button>
                    <span className="px-4 sm:px-6 py-2 font-medium">{cartItem?.quantity || 0}</span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { id: product.id, quantity: (cartItem?.quantity || 1) + 1 }
                      })}
                      className="px-3 sm:px-4 py-2 border-l-2"
                    >
                      +
                    </motion.button>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-base sm:text-lg font-medium"
                      onClick={() => dispatch({
                        type: 'ADD_ITEM',
                        payload: {
                          id: product.id,
                          name: product.name,
                          image: product.images[0],
                          price: product.currentPrice,
                          originalPrice: product.originalPrice,
                          discount: product.discount,
                          quantity: 1
                        }
                      })}
                    >
                      ADD TO CART
                    </Button>
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="icon" className="border-2 h-10 w-10 sm:h-11 sm:w-11">
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </motion.div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t">
              <div className="grid gap-3 sm:gap-4">
                <div className="flex items-center justify-between bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm sm:text-base">{product.delivery.standard.text}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{product.delivery.standard.guarantee}</p>
                    </div>
                  </div>
                  <span className="font-medium text-sm sm:text-base">৳{product.delivery.standard.cost}</span>
                </div>

                {product.delivery.cashOnDelivery && (
                  <div className="flex items-center gap-3 bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                    <p className="font-medium text-sm sm:text-base">Cash on Delivery Available</p>
                  </div>
                )}

                <div className="flex items-center gap-3 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <p className="font-medium text-sm sm:text-base">{product.delivery.returns}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart Bar for Mobile */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: isScrolled ? 0 : 100 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 md:hidden z-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-base font-bold text-gray-900">৳{product.currentPrice.toFixed(2)}</p>
              <p className="text-xs text-gray-500 line-through">৳{product.originalPrice.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-3">
              {isInCart ? (
                <div className="flex items-center border-2 rounded-lg">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const newQuantity = (cartItem?.quantity || 1) - 1;
                      if (newQuantity === 0) {
                        dispatch({ type: 'REMOVE_ITEM', payload: product.id });
                      } else {
                        dispatch({
                          type: 'UPDATE_QUANTITY',
                          payload: { id: product.id, quantity: newQuantity }
                        });
                      }
                    }}
                    className="px-3 py-2 border-r-2"
                  >
                    -
                  </motion.button>
                  <span className="px-4 py-2 font-medium">{cartItem?.quantity || 0}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => dispatch({
                      type: 'UPDATE_QUANTITY',
                      payload: { id: product.id, quantity: (cartItem?.quantity || 1) + 1 }
                    })}
                    className="px-3 py-2 border-l-2"
                  >
                    +
                  </motion.button>
                </div>
              ) : (
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => dispatch({
                    type: 'ADD_ITEM',
                    payload: {
                      id: product.id,
                      name: product.name,
                      image: product.images[0],
                      price: product.currentPrice,
                      originalPrice: product.originalPrice,
                      discount: product.discount,
                      quantity: 1
                    }
                  })}
                >
                  ADD TO CART
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                className="bg-orange-600 text-white hover:bg-orange-700"
                onClick={() => setIsSidebarOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {state.totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {state.totalQuantity}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <FloatingCart />

      <CartSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  )
}

