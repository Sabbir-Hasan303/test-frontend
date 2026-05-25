'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Mail } from 'lucide-react'
import Image from 'next/image'

const recentPosts = [
    { id: 1, title: "The Impact of Sustainable Farming on Meat Quality", date: "2023-06-15", image: "https://www.redcrowmarketing.com/wp-content/uploads/2023/05/iStock-887987150-1024x683.jpg" },
    { id: 2, title: "Organic vs. Conventional: A Taste Comparison", date: "2023-06-10", image: "https://techstory.in/wp-content/uploads/2022/11/Blogging.jpg" },
    { id: 3, title: "The Rise of Plant-Based Alternatives in the Meat Industry", date: "2023-06-05", image: "https://www.redcrowmarketing.com/wp-content/uploads/2023/05/iStock-887987150-1024x683.jpg" },
    { id: 4, title: "Farm-to-Table: Tracing Your Meat's Journey", date: "2023-05-30", image: "https://techstory.in/wp-content/uploads/2022/11/Blogging.jpg" },
    { id: 5, title: "Healthy Meat Choices for a Balanced Diet", date: "2023-05-25", image: "https://www.redcrowmarketing.com/wp-content/uploads/2023/05/iStock-887987150-1024x683.jpg" },
]

const categories = [
    { name: "Sustainable Farming", count: 15, icon: "🌱" },
    { name: "Organic Meat", count: 23, icon: "🥩" },
    { name: "Healthy Recipes", count: 18, icon: "🍳" },
    { name: "Animal Welfare", count: 12, icon: "🐄" },
    { name: "Industry Trends", count: 20, icon: "📈" },
    { name: "Nutrition Facts", count: 17, icon: "🍎" },
]

const tags = [
    "Organic", "Grass-fed", "Sustainable", "Free-range", "Hormone-free",
    "Local", "Ethical", "Nutrition", "Recipes", "Farm-to-table",
    "Animal welfare", "Eco-friendly"
]

export default function Sidebar({ simplified = false }) {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the email to your backend
        // console.log('Submitted email:', email)
        setEmail('')
    }

    if (simplified) {
        return (
            <div className="space-y-8">
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
                                    <a href="#" className="flex items-center space-x-4 p-2 rounded-lg transition-colors duration-300 hover:bg-green-50">
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
                                    </a>
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

    // Return the full sidebar content if not simplified
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Search</CardTitle>
                </CardHeader>
                <CardContent>
                    <motion.form
                        className="relative"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Input
                            type="search"
                            placeholder="Search blog..."
                            className="pr-10 rounded-full border-2 border-green-300 focus:border-green-500 transition-colors duration-300"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-300"
                        >
                            <Search className="h-4 w-4 text-white" />
                        </Button>
                    </motion.form>
                </CardContent>
            </Card>

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
                                <a href="#" className="flex items-center space-x-4 p-2 rounded-lg transition-colors duration-300 hover:bg-green-50">
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
                                </a>
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

            <Card>
                <CardHeader>
                    <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {categories.map((category) => (
                            <motion.li
                                key={category.name}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors duration-300">
                                    <div className="flex items-center space-x-3">
                                        {/* <span className="text-2xl" role="img" aria-label={category.name}>{category.icon}</span> */}
                                        <span className="font-medium text-gray-700">{category.name}</span>
                                    </div>
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        {category.count}
                                    </Badge>
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                    <motion.div
                        className="flex flex-wrap gap-2"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        initial="hidden"
                        animate="show"
                    >
                        {tags.map((tag) => (
                            <motion.div
                                key={tag}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8 },
                                    show: { opacity: 1, scale: 1 }
                                }}
                            >
                                <Badge
                                    variant="outline"
                                    className="bg-white text-green-800 border-green-300 hover:bg-green-50 transition-colors duration-300"
                                >
                                    {tag}
                                </Badge>
                            </motion.div>
                        ))}
                    </motion.div>
                </CardContent>
            </Card>
        </div>
    )
}
