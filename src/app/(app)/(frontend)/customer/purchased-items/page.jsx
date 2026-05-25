"use client"

import { useState } from "react"
import { CustomerLayout } from "@/components/frontend/customer/customer-layout"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Star, ShoppingBag } from 'lucide-react'
import Link from "next/link"

const purchasedItems = [
  { id: '1', slug: 'organic-moringa-powder', name: 'Organic Avocado', image: '/assets/Products/Chicken_Wings.jpg', price: 4.99, purchaseDate: '2023-05-01', rating: 4.5 },
  { id: '2', slug: 'organic-moringa-powder', name: 'Fresh Strawberries', image: '/assets/Products/Chicken_Momo.jpg', price: 3.99, purchaseDate: '2023-05-15', rating: 5 },
  { id: '3', slug: 'organic-moringa-powder', name: 'Organic Chicken', image: '/assets/Products/Daal_Puri.png', price: 9.99, purchaseDate: '2023-05-22', rating: 4 },
]

export default function PurchasedItemsPage() {
  const [hoveredItem, setHoveredItem] = useState(null)

  return (
    <CustomerLayout>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#253D4E] text-center">Purchased Items</h1>
        <div className="space-y-4 mb-6">
          {purchasedItems.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 rounded-lg transition-all duration-300 ${
                hoveredItem === item.id ? 'bg-gray-50 shadow-md' : 'bg-transparent'
              } border-b border-gray-200 pb-4 last:border-0 last:mb-0`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link href={`/products/${item.slug}`}>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                    <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md transition-transform duration-300 transform hover:scale-105"
                    />
                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow">
                    <ShoppingBag className="h-4 w-4 text-green-600" />
                    </div>
                </div>
              </Link>
              <div className="flex-1 w-full sm:w-auto">
                <Link href={`/products/${item.slug}`}>
                    <h3 className="font-semibold text-lg text-[#253D4E] hover:text-green-600">{item.name}</h3>
                </Link>
                <p className="text-gray-600 text-sm">Purchased on: {item.purchaseDate}</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(item.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({item.rating})</span>
                </div>
              </div>
              <div className="w-full sm:w-auto sm:text-right">
                <p className="text-[#3BB77E] font-bold text-xl mb-2">${item.price.toFixed(2)}</p>
                <Link href={`/products/${item.slug}`}>
                    <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto bg-white hover:bg-[#3BB77E] text-[#3BB77E] hover:text-white border-[#3BB77E] transition-colors duration-300"
                    >
                    Leave Review
                    </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  )
}
