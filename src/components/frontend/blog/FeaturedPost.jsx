'use client'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight, Share2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export default function FeaturedPost() {
    const featuredPost = {
        id: 'featured-1',
        title: "The Future of Sustainable Meat: Balancing Taste, Health, and Environment",
        excerpt: "Dive into the cutting-edge innovations and practices shaping the future of sustainable meat production. Discover how farmers, scientists, and food technologists are working together to create delicious, healthy, and environmentally-friendly meat products.",
        category: "Sustainability",
        date: "2023-06-25",
        image: "https://techstory.in/wp-content/uploads/2022/11/Blogging.jpg"
    }

    const sharePost = (platform) => {
        let url = '';
        switch (platform) {
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(featuredPost.title)}&url=${encodeURIComponent(`https://yourblog.com/posts/${featuredPost.id}`)}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://yourblog.com/posts/${featuredPost.id}`)}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://yourblog.com/posts/${featuredPost.id}`)}&title=${encodeURIComponent(featuredPost.title)}`;
                break;
        }
        window.open(url, '_blank');
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
        >
            <Card className="overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="md:flex">
                    <div className="md:w-1/2 relative h-64 md:h-auto">
                        <Image
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 z-10">
                            <Badge className="bg-primary text-primary-foreground px-2 py-1 text-sm font-semibold">
                                Featured
                            </Badge>
                        </div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                            <CardHeader className="p-0">
                                <Badge className="mb-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors duration-300">
                                    {featuredPost.category}
                                </Badge>
                                <CardTitle className="text-2xl md:text-3xl font-bold mb-4 text-foreground hover:text-primary transition-colors duration-300">
                                    <Link href={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-muted-foreground mb-4 line-clamp-3 md:line-clamp-4">
                                    {featuredPost.excerpt}
                                </p>
                            </CardContent>
                        </div>
                        <CardFooter className="p-0 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Link href={`/blog/${featuredPost.id}`} passHref>
                                    <Button className="group bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                                        Read More
                                        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Share2 className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => sharePost('twitter')}>
                                            Share on Twitter
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => sharePost('facebook')}>
                                            Share on Facebook
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => sharePost('linkedin')}>
                                            Share on LinkedIn
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardFooter>
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}
