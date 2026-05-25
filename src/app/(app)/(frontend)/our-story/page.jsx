import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
    title: "Our Story | Village Meat Agro",
    description: "Village Meat Agro is a company that provides quality meat products to its customers.",
}

const values = [
    {
        icon: '🌱',
        title: 'Sustainability',
        description: 'We believe in creating products that are good for you and the planet.'
    },
    {
        icon: '🤝',
        title: 'Community',
        description: 'Our customers are at the heart of everything we do. We grow together.'
    },
    {
        icon: '💡',
        title: 'Innovation',
        description: 'We\'re always looking for new ways to improve and bring you the best.'
    },
    {
        icon: '✨',
        title: 'Quality',
        description: 'We never compromise on the quality of our products or service.'
    },
    {
        icon: '🌍',
        title: 'Global Impact',
        description: 'We strive to make a positive difference in communities around the world.'
    },
    {
        icon: '🔄',
        title: 'Adaptability',
        description: 'We embrace change and evolve to meet the needs of our customers.'
    },
]

export default function OurStory() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh]">
                <Image
                    src="https://lh3.googleusercontent.com/p/AF1QipPKJsIjjZIkGwErblY_L5FJEBBxvcWeMV9XKBrZ=s680-w680-h510"
                    alt="Our story hero image"
                    fill={true}
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Our Story</h1>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                            From humble beginnings to a thriving community, discover the passion behind our brand.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Journey Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16 container mx-auto">
                <div className="space-y-6 text-lg text-gray-700 first:mt-0">
                    <p>
                        Our story began in 2010 with a simple yet powerful vision: to create sustainable, high-quality products that would make a difference in people's lives. What started as a small operation in a garage has blossomed into a thriving community of like-minded individuals passionate about quality and sustainability.
                    </p>
                    <p>
                        In 2015, we took a leap of faith and opened our first physical store. It was more than just a retail space; it became a hub for our growing community. Here, we didn't just sell products; we shared stories, ideas, and a common vision for a better future. Our loyal customers became our biggest advocates, spreading the word about our mission and products.
                    </p>
                    <p>
                        The digital revolution of 2020 presented both challenges and opportunities. Embracing change, we launched our e-commerce platform, bringing our carefully crafted products to customers nationwide. This move allowed us to connect with even more people who shared our values, expanding our community beyond geographical boundaries.
                    </p>
                    <p>
                        Today, in 2023, we're proud to serve a global community. Our journey has been one of constant innovation, learning, and growth. We've stayed true to our original vision while adapting to the changing needs of our customers and the planet. Every product we create, every decision we make, is a reflection of our commitment to quality, sustainability, and positive impact.
                    </p>
                    <p>
                        As we look to the future, we're excited about the possibilities that lie ahead. Our journey continues, driven by the same passion that sparked our beginnings, and fueled by the amazing community that has grown with us along the way. We invite you to be part of our ongoing story, as we work together to create a better, more sustainable world.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-gradient-to-r from-[#faf5f2] to-blue-50 py-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800">What Drives Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <Card key={index} className="bg-white border-green-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-6 text-center">
                                    <div className="text-4xl mb-4">{value.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2 text-green-700">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto bg-gradient-to-b from-white to-red-50">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800">Our Growth in Pictures</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                        {
                            src: "/assets/about/about_vmai.jpg",
                            alt: "Description of image 1"
                        },
                        {
                            src: "/assets/about/about_vmai.jpg",
                            alt: "Description of image 2"
                        },
                        {
                            src: "/assets/about/about_vmai.jpg",
                            alt: "Description of image 3"
                        },
                        {
                            src: "/assets/about/about_vmai.jpg",
                            alt: "Description of image 4"
                        },
                        {
                            src: "/assets/about/about_vmai.jpg",
                            alt: "Description of image 5"
                        },
                        {
                            src: "/assets/about/about_vmai.jpg",
                            alt: "Description of image 6"
                        },
                        {
                            src: "/assets/about/about_vmai.jpg",
                            alt: "Description of image 7"
                        },
                        {
                            src: "/assets/about/about_vmai.jpg",
                            alt: "Description of image 8"
                        },
                    ].map((image, index) => (
                        <div key={index} className="aspect-square relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill={true}
                                className="object-cover transition-transform duration-300 hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-red-700 text-white py-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Be Part of Our Story</h2>
                    <p className="text-xl mb-8">
                        Join our community and experience the quality products that have been at the heart of our journey.
                    </p>
                    <Button asChild size="lg" className="bg-white text-red-700 hover:bg-green-100 transition-colors duration-300">
                        <Link href="/shop">Shop Now</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
