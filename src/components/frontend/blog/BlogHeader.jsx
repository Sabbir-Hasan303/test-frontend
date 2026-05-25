'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Leaf, Cpu } from 'lucide-react'

export default function BlogHeader() {
    return (
        <header className="relative bg-gradient-to-r from-green-900 to-blue-900 py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <Image
                    src="https://nfcacademy.org/wp-content/uploads/2023/07/pleasing-blog-banner-design-on-blog-banner-of-blog-banner-design.jpg"
                    alt="Sustainable Farm Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                        VMAI Blog
                    </h1>
                    <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
                        Where Sustainable Farming Meets Cutting-Edge Technology
                    </p>
                    <div className="flex justify-center items-center space-x-8">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="bg-green-500 p-4 rounded-full mb-2">
                                <Leaf className="h-8 w-8 text-white" />
                            </div>
                            <span className="text-white font-semibold">Sustainable Practices</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="bg-blue-500 p-4 rounded-full mb-2">
                                <Cpu className="h-8 w-8 text-white" />
                            </div>
                            <span className="text-white font-semibold">Innovative Tech</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </header>
    )
}
