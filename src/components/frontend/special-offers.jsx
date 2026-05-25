"use client"

import Image from "next/image"
import {ShoppingCart, Star} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"
import Link from "next/link"

const products = [
    {
        id           : 1,
        slug: 'organic-moringa-powder',
        title        : "Chicken Burger Patty",
        image        : "/assets/Products/Chicken_Burger_Patty.jpg",
        price        : 54.85,
        originalPrice: 56.8,
        rating       : 4.0,
        reviews      : 42,
        category     : "Meat Products",
        seller       : "FreshMeat"
    },
    {
        id           : 2,
        slug: 'organic-moringa-powder',
        title        : "Chicken Nuggets",
        image        : "/assets/Products/Chicken_Nuggets.jpg",
        price        : 32.85,
        originalPrice: 33.8,
        rating       : 4.0,
        reviews      : 38,
        category     : "Snacks",
        seller       : "MeatCraft"
    },
    {
        id           : 3,
        slug: 'organic-moringa-powder',
        title        : "Chicken Shami Kabab",
        image        : "/assets/Products/Chicken_Shami_Kabab.jpg",
        price        : 35.85,
        originalPrice: 37.8,
        rating       : 4.0,
        reviews      : 45,
        category     : "Fresh Meat",
        seller       : "FarmFresh"
    }
]

function ProductCard({product}) {
    return (
        <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
            <Link href={`/products/${product.slug}`}>
                <Image src={product.image} alt={product.title} fill className="object-cover transform transition-transform duration-300 group-hover:scale-105"/>
            </Link>
            </div>
            <div className="p-4 space-y-2">
                <p className="text-xs text-gray-500">{product.category}</p>
                <Link href={`/products/${product.slug}`}>
                <h3 className="font-medium text-sm md:text-lg line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] group-hover:text-green-600 transition-colors">
                    {product.title}
                </h3>
                </Link>
                <div className="flex items-center gap-1">
                    <div className="flex">
                        {Array.from({length: 5}).map((_, i) => (
                            <Star key={i} className={cn(
                                "h-3 w-3 sm:h-4 sm:w-4",
                                i < Math.floor(product.rating) ? "text-[#FDC040] fill-[#FDC040]" : "text-gray-200"
                            )}/>
                        ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <span className="text-base sm:text-lg font-bold text-green-600">৳{product.price.toFixed(2)}</span>
                        <span className="text-xs sm:text-sm text-red-500 line-through">৳{product.originalPrice.toFixed(2)}</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-50 hover:bg-green-600 text-green-600 hover:text-white border-green-600">
                        <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

// /**
//  * @param {{
//  *   title: string,
//  *   description: string,
//  *   image: string,
//  *   position: "left"|"right"
//  * }} props
//  */
function Banner({title, description, image}) {
    return (
        <div className="relative h-full overflow-hidden rounded-lg">
            <Image src={image} alt={title} fill className="object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
            <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="mb-4 text-white/90">{description}</p>
                <Button className="bg-white text-green-600 hover:bg-green-600 hover:text-white transition-colors"> Shop Now </Button>
            </div>
        </div>
    )
}

export function SpecialOffers() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Left Banner */}
                    <div className="lg:col-span-1 h-[400px] lg:h-full">
                        <Banner title="Special Savings!" description="Fresh products at unbeatable prices" image="/assets/ads/special_saving.webp" position="left"/>
                    </div>

                    {/* Product Cards */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product}/>
                            ))}
                        </div>
                    </div>

                    {/* Right Banner */}
                    <div className="lg:col-span-1 h-[400px] lg:h-full">
                        <Banner title="Daily Necessities" description="Essential items for your kitchen" image="https://github.com/Sabbir-Hasan303/Sabbir-s-Blog/blob/main/images/VMAI%20Images/Ads%20Banner.jpg?raw=true" position="right"/>
                    </div>
                </div>
            </div>
        </section>
    )
}

