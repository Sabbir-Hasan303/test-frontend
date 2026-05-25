'use client'

import { useState, useMemo } from 'react'
import { Trash2, ShoppingCart, AlertCircle, Search, LayoutGrid, List, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'

export default function WishlistPage() {
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      slug: 'organic-moringa-powder',
      name: "Premium Meat Product 1 Premium Meat Product 1",
      price: 28.85,
      originalPrice: 32.94,
      image: "https://villagemeatagro.com/_next/image?url=%2Fassets%2FProducts%2FDaal_Puri.png&w=1920&q=75",
      rating: 4,
      inStock: true,
      category: "Beef"
    },
    {
      id: 2,
      slug: 'organic-moringa-powder',
      name: "Premium Meat Product 2",
      price: 29.85,
      originalPrice: 33.94,
      image: "https://villagemeatagro.com/_next/image?url=%2Fassets%2FProducts%2FDaal_Puri.png&w=1920&q=75",
      rating: 4,
      inStock: true,
      category: "Chicken"
    },
    {
      id: 3,
      slug: 'organic-moringa-powder',
      name: "Premium Meat Product 3",
      price: 30.85,
      originalPrice: 34.94,
      image: "https://villagemeatagro.com/_next/image?url=%2Fassets%2FProducts%2FDaal_Puri.png&w=1920&q=75",
      rating: 4,
      inStock: false,
      category: "Mutton"
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [sortBy, setSortBy] = useState("name") // name, price, rating

  const removeFromWishlist = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist.",
    })
  }

  const addToCart = (item) => {
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const filteredItems = useMemo(() => {
    return wishlistItems
      .filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'price':
            return a.price - b.price
          case 'rating':
            return b.rating - a.rating
          default:
            return a.name.localeCompare(b.name)
        }
      })
  }, [wishlistItems, searchQuery, sortBy])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-green-800">
              My Wishlist
            </h1>
            <p className="text-gray-600 mt-1">There are {filteredItems.length} products in this list</p>
          </div>
          {wishlistItems.length > 0 && (
            <Button
              variant="outline"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors border-red-200"
              onClick={() => setWishlistItems([])}
            >
              Clear Wishlist
            </Button>
          )}
        </div>

        {wishlistItems.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between p-4 bg-gray-50/50 rounded-lg shadow-sm border border-gray-100">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500 w-full"
              />
            </div>
            <div className="flex gap-2 items-center justify-between sm:justify-end w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-green-200">
                    Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price")}>Price</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>Rating</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${viewMode === 'grid' ? 'bg-green-100 text-green-800' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${viewMode === 'list' ? 'bg-green-100 text-green-800' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16 bg-gray-50/50 rounded-lg shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <AlertCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-green-800">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-4">Browse our products and add items you love to your wishlist!</p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <a href="/shop">Continue Shopping</a>
            </Button>
          </div>
        ) : (
          <>
            {/* Table header for large screens in list view */}
            {viewMode === 'list' && (
              <div className="hidden lg:grid lg:grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 items-center p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-700">Product</div>
                <div className="font-semibold text-gray-700 pl-4">Price</div>
                <div className="font-semibold text-gray-700 text-center">Stock Status</div>
                <div className="font-semibold text-gray-700 text-center">Action</div>
                <div className="font-semibold text-gray-700">Remove</div>
              </div>
            )}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`
                grid gap-4
                ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'}
              `}
            >
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    layout
                    className="w-full"
                  >
                    {viewMode === 'list' ? (
                      // List view
                      <div className="flex flex-col lg:grid lg:grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                        {/* Product */}
                        <div className="flex gap-4 items-start">
                        <Link href={`/products/${item.slug}`}>
                          <div className="w-20 h-20 relative flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              layout="fill"
                              objectFit="contain"
                              className="object-contain w-full h-full"
                            />
                          </div>
                          </Link>
                          <div className="flex-1 min-w-0 lg:max-w-[250px]">
                            <Link href={`/products/${item.slug}`}>
                              <h3 className="font-semibold text-green-800 truncate text-sm md:text-base">{item.name}</h3>
                            </Link>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-3 h-3 ${i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <div className="flex items-baseline gap-2 mt-1 lg:hidden">
                              <span className="text-lg font-bold text-green-600">৳{item.price}</span>
                              <span className="text-sm text-red-400 line-through">৳{item.originalPrice}</span>
                            </div>
                            <div className="mt-1 lg:hidden">
                              {item.inStock ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
                              ) : (
                                <Badge variant="destructive">Out of Stock</Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Price - Hidden on mobile, shown on desktop */}
                        <div className="hidden lg:flex flex-row items-baseline gap-2">
                          <span className="text-lg font-bold text-green-600">৳{item.price}</span>
                          <span className="text-sm text-red-400 line-through">৳{item.originalPrice}</span>
                        </div>

                        {/* Stock Status - Hidden on mobile, shown on desktop */}
                        <div className="hidden lg:flex justify-center item-center">
                          {item.inStock ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 h-fit -ml-6">In Stock</Badge>
                          ) : (
                            <Badge variant="destructive" className="h-fit -ml-6">Out of Stock</Badge>
                          )}
                        </div>

                        <div className='flex gap-2'>
                            {/* Action column */}
                            <div className="flex justify-center w-full">
                                <Button
                                    className="bg-green-600 hover:bg-green-700 w-full lg:w-auto"
                                    disabled={!item.inStock}
                                    onClick={() => addToCart(item)}
                                >
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Add to Cart
                                </Button>
                            </div>

                            {/* Remove buttons */}
                            <div className='lg:hidden'>
                                <div className="flex justify-end">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                                        onClick={() => removeFromWishlist(item.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                            {/* Remove buttons */}
                            <div className='hidden lg:block'>
                                <div className="flex justify-end">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                                        onClick={() => removeFromWishlist(item.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                      </div>
                    ) : (
                      // Grid view (unchanged)
                      <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow duration-300 border-gray-100 bg-white">
                        <CardContent className="p-0">
                        <Link href={`/products/${item.slug}`}>
                          <div className="relative flex items-center justify-center w-full aspect-square">
                            <Image
                              src={item.image}
                              alt={item.name}
                              layout="fill"
                              objectFit="contain"
                              className="transition-transform duration-300 group-hover:scale-105 mx-auto"
                            />
                            {!item.inStock && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <Badge variant="destructive" className="text-xs sm:text-sm">Out of Stock</Badge>
                              </div>
                            )}
                          </div>
                          </Link>
                        </CardContent>
                        <CardFooter className="grid gap-1 sm:gap-2 p-2 sm:p-3">
                          <div className="flex flex-col">
                            <Link href={`/products/${item.slug}`}>
                              <h3 className="font-semibold text-green-800 text-sm md:text-base truncate max-w-[120px] lg:max-w-[210px]">{item.name}</h3>
                            </Link>
                            <span className="text-xs text-gray-500">{item.category}</span>
                          </div>
                          <div className="flex items-baseline gap-1 sm:gap-2">
                            <span className="text-sm sm:text-base font-bold text-green-600">৳{item.price}</span>
                            <span className="text-xs text-red-400 line-through">৳{item.originalPrice}</span>
                          </div>
                          <div className="flex items-center gap-0.5 sm:gap-1">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-3 h-3 ${i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <div className="flex gap-1 sm:gap-2 mt-1 sm:mt-2">
                            <Button
                              className="flex-1 bg-green-600 hover:bg-green-700 text-xs px-2 py-1 h-auto"
                              disabled={!item.inStock}
                              onClick={() => addToCart(item)}
                            >
                              <ShoppingCart className="w-3 h-3 mr-1" />
                              <span className="hidden sm:inline">Add to Cart</span>
                              <span className="sm:hidden">Add</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200 p-1"
                              onClick={() => removeFromWishlist(item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
