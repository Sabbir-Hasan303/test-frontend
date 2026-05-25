"use client"

import {useCallback, useEffect, useState} from 'react'
import {ChevronLeft, ChevronRight, Eye, Heart, ShoppingCart, Star} from 'lucide-react'
import Image from "next/image"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {QuickViewModal} from "./quick-view-modal"
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'

/**
 * Product object structure:
 * - id: number
 * - title: string
 * - image: string
 * - price: number
 * - originalPrice: number
 * - rating: number
 * - reviews: number
 * - category: 'featured' | 'popular' | 'new'
 * - points: number
 * - badge: { text: string, variant: 'hot' | 'sale' | 'new' | 'best' } (optional)
 */

const allProducts = [
    {
        id           : 1,
        slug: 'organic-moringa-powder',
        title        : "Chicken Popcorn",
        image        : "/assets/Products/Chicken_Popcorn.jpg",
        price        : 238.85,
        originalPrice: 245.8,
        rating       : 4.0,
        reviews      : 4,
        category     : 'featured',
        points       : 90,
        badge        : {
            text   : "Save 15%",
            variant: "sale"
        }
    },
    {
        id           : 2,
        slug: 'organic-moringa-powder',
        title        : "Meat Ball",
        image        : "/assets/Products/Meat_Ball.png",
        price        : 238.85,
        originalPrice: 245.8,
        rating       : 4.0,
        reviews      : 4,
        category     : 'popular',
        points       : 90,
        badge        : {
            text   : "Save 25%",
            variant: "sale"
        }
    },
    {
        id           : 3,
        slug: 'organic-moringa-powder',
        title        : "Chicken Strips",
        image        : "/assets/Products/Chicken_Strips.jpg",
        price        : 238.85,
        originalPrice: 245.8,
        rating       : 4.0,
        reviews      : 4,
        category     : 'new',
        points       : 90,
        badge        : {
            text   : "New",
            variant: "new"
        }
    },
    {
        id           : 4,
        slug: 'organic-moringa-powder',
        title        : "Chicken Nuggets",
        image        : "/assets/Products/Nuggets.png",
        price        : 238.85,
        originalPrice: 245.8,
        rating       : 4.0,
        reviews      : 4,
        category     : 'featured',
        points       : 90,
        badge        : {
            text   : "Best sale",
            variant: "best"
        }
    },
    {
        id           : 5,
        slug: 'organic-moringa-powder',
        title        : "Chicken Momo",
        image        : "/assets/Products/Chicken_Momo.jpg",
        price        : 238.85,
        originalPrice: 245.8,
        rating       : 4.0,
        reviews      : 4,
        category     : 'popular',
        points       : 90,
        badge        : {
            text   : "Hot",
            variant: "hot"
        }
    },
    {
        id           : 6,
        slug: 'organic-moringa-powder',
        title        : "Chicken Wings",
        image        : "/assets/Products/Chicken_Wings.jpg",
        price        : 238.85,
        originalPrice: 245.8,
        rating       : 4.0,
        reviews      : 4,
        category     : 'featured',
        points       : 90,
    },
    {
        id           : 7,
        slug: 'organic-moringa-powder',
        title        : "Chicken Mini Samusa",
        image        : "/assets/Products/Mini_Samussa.png",
        price        : 238.85,
        originalPrice: 245.8,
        rating       : 4.0,
        reviews      : 4,
        category     : 'featured',
        points       : 90,
    },
    {
        id           : 8,
        slug: 'organic-moringa-powder',
        title        : "Dal Puri",
        image        : "/assets/Products/Daal_Puri.png",
        price        : 238.85,
        originalPrice: 245.8,
        rating       : 4.0,
        reviews      : 4,
        category     : 'featured',
        points       : 90,
    },
]

const featuredProducts = allProducts.filter(product => product.category === 'featured');
const popularProducts = allProducts.filter(product => product.category === 'popular');
const newProducts = allProducts.filter(product => product.category === 'new');

/** @param {{product: Product}} props */
function ProductCard({product}) {
    const [isFavorite, setIsFavorite] = useState(false)
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

    return (
        <div className="group relative bg-white rounded-lg transition-all duration-300 hover:shadow-lg border border-gray-200 overflow-hidden">
            {product.badge && (
                <Badge className={cn(
                    "absolute top-3 left-3 z-10 px-3 py-1 text-[12px] font-medium",
                    product.badge.variant === "hot" && "bg-red-500 text-white",
                    product.badge.variant === "sale" && "bg-green-500 text-white",
                    product.badge.variant === "new" && "bg-blue-500 text-white",
                    product.badge.variant === "best" && "bg-yellow-500 text-white"
                )}>
                    {product.badge.text}
                </Badge>
            )}
            <div className="relative aspect-square overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"/>
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button size="icon" variant="secondary" className={cn(
                        "h-8 w-8 rounded-full bg-white shadow-md transition-opacity duration-300",
                        isFavorite ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )} onClick={() => setIsFavorite(!isFavorite)}>
                        <Heart className={cn("h-4 w-4", isFavorite ? "fill-red-500 text-red-500" : "text-gray-600")}/>
                    </Button>
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => setIsQuickViewOpen(true)}>
                        <Eye className="h-4 w-4 text-gray-600"/>
                    </Button>
                </div>
            </div>
            <div className="p-4 space-y-2">
                <p className="text-xs text-gray-500 capitalize">{product.category}</p>
                <Link href={`/products/${product.slug}`}>
                    <h3 className="font-semibold text-sm md:text-lg text-gray-800 hover:text-green-600 leading-tight line-clamp-2 h-8">{product.title}</h3>
                </Link>
                <div className="flex items-center gap-1">
                    <div className="flex">
                        {Array.from({length: 5}).map((_, i) => (
                            <Star key={i} className={cn(
                                "h-3 w-3",
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            )}/>
                        ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-lg font-bold text-green-600">৳{product.price.toFixed(2)}</div>
                        <div className="text-sm text-red-500 line-through mt-2">৳{product.originalPrice.toFixed(2)}</div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-green-50 hover:bg-green-600 text-green-600 hover:text-white border-green-200 rounded-full px-3 h-8 text-xs font-medium">
                        <ShoppingCart className="h-3 w-3 mr-1"/><span className="hidden md:block">Add</span>
                    </Button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{width: `${(product.points / 120) * 100}%`}}></div>
                </div>
                <p className="text-xs text-gray-500">Sold: {product.points}/120</p>
            </div>
            <QuickViewModal isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} product={product}/>
        </div>
    )
}

// function CountdownTimer() {
//     const [timeLeft, setTimeLeft] = useState({
//         days   : 2,
//         hours  : 19,
//         minutes: 7,
//         seconds: 18
//     });

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setTimeLeft(prev => {
//                 if (prev.seconds > 0) {
//                     return {...prev, seconds: prev.seconds - 1};
//                 } else if (prev.minutes > 0) {
//                     return {...prev, minutes: prev.minutes - 1, seconds: 59};
//                 } else if (prev.hours > 0) {
//                     return {...prev, hours: prev.hours - 1, minutes: 59, seconds: 59};
//                 } else if (prev.days > 0) {
//                     return {...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59};
//                 }
//                 return prev;
//             });
//         }, 1000);

//         return () => clearInterval(timer);
//     }, []);

//     return (
//         <div className="flex items-center space-x-4">
//             {Object.entries(timeLeft).map(([key, value]) => (
//                 <div key={key} className="flex flex-col items-center">
//                     <div className="text-3xl font-bold text-green-600">{value.toString().padStart(2, '0')}</div>
//                     <div className="text-xs text-gray-500 capitalize">{key}</div>
//                 </div>
//             ))}
//         </div>
//     );
// }

export function DailyBestSells() {
    const [activeTab, setActiveTab] = useState('featured')
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop          : true,
        align         : 'start',
        slidesToScroll: 1,
        breakpoints   : {
            '(min-width: 1280px)': {slidesToScroll: 4},
            '(min-width: 1024px)': {slidesToScroll: 3},
            '(min-width: 768px)' : {slidesToScroll: 2},
            '(max-width: 767px)' : {slidesToScroll: 1},
        }
    })

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        const interval = setInterval(() => {
            emblaApi.scrollNext()
        }, 5000)
        return () => clearInterval(interval)
    }, [emblaApi])

    const products = activeTab === 'featured' ? featuredProducts :
                     activeTab === 'popular' ? popularProducts :
                     newProducts

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
                    <div className="mb-6 lg:mb-0">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Daily Best Sells</h2>
                        <p className="text-gray-600">Dont miss today's featured deals and best selling products.</p>
                    </div>
                    {/* <CountdownTimer/> */}
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/3 p-6 flex flex-col justify-between bg-gradient-to-br from-green-400 to-blue-500 text-white">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Fresh Organic Products</h3>
                                <p className="mb-6">Get up to 25% off on your first order. Limited time offer!</p>
                                <Link href="/shop">
                                    <Button className="bg-white text-green-600 hover:bg-gray-100">Shop Now</Button>
                                </Link>
                            </div>
                            <Image src="https://github.com/Sabbir-Hasan303/Sabbir-s-Blog/blob/main/images/VMAI%20Images/Daily%20Best.jpeg?raw=true" alt="Fresh Organic Products" width={300} height={300} className="mt-6 mx-auto"/>
                        </div>
                        <div className="lg:w-2/3 p-6">
                            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="mb-6">
                                <TabsList className="bg-gray-100 p-1 rounded-full">
                                    <TabsTrigger value="featured" className="rounded-full px-4 py-2 text-sm">Featured</TabsTrigger>
                                    <TabsTrigger value="popular" className="rounded-full px-4 py-2 text-sm">Popular</TabsTrigger>
                                    <TabsTrigger value="new" className="rounded-full px-4 py-2 text-sm">New Added</TabsTrigger>
                                </TabsList>
                            </Tabs>

                            <div className="overflow-hidden" ref={emblaRef}>
                                <div className="flex">
                                    {products.map((product) => (
                                        <div key={product.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%] xl:flex-[0_0_25%] px-3">
                                            <ProductCard product={product}/>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center mt-8 space-x-4">
                                <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full border-gray-300 hover:bg-green-50 hover:text-green-600 w-10 h-10" aria-label="Previous slide">
                                    <ChevronLeft className="h-5 w-5"/>
                                </Button>
                                <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full border-gray-300 hover:bg-green-50 hover:text-green-600 w-10 h-10" aria-label="Next slide">
                                    <ChevronRight className="h-5 w-5"/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

