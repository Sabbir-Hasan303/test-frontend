"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import Image from "next/image"
// import { Slider } from "@/components/ui/slider"
import { Star } from 'lucide-react'

const categories = [
  { name: "Chicken", count: 5, icon: "https://www.shutterstock.com/image-vector/chicken-meat-icon-vector-illustration-600w-1499172344.jpg" },
  { name: "Beef", count: 7, icon: "https://img.freepik.com/premium-vector/meat-steak-icon-flat-style-white-background_96318-17385.jpg" },
  { name: "Mutton", count: 3, icon: "https://static.vecteezy.com/system/resources/previews/010/348/849/non_2x/mutton-meat-color-icon-illustration-vector.jpg" },
  { name: "Frozen Item", count: 4, icon: "https://cdn-icons-png.flaticon.com/512/5029/5029236.png" },
  { name: "Minced/Processed", count: 6, icon: "https://static.vecteezy.com/system/resources/previews/049/745/201/non_2x/assortment-of-processed-cold-meat-products-on-a-wooden-background-vector.jpg" },
]

const priceRanges = [
  { label: "All prices", value: "all" },
  { label: "$10 - $20", value: "10-20" },
  { label: "$20 - $30", value: "20-30" },
  { label: "$30 and more", value: "30+" },
]

const tags = [
  "Grass-fed",
  "Free-range",
  "Antibiotic-free",
  "Hormone-free",
]

const weights = [
  "250g",
  "500g",
  "1kg",
  "2kg",
]

const newProducts = [
  {
    name: "Premium Ribeye Steak",
    price: 99.50,
    rating: 5,
    image: "https://raw.githubusercontent.com/Sabbir-Hasan303/Sabbir-s-Blog/refs/heads/main/images/VMAI%20Images/Fresh%20Meat-3.png"
  },
  {
    name: "Wagyu Beef Pack",
    price: 89.50,
    rating: 5,
    image: "https://raw.githubusercontent.com/Sabbir-Hasan303/Sabbir-s-Blog/refs/heads/main/images/VMAI%20Images/meat-with-vegetables%201.jpg"
  },
  {
    name: "Organic Chicken",
    price: 25.00,
    rating: 4,
    image: "https://raw.githubusercontent.com/Sabbir-Hasan303/Sabbir-s-Blog/refs/heads/main/images/VMAI%20Images/Fresh%20Meat_5.png"
  }
]

export function FilterSidebar() {

  return (
    <div className="space-y-8">
      {/* Previous sections remain unchanged */}
      {/* Category Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-red-50 to-brown-50 p-6 rounded-2xl shadow-lg border border-red-100"
      >
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b-2 border-red-200 text-red-800">Category</h2>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="flex items-center justify-between p-3 bg-white rounded-xl hover:bg-red-50 transition-all duration-300 cursor-pointer border border-red-100 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full">
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={24}
                    height={24}
                    className="text-red-600"
                  />
                </div>
                <span className="text-gray-700 font-medium">{category.name}</span>
              </div>
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold">
                {category.count}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fill by price Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-green-50 to-brown-50 p-6 rounded-2xl shadow-lg border border-green-100 relative"
      >
        <h2 className="text-xl font-semibold mb-4 text-green-800">Fill by price</h2>
        <div className="space-y-2 mt-4">
          {priceRanges.map((range, index) => (
            <motion.div
              key={range.value}
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Checkbox id={range.value} className="border-green-300" />
              <Label htmlFor={range.value} className="ml-2 text-sm text-gray-600 cursor-pointer hover:text-green-600 transition-all duration-500 hover:translate-x-1">
                {range.label}
              </Label>
            </motion.div>
          ))}
        </div>
        <Image
          src="https://raw.githubusercontent.com/Sabbir-Hasan303/Sabbir-s-Blog/refs/heads/main/images/VMAI%20Images/Fresh%20Meat-3.png"
          alt="Price tag"
          width={100}
          height={100}
          className="absolute bottom-2 right-2 text-green-200"
        />
      </motion.div>

      {/* Free Delivery Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-brown-50 to-green-50 p-6 rounded-2xl shadow-lg border border-brown-100 relative"
      >
        <h2 className="text-xl font-semibold mb-4 text-brown-700">Free Delivery</h2>
        <div className="space-y-2">
          {["Yes", "No"].map((option, index) => (
            <motion.div
              key={option}
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Checkbox id={`eco-friendly-${option.toLowerCase()}`} className="border-brown-300" />
              <Label htmlFor={`eco-friendly-${option.toLowerCase()}`} className="ml-2 text-sm text-gray-600 cursor-pointer hover:text-green-600 transition-all duration-500 hover:translate-x-1">
                {option}
              </Label>
            </motion.div>
          ))}
        </div>
        <Image
          src="https://raw.githubusercontent.com/Sabbir-Hasan303/Sabbir-s-Blog/refs/heads/main/images/VMAI%20Images/meat-with-vegetables%201.jpg"
          alt="Delivery truck"
          width={100}
          height={100}
          className="absolute bottom-2 right-2 text-brown-200 "
        />
      </motion.div>

      {/* Tags Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-green-50 to-red-50 p-6 rounded-2xl shadow-lg border border-green-100"
      >
        <h2 className="text-xl font-semibold mb-4 text-green-800">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.div
              key={tag}
              className="bg-white px-3 py-1 rounded-full text-sm text-gray-600 border border-green-200 cursor-pointer hover:bg-green-100 hover:text-green-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {tag}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Weight Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-brown-50 to-red-50 p-6 rounded-2xl shadow-lg border border-brown-100 relative"
      >
        <h2 className="text-xl font-semibold mb-4 text-brown-700">Weight</h2>
        <div className="space-y-2">
          {weights.map((weight, index) => (
            <motion.div
              key={weight}
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Checkbox id={weight} className="border-brown-300" />
              <Label htmlFor={weight} className="ml-2 text-sm text-gray-600 cursor-pointer hover:text-green-600 transition-all duration-500 hover:translate-x-1">
                {weight}
              </Label>
            </motion.div>
          ))}
        </div>
        <Image
          src="https://raw.githubusercontent.com/Sabbir-Hasan303/Sabbir-s-Blog/refs/heads/main/images/VMAI%20Images/Fresh%20Meat_5.png"
          alt="Weight scale"
          width={100}
          height={100}
          className="absolute bottom-2 right-2 text-red-200"
        />
      </motion.div>

      {/* New Products Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-white to-green-50 p-6 rounded-2xl shadow-lg border border-green-100"
      >
        <h2 className="text-xl font-semibold mb-6 text-green-800 border-b border-green-200 pb-2">
          New Products
        </h2>
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent hover:scrollbar-thumb-green-300">
          {newProducts.map((product, index) => (
            <motion.div
              key={product.name}
              className="flex items-center gap-3 p-2 bg-white rounded-xl hover:bg-green-50 transition-all duration-300 cursor-pointer border border-green-100 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.02, x: 5 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < product.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

