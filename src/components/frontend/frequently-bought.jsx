"use client"

import {Eye, Heart, ShoppingCart, Star} from 'lucide-react'
import Image from "next/image"
import {useState} from "react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {QuickViewModal} from "./quick-view-modal"
import Link from 'next/link'

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} title
 * @property {string} image
 * @property {number} price
 * @property {number} originalPrice
 * @property {number} rating
 * @property {number} reviews
 * @property {string} brand
 * @property {string} category
 * @property {string} seller
 * @property {{text: string, variant: 'hot'|'sale'}} [badge]
 */

/** @type {Product[]} */
const products = [
    {
        id           : 1,
        slug: 'organic-moringa-powder',
        title        : "Chicken Mini Samosa",
        image        : "/assets/Products/Chicken_Mini_Samosa.jpg",
        price        : 54.85,
        originalPrice: 55.8,
        rating       : 4.0,
        reviews      : 2,
        brand        : "Chobani",
        category     : "Hodo Foods",
        seller       : "NestFood"
    },
    {
        id           : 2,
        slug: 'organic-moringa-powder',
        title        : "Mini Samussa",
        image        : "/assets/Products/Mini_Samussa.png",
        price        : 32.85,
        originalPrice: 33.8,
        rating       : 4.0,
        reviews      : 4,
        brand        : "Canada Dry",
        category     : "Mixers",
        seller       : "NestFood"
    },
    {
        id           : 3,
        slug: 'organic-moringa-powder',
        title        : "Chicken Nuggets",
        image        : "/assets/Products/Chicken_Nuggets.jpg",
        price        : 35.85,
        originalPrice: 37.8,
        rating       : 4.0,
        reviews      : 4,
        brand        : "Encore",
        category     : "Snack",
        seller       : "NestFood",
        badge        : {
            text   : "Sale",
            variant: "sale"
        }
    },
    {
        id           : 4,
        slug: 'organic-moringa-powder',
        title        : "Chicken Burger Patty",
        image        : "/assets/Products/Chicken_Burger_Patty.jpg",
        price        : 23.85,
        originalPrice: 25.8,
        rating       : 4.0,
        reviews      : 4,
        brand        : "Gorton's",
        category     : "Coffee",
        seller       : "Old El Paso",
        badge        : {
            text   : "Hot",
            variant: "hot"
        }
    },
    {
        id           : 5,
        slug: 'organic-moringa-powder',
        title        : "Chicken Shami Kabab",
        image        : "/assets/Products/Chicken_Shami_Kabab.jpg",
        price        : 22.85,
        originalPrice: 24.8,
        rating       : 4.0,
        reviews      : 2,
        brand        : "Haagen-Dazs",
        category     : "Cream",
        seller       : "Tyson"
    }
]

/** @param {{product: Product}} props */
function ProductCard({product}) {
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <>
            <div className="group relative bg-white rounded-[15px] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
                {product.badge && (
                    <Badge className={cn(
                        "absolute top-0 left-0 z-10 rounded-br-[10px] px-3 py-1 text-[12px] font-medium",
                        product.badge.variant === "hot" && "bg-[#F59758] text-white",
                        product.badge.variant === "sale" && "bg-[#67BCEE] text-white"
                    )}>
                        {product.badge.text}
                    </Badge>
                )}
                <div className="relative overflow-hidden aspect-square">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    <div className="absolute right-4 top-4 flex flex-col gap-2">
                        <Button size="icon" variant="outline" className={`h-8 w-8 rounded-full bg-white shadow-md transition-opacity duration-300 ${
                            isFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        } ${isFavorite ? 'text-red-500' : ''}`} onClick={() => setIsFavorite(!isFavorite)}>
                            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`}/>
                        </Button>
                        <Button size="icon" variant="outline" className="h-8 w-8 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => setIsQuickViewOpen(true)}>
                            <Eye className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
                <div className="px-3 py-4 space-y-2">
                    <p className="text-[12px] text-[#adadad] capitalize">{product.category}</p>
                    <Link href={`/products/${product.slug}`}>
                     <h3 className="font-semibold text-[16px] text-[#253D4E] hover:text-green-600 leading-tight line-clamp-2 min-h-[40px]">{product.title}</h3>
                    </Link>
                    <div className="flex items-center gap-1">
                        <div className="flex">
                            {Array.from({length: 5}).map((_, i) => (
                                <Star key={i} className={cn(
                                    "h-4 w-4",
                                    i < Math.floor(product.rating) ? "text-[#FDC040] fill-[#FDC040]" : "text-gray-200"
                                )}/>
                            ))}
                        </div>
                        <span className="text-[12px] text-[#253D4E]">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="text-[18px] font-bold text-green-600">৳{product.price.toFixed(2)}</div>
                            <div className="text-[14px] text-red-500 line-through md:ml-2">৳{product.originalPrice.toFixed(2)}</div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-[#DEF9EC] hover:bg-[#3BB77E] text-[#3BB77E] hover:text-white border-[#3BB77E] rounded-full px-3 h-[34px] text-[13px] font-medium flex items-center gap-1">
                            <ShoppingCart className="h-4 w-4"/><span className="hidden md:block">Add</span>
                        </Button>
                    </div>
                </div>
            </div>

            <QuickViewModal isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} product={product}/>
        </>
    )
}

export function FrequentlyBought() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container">
                <h2 className="text-[32px] font-bold text-[#253D4E] mb-8">Frequently Brought Together</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[15px] md:gap-[30px]">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

