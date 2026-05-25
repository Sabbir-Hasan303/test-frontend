import { CustomerLayout } from "@/components/frontend/customer/customer-layout"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ShoppingCart, Trash2 } from 'lucide-react'
import Link from "next/link"

const wishlistItems = [
  { id: '1', slug: 'organic-moringa-powder', name: 'Organic Avocado', image: '/assets/Products/Chicken_Wings.jpg', price: 4.99 },
  { id: '2', slug: 'organic-moringa-powder', name: 'Fresh Strawberries', image: '/assets/Products/Chicken_Momo.jpg', price: 3.99 },
  { id: '3', slug: 'organic-moringa-powder', name: 'Organic Free-Range Chicken Breast', image: '/assets/Products/Daal_Puri.png', price: 9.99 },
]

export default function WishlistsPage() {
  return (
    <CustomerLayout>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <h1 className="text-2xl font-semibold mb-6 text-[#253D4E]">My Wishlists</h1>
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 border-b pb-4 hover:bg-gray-50 transition-all duration-300 rounded-lg p-4">
              <Link href={`/products/${item.slug}`}>
                <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md transition-transform duration-300 hover:scale-105"
                    />
                </div>
              </Link>
              <div className="flex-grow">
                <Link href={`/products/${item.slug}`}>
                    <h3 className="font-semibold text-lg mb-1 hover:text-green-600">{item.name}</h3>
                </Link>
                <p className="text-[#3BB77E] font-semibold">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex space-x-2 w-full sm:w-auto justify-end">
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-[#3BB77E] hover:text-white transition-colors duration-300"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Add to cart</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-red-500 hover:text-white transition-colors duration-300"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  )
}
