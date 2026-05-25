'use client'
import { notFound } from 'next/navigation'
import { Timer } from '@/components/frontend/deals/Timer'
import { ProductCard } from '@/components/frontend/deals/ProductCard'
import { AdBanner } from '@/components/frontend/deals/AdBanner'
import { SortOptions } from '@/components/frontend/deals/SortOptions'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from 'next/link'
import { FloatingCart } from '@/components/frontend/products/floating-cart'
import { motion } from 'framer-motion'
import { useCart } from '@/components/frontend/context/cart-context'

const deals = {
  'flash-sale': {
    title: 'Flash Sale',
    description: 'Limited time offers with massive discounts!',
    endTime: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    products: [
      { id: 1, slug: 'organic-moringa-powder', name: 'Super Fast Laptop', price: 799, discountedPrice: 599, image: '/assets/Products/Chicken_Wings.jpg', discount: '25%', rating: 4.5, freeShipping: true },
      { id: 2, slug: 'organic-moringa-powder', name: 'Noise-Cancelling Headphones', price: 299, discountedPrice: 149, image: '/assets/Products/Chicken_Momo.jpg', discount: '50%', rating: 4.2 },
      { id: 3, slug: 'organic-moringa-powder', name: '4K Smart TV', price: 699, discountedPrice: 499, image: '/assets/Products/Daal_Puri.png', discount: '28%', rating: 4.7, freeShipping: true },
      { id: 4, slug: 'organic-moringa-powder', name: 'Wireless Earbuds', price: 159, discountedPrice: 99, image: '/assets/Products/Chicken_Popcorn.jpg', discount: '38%', rating: 4.0 },
      { id: 5, slug: 'organic-moringa-powder', name: 'Gaming Console', price: 499, discountedPrice: 399, image: '/assets/Products/Paratha.png', discount: '20%', rating: 4.8, freeShipping: true },
      { id: 6, slug: 'organic-moringa-powder', name: 'Smartphone', price: 999, discountedPrice: 799, image: '/assets/Products/Dal_Puri.jpg', discount: '20%', rating: 4.6 },
      { id: 7, slug: 'organic-moringa-powder', name: 'Fitness Tracker', price: 129, discountedPrice: 89, image: '/assets/Products/Chicken_Strips.jpg', discount: '31%', rating: 4.3 },
      { id: 8, slug: 'organic-moringa-powder', name: 'Coffee Maker', price: 89, discountedPrice: 59, image: '/assets/Products/Chicken_Wings.jpg', discount: '34%', rating: 4.1 },
      { id: 9, slug: 'organic-moringa-powder', name: 'Bluetooth Speaker', price: 79, discountedPrice: 49, image: '/assets/Products/Chicken_Popcorn.jpg', discount: '38%', rating: 4.4 },
      { id: 10, slug: 'organic-moringa-powder', name: 'Robot Vacuum', price: 299, discountedPrice: 199, image: '/assets/Products/Chicken_Momo.jpg', discount: '33%', rating: 4.5, freeShipping: true },
    ],
  },
  'clearance': {
    title: 'Clearance',
    description: 'Last chance to grab these items at unbeatable prices!',
    endTime: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 days from now
    products: [
      { id: 7, slug: 'organic-moringa-powder', name: 'Vintage Chair', price: 199, discountedPrice: 59, image: '/assets/Products/Chicken_Wings.jpg', discount: '70%' },
      { id: 8, slug: 'organic-moringa-powder', name: 'Retro Coffee Maker', price: 89, discountedPrice: 29, image: '/assets/Products/Chicken_Momo.jpg', discount: '67%' },
      { id: 9, slug: 'organic-moringa-powder', name: 'Classic Wristwatch', price: 249, discountedPrice: 79, image: '/assets/Products/Daal_Puri.png', discount: '68%' },
      { id: 10, slug: 'organic-moringa-powder', name: 'Leather Backpack', price: 179, discountedPrice: 69, image: '/assets/Products/Chicken_Popcorn.jpg', discount: '61%' },
      { id: 11, slug: 'organic-moringa-powder', name: 'Polaroid Camera', price: 129, discountedPrice: 49, image: '/assets/Products/Paratha.png', discount: '62%' },
      { id: 12, slug: 'organic-moringa-powder', name: 'Vinyl Record Player', price: 299, discountedPrice: 99, image: '/assets/Products/Chicken_Strips.jpg', discount: '67%' },
    ],
  },
  'bundle-offers': {
    title: 'Bundle Offers',
    description: 'Save big with our amazing bundle deals!',
    endTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
    products: [
      { id: 7, slug: 'organic-moringa-powder', name: 'Home Office Bundle', price: 399, discountedPrice: 349, image: '/assets/Products/Chicken_Strips.jpg', discount: '12%' },
      { id: 8, slug: 'organic-moringa-powder', name: 'Fitness Starter Kit', price: 149, discountedPrice: 129, image: '/assets/Products/Dal_Puri.jpg', discount: '13%' },
      { id: 9, slug: 'organic-moringa-powder', name: 'Gourmet Cooking Set', price: 249, discountedPrice: 219, image: '/assets/Products/Chicken_Popcorn.jpg', discount: '12%' },
    ],
  },
  'seasonal-specials': {
    title: 'Seasonal Specials',
    description: 'Get ready for the season with our special offers!',
    endTime: Date.now() + 14 * 24 * 60 * 60 * 1000, // 14 days from now
    products: [
      { id: 10, slug: 'organic-moringa-powder', name: 'Winter Jacket', price: 89, discountedPrice: 79, image: '/assets/Products/Chicken_Momo.jpg', discount: '11%' },
      { id: 11, slug: 'organic-moringa-powder', name: 'Holiday Decoration Set', price: 39, discountedPrice: 34, image: '/assets/Products/Dal_Puri.jpg', discount: '13%' },
      { id: 12, slug: 'organic-moringa-powder', name: 'Gingerbread House Kit', price: 19, discountedPrice: 16, image: '/assets/Products/Chicken_Wings.jpg', discount: '16%' },
    ],
  },
}

function HeroSection() {
  return (
    <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
      <Image
        src="https://img.freepik.com/free-vector/deal-promotional-banner-hanging-price-tag-style_1017-27325.jpg"
        alt="Deals Hero"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
        <div className="max-w-2xl space-y-4">
          <Badge className="bg-red-500 text-white px-3 py-1 text-sm mb-4">
            Limited Time Offer
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Exclusive Deals on Premium Meat
          </h1>
          <p className="text-lg text-white/90 py-4">
            Get up to 50% off on selected premium cuts. Don&apos;t miss out on these amazing offers!
          </p>
        <Link href="/shop">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Shop Now
            </Button>
        </Link>
        </div>
      </div>
    </div>
  )
}

function NewsletterSection() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 mt-12">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">
          Get Exclusive Deals Straight to Your Inbox
        </h2>
        <p className="text-white/90">
          Subscribe to our newsletter and never miss out on our special offers!
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <Button className="bg-white text-green-600 hover:bg-white/90 rounded-full">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function DealPage({ params }) {
  const deal = deals[params.slug]
  const { state, dispatch } = useCart()

  if (!deal) {
    notFound()
  }

  const handleAddToCart = (product) => {
    // console.log('Adding to cart:', product);
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.discountedPrice,
        originalPrice: product.price,
        image: product.image,
        discount: product.discount,
        quantity: 1,
        slug: product.slug || '', // Add slug if needed
        reviews: product.reviews || 0,
        rating: product.rating || 0,
        freeShipping: product.freeShipping || false
      }
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: productId })
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: productId, quantity: newQuantity }
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <AdBanner />

      <div className='flex flex-col md:flex-row justify-between items-center'>
        <div className='text-center md:text-left'>
          <h1 className="text-4xl font-bold mb-4">{deal.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{deal.description}</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-[#faf5f2] to-blue-50 p-4 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-2">Deal ends in:</p>
            <Timer endTime={deal.endTime} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <p className="text-lg font-semibold">{deal.products.length} products</p>
        <SortOptions />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {deal.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            quantity={state.items.find(item => item.id === product.id)?.quantity || 0}
            onUpdateQuantity={handleUpdateQuantity}
          />
        ))}
      </motion.div>

      <NewsletterSection />
      <FloatingCart />
    </div>
  )
}
