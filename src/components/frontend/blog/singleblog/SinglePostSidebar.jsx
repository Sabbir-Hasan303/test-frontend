'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const recentPosts = [
    { id: 1, title: "The Impact of Sustainable Farming on Meat Quality", date: "2023-06-15", image: "https://www.redcrowmarketing.com/wp-content/uploads/2023/05/iStock-887987150-1024x683.jpg", slug: "impact-sustainable-farming-meat-quality" },
    { id: 2, title: "Organic vs. Conventional: A Taste Comparison", date: "2023-06-10", image: "https://techstory.in/wp-content/uploads/2022/11/Blogging.jpg", slug: "organic-vs-conventional-taste-comparison" },
    { id: 3, title: "The Rise of Plant-Based Alternatives in the Meat Industry", date: "2023-06-05", image: "https://www.redcrowmarketing.com/wp-content/uploads/2023/05/iStock-887987150-1024x683.jpg", slug: "rise-plant-based-alternatives-meat-industry" },
    { id: 4, title: "Farm-to-Table: Tracing Your Meat's Journey", date: "2023-05-30", image: "https://techstory.in/wp-content/uploads/2022/11/Blogging.jpg", slug: "farm-to-table-tracing-meat-journey" },
    { id: 5, title: "Healthy Meat Choices for a Balanced Diet", date: "2023-05-25", image: "https://www.redcrowmarketing.com/wp-content/uploads/2023/05/iStock-887987150-1024x683.jpg", slug: "healthy-meat-choices-balanced-diet" },
]

export default function SinglePostSidebar() {
    const [email, setEmail] = useState('')
    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY
            setIsSticky(offset > 100) // Adjust this value based on when you want the sidebar to become sticky
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the email to your backend
        console.log('Submitted email:', email)
        setEmail('')
    }

    return (
        <div className={`space-y-8 ${isSticky ? 'sticky top-4' : ''}`}>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Posts</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {recentPosts.map((post) => (
                            <motion.li
                                key={post.id}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="group"
                            >
                                <Link href={`/blog/${post.slug}`} className="flex items-center space-x-4 p-2 rounded-lg transition-colors duration-300 hover:bg-green-50">
                                    <div className="relative w-16 h-16 overflow-hidden rounded-md">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm text-gray-800 group-hover:text-green-600 transition-colors duration-300">{post.title}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Newsletter</CardTitle>
                </CardHeader>
                <CardContent>
                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="pr-10 rounded-full border-2 border-green-300 focus:border-green-500 transition-colors duration-300"
                            />
                            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        <Button
                            type="submit"
                            className="w-full rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-300"
                        >
                            Subscribe
                        </Button>
                    </motion.form>
                    <p className="text-sm text-gray-500 mt-2">Join our newsletter for the latest in sustainable and healthy meat choices.</p>
                </CardContent>
            </Card>
        </div>
    )
}
