"use client"

import { useState } from "react"
import { ProductCard } from "@/components/frontend/shop/product-card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useCart } from '@/components/frontend/context/cart-context'

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

// Simulating a larger product list
/** @type {Product[]} */
// const allProducts = Array(24).fill(null).map((_, index) => ({
//   id: index + 1,
//   name: `Premium Meat Product ${index + 1}`,
//   price: 28.85 + index,
//   originalPrice: 32.94 + index,
//   image: "/assets/Products/Daal_Puri.png",
//   rating: 5,
//   reviews: 4,
//   isHot: index % 3 === 0
// }))
const allProducts = [
    {
        "id": 1,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 1",
        "price": 28.85,
        "originalPrice": 32.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": true
    },
    {
        "id": 2,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 2",
        "price": 29.85,
        "originalPrice": 33.94,
        "image": "/assets/Products/Meat_Ball.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    },
    {
        "id": 3,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 3",
        "price": 30.85,
        "originalPrice": 34.94,
        "image": "/assets/Products/Mini_Samussa.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    },
    {
        "id": 4,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 4",
        "price": 31.85,
        "originalPrice": 35.94,
        "image": "/assets/Products/Nuggets.png",
        "rating": 5,
        "reviews": 4,
        "isHot": true
    },
    {
        "id": 5,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 5",
        "price": 32.85,
        "originalPrice": 36.94,
        "image": "/assets/Products/Paratha.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    },
    {
        "id": 6,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 6",
        "price": 33.85,
        "originalPrice": 37.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    },
    {
        "id": 7,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 7",
        "price": 34.85,
        "originalPrice": 38.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": true
    },
    {
        "id": 8,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 8",
        "price": 35.85,
        "originalPrice": 39.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    },
    {
        "id": 9,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 9",
        "price": 36.85,
        "originalPrice": 40.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    },
    {
        "id": 10,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 10",
        "price": 37.85,
        "originalPrice": 41.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": true
    },
    {
        "id": 11,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 11",
        "price": 38.85,
        "originalPrice": 42.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    },
    {
        "id": 12,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 12",
        "price": 39.85,
        "originalPrice": 43.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    },
    {
        "id": 13,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 13",
        "price": 40.85,
        "originalPrice": 44.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": true
    },
    {
        "id": 14,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 14",
        "price": 41.85,
        "originalPrice": 45.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    },
    {
        "id": 15,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 15",
        "price": 42.85,
        "originalPrice": 46.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    },
    {
        "id": 16,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 16",
        "price": 43.85,
        "originalPrice": 47.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": true
    },
    {
        "id": 17,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 17",
        "price": 44.85,
        "originalPrice": 48.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    },
    {
        "id": 18,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 18",
        "price": 45.85,
        "originalPrice": 49.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    },
    {
        "id": 19,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 19",
        "price": 46.85,
        "originalPrice": 50.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": true
    },
    {
        "id": 20,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 20",
        "price": 47.85,
        "originalPrice": 51.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    },
    {
        "id": 21,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 21",
        "price": 48.85,
        "originalPrice": 52.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    },
    {
        "id": 22,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 22",
        "price": 49.85,
        "originalPrice": 53.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": true
    },
    {
        "id": 23,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 23",
        "price": 50.85,
        "originalPrice": 54.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    },
    {
        "id": 24,
        "slug": 'organic-moringa-powder',
        "name": "Premium Meat Product 24",
        "price": 51.85,
        "originalPrice": 55.94,
        "image": "/assets/Products/Daal_Puri.png",
        "rating": 5,
        "reviews": 4,
        "isHot": false
    }
]

export function ProductGrid() {
    const [displayedProducts, setDisplayedProducts] = useState(allProducts.slice(0, 12))
    const [page, setPage] = useState(1)
    const { state, dispatch } = useCart()

    const handleAddToCart = (product) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                id: product.id,
                slug:product.slug,
                name: product.name,
                image: product.image,
                price: product.price,
                originalPrice: product.originalPrice,
                quantity: 1
            }
        })
    }

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

    const loadMore = () => {
        const nextPage = page + 1
        const startIndex = displayedProducts.length
        const endIndex = startIndex + 6
        const newProducts = allProducts.slice(startIndex, endIndex)
        setDisplayedProducts([...displayedProducts, ...newProducts])
        setPage(nextPage)
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {displayedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        quantity={state.items.find(item => item.id === product.id)?.quantity || 0}
                        onUpdateQuantity={handleUpdateQuantity}
                    />
                ))}
            </div>
            {displayedProducts.length < allProducts.length && (
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Button
                        onClick={loadMore}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Load More
                    </Button>
                </motion.div>
            )}
        </div>
    )
}

