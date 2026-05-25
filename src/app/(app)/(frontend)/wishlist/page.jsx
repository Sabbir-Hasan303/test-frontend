import WishlistPage from '@/components/frontend/wishlist'
import React from 'react'

export const metadata = {
    title: "Favourite | Village Meat Agro",
    description: "Village Meat Agro is a company that provides quality meat products to its customers.",
}

export default function Wishlist() {
  return (
    <div>
        <WishlistPage />
    </div>
  )
}
