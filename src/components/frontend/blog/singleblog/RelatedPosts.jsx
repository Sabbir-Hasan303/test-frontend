'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'

const relatedPosts = [
    {
        id: 1,
        title: "The Rise of Plant-Based Meat Alternatives",
        excerpt: "Exploring the growing trend of plant-based meats and their impact on the food industry.",
        image: "https://www.redcrowmarketing.com/wp-content/uploads/2023/05/iStock-887987150-1024x683.jpg",
        slug: "rise-of-plant-based-meat-alternatives",
        category: "Trends",
        date: "2023-07-15"
    },
    {
        id: 2,
        title: "Sustainable Farming Practices for Quality Meat Production",
        excerpt: "How modern farming techniques are improving meat quality while reducing environmental impact.",
        image: "https://techstory.in/wp-content/uploads/2022/11/Blogging.jpg",
        slug: "sustainable-farming-practices-for-quality-meat",
        category: "Sustainability",
        date: "2023-07-12"
    },
    {
        id: 3,
        title: "The Ethics of Lab-Grown Meat: A Deep Dive",
        excerpt: "Examining the ethical implications and potential benefits of cultured meat technology.",
        image: "https://www.redcrowmarketing.com/wp-content/uploads/2023/05/iStock-887987150-1024x683.jpg",
        slug: "ethics-of-lab-grown-meat",
        category: "Ethics",
        date: "2023-07-10"
    },
    {
        id: 4,
        title: "Grass-Fed vs. Grain-Fed Beef: A Comprehensive Comparison",
        excerpt: "Analyzing the nutritional differences and environmental impacts of grass-fed and grain-fed beef.",
        image: "https://techstory.in/wp-content/uploads/2022/11/Blogging.jpg",
        slug: "grass-fed-vs-grain-fed-beef-comparison",
        category: "Nutrition",
        date: "2023-07-08"
    },
    {
        id: 5,
        title: "The Future of Meat Packaging: Sustainable Solutions",
        excerpt: "Innovative packaging solutions that are reducing waste in the meat industry.",
        image: "https://www.redcrowmarketing.com/wp-content/uploads/2023/05/iStock-887987150-1024x683.jpg",
        slug: "future-of-meat-packaging-sustainable-solutions",
        category: "Innovation",
        date: "2023-07-05"
    },
    {
        id: 6,
        title: "The Future of Meat Packaging: Sustainable Solutions",
        excerpt: "Innovative packaging solutions that are reducing waste in the meat industry.",
        image: "https://techstory.in/wp-content/uploads/2022/11/Blogging.jpg",
        slug: "future-of-meat-packaging-sustainable-solutions",
        category: "Innovation",
        date: "2023-07-05"
    },
    {
        id: 7,
        title: "The Future of Meat Packaging: Sustainable Solutions",
        excerpt: "Innovative packaging solutions that are reducing waste in the meat industry.",
        image: "https://www.redcrowmarketing.com/wp-content/uploads/2023/05/iStock-887987150-1024x683.jpg",
        slug: "future-of-meat-packaging-sustainable-solutions",
        category: "Innovation",
        date: "2023-07-05"
    },
    {
        id: 8,
        title: "The Future of Meat Packaging: Sustainable Solutions",
        excerpt: "Innovative packaging solutions that are reducing waste in the meat industry.",
        image: "https://techstory.in/wp-content/uploads/2022/11/Blogging.jpg",
        slug: "future-of-meat-packaging-sustainable-solutions",
        category: "Innovation",
        date: "2023-07-05"
    },
    {
        id: 9,
        title: "The Future of Meat Packaging: Sustainable Solutions",
        excerpt: "Innovative packaging solutions that are reducing waste in the meat industry.",
        image: "https://www.redcrowmarketing.com/wp-content/uploads/2023/05/iStock-887987150-1024x683.jpg",
        slug: "future-of-meat-packaging-sustainable-solutions",
        category: "Innovation",
        date: "2023-07-05"
    },
]

export default function RelatedPosts({ currentPostSlug }) {
    // Filter out the current post from related posts
    const filteredPosts = relatedPosts.filter(post => post.slug !== currentPostSlug)

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 1280px)': { slidesToScroll: 5 },
            '(min-width: 1024px)': { slidesToScroll: 4 },
            '(min-width: 768px)': { slidesToScroll: 3 },
            '(min-width: 640px)': { slidesToScroll: 2 },
        }
    })

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
    const scrollNext = () => emblaApi && emblaApi.scrollNext()

    return (
        <section className="mt-16 py-12 px-4">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">Explore Related Topics</h2>
                <div className="relative">
                    <div className="overflow-hidden py-7" ref={emblaRef}>
                        <div className="flex">
                            {filteredPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex-[0_0_100%] md:flex-[0_0_33.333333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] px-1"
                                >
                                    <Card className="h-full overflow-hidden group transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                                        <Link href={`/blog/${post.slug}`}>
                                            <div className="relative h-48 w-full overflow-hidden">
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="group-hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                                                <Badge
                                                    variant="secondary"
                                                    className="absolute top-2 left-2 bg-white text-green-700 font-semibold"
                                                >
                                                    {post.category}
                                                </Badge>
                                            </div>
                                            <CardContent className="p-4">
                                                <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                                                    {post.title}
                                                </h3>
                                                <p className="text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                                </div>
                                            </CardContent>
                                        </Link>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full shadow-md z-10 hover:bg-green-50"
                        onClick={scrollPrev}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full shadow-md z-10 hover:bg-green-50"
                        onClick={scrollNext}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
