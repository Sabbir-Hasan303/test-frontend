"use client"

import {useCallback, useEffect} from "react"
import {ChevronLeft, ChevronRight} from 'lucide-react'
import Image from "next/image"
import {Button} from "@/components/ui/button"
import useEmblaCarousel from 'embla-carousel-react'
import Link from "next/link"

const trendingProducts = [
    {
        id           : 1,
        slug: 'organic-moringa-powder',
        title        : "Chicken Burger Patty",
        image        : "/assets/Products/Chicken_Burger_Patty.jpg",
        price        : 42.00,
        originalPrice: 45.00,
        category     : "Driedfruit"
    },
    {
        id           : 2,
        slug: 'organic-moringa-powder',
        title        : "Chicken Lollypop",
        image        : "/assets/Products/Chicken_Lollypop.jpg",
        price        : 25.00,
        originalPrice: 30.00,
        category     : "Vegetables"
    },
    {
        id           : 3,
        slug: 'organic-moringa-powder',
        title        : "Chicken Mini Samosa",
        image        : "/assets/Products/Chicken_Mini_Samosa.jpg",
        price        : 62.00,
        originalPrice: 65.00,
        category     : "Coffee"
    },
    {
        id           : 4,
        slug: 'organic-moringa-powder',
        title        : "Chicken Mini Spring Roll",
        image        : "/assets/Products/Chicken_Mini_Spring_Roll.jpg",
        price        : 62.00,
        originalPrice: 65.00,
        category     : "Coffee"
    },
    {
        id           : 5,
        slug: 'organic-moringa-powder',
        title        : "Chicken Momo",
        image        : "/assets/Products/Chicken_Momo.jpg",
        price        : 62.00,
        originalPrice: 65.00,
        category     : "Coffee"
    }
]

const topRatedProducts = [
    {
        id           : 1,
        slug: 'organic-moringa-powder',
        title        : "Chicken Nuggets",
        image        : "/assets/Products/Chicken_Nuggets.jpg",
        price        : 62.00,
        originalPrice: 65.00,
        category     : "Vegetables"
    },
    {
        id           : 2,
        slug: 'organic-moringa-powder',
        title        : "Chicken Popcorn",
        image        : "/assets/Products/Chicken_Popcorn.jpg",
        price        : 56.00,
        originalPrice: 70.00,
        category     : "Driedfruit"
    },
    {
        id           : 3,
        slug: 'organic-moringa-powder',
        title        : "Chicken Shami Kabab",
        image        : "/assets/Products/Chicken_Shami_Kabab.jpg",
        price        : 25.00,
        originalPrice: 30.00,
        category     : "Fruits"
    },
    {
        id           : 4,
        slug: 'organic-moringa-powder',
        title        : "Chicken Strips",
        image        : "/assets/Products/Chicken_Strips.jpg",
        price        : 25.00,
        originalPrice: 30.00,
        category     : "Fruits"
    }
]

const recommendedProducts = [
    {
        id           : 1,
        slug: 'organic-moringa-powder',
        title        : "Chicken Wings",
        image        : "/assets/Products/Chicken_Wings.jpg",
        price        : 42.00,
        originalPrice: 45.00,
        category     : "Vegetables"
    },
    {
        id           : 2,
        slug: 'organic-moringa-powder',
        title        : "Dal Puri",
        image        : "/assets/Products/Dal_Puri.jpg",
        price        : 62.00,
        originalPrice: 65.00,
        category     : "Fruits"
    },
    {
        id           : 3,
        slug: 'organic-moringa-powder',
        title        : "Meat Ball",
        image        : "/assets/Products/Meat_Ball.png",
        price        : 10.00,
        originalPrice: 11.00,
        category     : "Driedfruit"
    },
    {
        id           : 4,
        slug: 'organic-moringa-powder',
        title        : "Paratha",
        image        : "/assets/Products/Paratha.png",
        price        : 10.00,
        originalPrice: 11.00,
        category     : "Driedfruit"
    }
]

function ProductCard({product}) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md group">
            <div className="relative w-20 h-20 overflow-hidden rounded-lg">
            <Link href={`/products/${product.slug}`}>
                <Image src={product.image} alt={product.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-110"/>
            </Link>
            </div>
            <div className="flex-1">
                <p className="text-sm text-gray-500">{product.category}</p>
                <Link href={`/products/${product.slug}`}>
                    <h3 className="font-medium text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors duration-300">{product.title}</h3>
                </Link>
                <div className="flex items-center gap-2 mt-3">
                    <span className="text-green-600 font-semibold">৳{product.price.toFixed(2)}</span>
                    <span className="text-sm text-red-500 line-through">৳{product.originalPrice.toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}


function ProductSection({title, products}) {
    const productGroups = products.reduce((acc, curr, i) => {
        const groupIndex = Math.floor(i / 3)
        if (!acc[groupIndex]) acc[groupIndex] = []
        acc[groupIndex].push(curr)
        return acc
    }, [])

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop          : true,
        align         : 'start',
        slidesToScroll: 1
    })

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        const interval = setInterval(() => {
            emblaApi.scrollNext()
        }, 10000)
        return () => clearInterval(interval)
    }, [emblaApi])

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold group-hover:text-[#3BB77E] transition-colors duration-300">
                    <span className="text-[#3BB77E]">{title.split(' ')[0]}</span>{' '} {title.split(' ').slice(1).join(' ')}
                </h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={scrollPrev} className="h-8 w-8 rounded-lg transition-colors duration-300 hover:bg-[#3BB77E] hover:text-white">
                        <ChevronLeft className="h-4 w-4"/>
                    </Button>
                    <Button variant="outline" size="icon" onClick={scrollNext} className="h-8 w-8 rounded-lg transition-colors duration-300 hover:bg-[#3BB77E] hover:text-white">
                        <ChevronRight className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {productGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="flex-[0_0_100%] min-w-0">
                            <div className="flex flex-col gap-4">
                                {group.map((product) => (
                                    <ProductCard key={product.id} product={product}/>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function TrendingProducts() {
    return (
        <section className="py-12 bg-white">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="relative rounded-2xl overflow-hidden group">
                        <Image src="https://wp.alithemes.com/html/nest/demo/assets/imgs/banner/banner-4.png" alt="Featured Banner" width={400} height={600} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"/>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"/>
                        <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Our Top Most Products Check It Now </h3>
                            <Button className="bg-white text-[#3BB77E] hover:bg-[#3BB77E] hover:text-white transition-colors duration-300"> Shop Now </Button>
                        </div>
                    </div>
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ProductSection title="Trending Items" titleColor="text-[#3BB77E]" products={trendingProducts}/>
                        <ProductSection title="Top Rated" titleColor="text-[#3BB77E]" products={topRatedProducts}/>
                        <ProductSection title="Recommended For You" titleColor="text-[#3BB77E]" products={recommendedProducts}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

