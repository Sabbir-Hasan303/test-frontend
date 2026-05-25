'use client'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Share2, Twitter, Facebook, Linkedin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const blogPosts = [
    {
        id: 1,
        title: "Top 10 Sustainable Farming Practices for Quality Meat",
        excerpt: "Discover how sustainable farming improves meat quality and environmental impact",
        category: "Sustainable Farming",
        date: "2023-06-20",
        image: "https://techstory.in/wp-content/uploads/2022/11/Blogging.jpg"
    },
    {
        id: 2,
        title: "The Benefits of Grass-Fed Beef",
        excerpt: "Understanding the nutritional advantages of grass-fed over grain-fed beef",
        category: "Nutrition",
        date: "2023-06-18",
        image: "https://techstory.in/wp-content/uploads/2022/11/Blogging.jpg"
    },
    {
        id: 3,
        title: "Farm-to-Table: Tracing Your Meat's Journey",
        excerpt: "How technology is enabling transparency in the meat supply chain",
        category: "Technology",
        date: "2023-06-15",
        image: "https://techstory.in/wp-content/uploads/2022/11/Blogging.jpg"
    },
    {
        id: 4,
        title: "Organic Meat: What You Need to Know",
        excerpt: "Debunking myths and understanding the true benefits of organic meat",
        category: "Organic",
        date: "2023-06-12",
        image: "https://techstory.in/wp-content/uploads/2022/11/Blogging.jpg"
    },
    {
        id: 5,
        title: "The Ethics of Meat Consumption in the Modern World",
        excerpt: "Exploring the ethical considerations of meat production and consumption",
        category: "Ethics",
        date: "2023-06-10",
        image: "https://techstory.in/wp-content/uploads/2022/11/Blogging.jpg"
    },
    {
        id: 6,
        title: "Sustainable Packaging in the Meat Industry",
        excerpt: "How eco-friendly packaging is revolutionizing meat distribution",
        category: "Sustainability",
        date: "2023-06-08",
        image: "https://techstory.in/wp-content/uploads/2022/11/Blogging.jpg"
    },
]

const categoryColors = {
    "Sustainable Farming": "bg-green-500",
    "Nutrition": "bg-blue-500",
    "Technology": "bg-purple-500",
    "Organic": "bg-yellow-500",
    "Ethics": "bg-red-500",
    "Sustainability": "bg-teal-500"
}

export default function BlogGrid() {
    const [hoveredPost, setHoveredPost] = useState(null)

    const sharePost = (platform, post) => {
        let url = '';
        switch (platform) {
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://yourblog.com/posts/${post.id}`)}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://yourblog.com/posts/${post.id}`)}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://yourblog.com/posts/${post.id}`)}&title=${encodeURIComponent(post.title)}`;
                break;
        }
        window.open(url, '_blank');
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
                <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <Card
                        className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                        onMouseEnter={() => setHoveredPost(post.id)}
                        onMouseLeave={() => setHoveredPost(null)}
                    >
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={post.image}
                                alt={post.title}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                            <div className="absolute top-2 left-2">
                                <Badge className={`${categoryColors[post.category]} text-white px-2 py-1 text-xs font-semibold rounded`}>
                                    {post.category}
                                </Badge>
                            </div>
                        </div>
                        <CardHeader className="flex-grow">
                            <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300">
                                <Link href={`/blog/${post.id}`}>{post.title}</Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-1 hover:bg-transparent"
                                >
                                    <Share2 className="h-4 w-4" />
                                </Button>
                                {hoveredPost === post.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 bottom-full mb-2 bg-white shadow-lg rounded-md py-2 px-3 flex space-x-3"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="p-1 hover:bg-blue-100 transition-colors duration-200"
                                            onClick={() => sharePost('twitter', post)}
                                        >
                                            <Twitter className="h-4 w-4 text-blue-400" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="p-1 hover:bg-blue-100 transition-colors duration-200"
                                            onClick={() => sharePost('facebook', post)}
                                        >
                                            <Facebook className="h-4 w-4 text-blue-600" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="p-1 hover:bg-blue-100 transition-colors duration-200"
                                            onClick={() => sharePost('linkedin', post)}
                                        >
                                            <Linkedin className="h-4 w-4 text-blue-700" />
                                        </Button>
                                    </motion.div>
                                )}
                            </div>
                        </CardFooter>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}
