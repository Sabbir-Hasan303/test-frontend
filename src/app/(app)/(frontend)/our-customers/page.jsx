import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const metadata = {
    title: "Our Customers | Village Meat Agro",
    description: "Village Meat Agro is a company that provides quality meat products to its customers.",
}

const testimonials = [
    {
        name: "Sarah Johnson",
        location: "New York, NY",
        quote: "VMAI's products have transformed my daily routine. The quality is unmatched!",
        avatar: "/placeholder.svg?height=100&width=100&text=SJ"
    },
    {
        name: "Michael Chen",
        location: "San Francisco, CA",
        quote: "I love how VMAI combines sustainability with innovation. It's the future of consumer goods.",
        avatar: "/placeholder.svg?height=100&width=100&text=MC"
    },
    {
        name: "Emily Rodriguez",
        location: "Miami, FL",
        quote: "The customer service at VMAI is exceptional. They truly care about their customers.",
        avatar: "/placeholder.svg?height=100&width=100&text=ER"
    },
    {
        name: "David Kim",
        location: "Chicago, IL",
        quote: "VMAI's commitment to quality is evident in every product. I'm a customer for life!",
        avatar: "/placeholder.svg?height=100&width=100&text=DK"
    },
    {
        name: "Laura Thompson",
        location: "Seattle, WA",
        quote: "I appreciate how VMAI is always innovating and bringing new, exciting products to the market.",
        avatar: "/placeholder.svg?height=100&width=100&text=LT"
    },
    {
        name: "Alex Patel",
        location: "Austin, TX",
        quote: "VMAI's products have made my life easier and more environmentally friendly. Win-win!",
        avatar: "/placeholder.svg?height=100&width=100&text=AP"
    }
];

export default function OurCustomers() {
    return (
        <div className="min-h-screen">
            {/* Testimonials Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-indigo-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-800">What Our Customers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="bg-white border-indigo-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <Avatar className="h-12 w-12 mr-4">
                                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                                            <p className="text-sm text-gray-500">{testimonial.location}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>


            {/* Join Our Community Section */}
            <section className="bg-red-700 text-white py-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
                    <p className="text-xl mb-8">
                        Become part of our growing family of satisfied customers and experience the difference for yourself.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild size="lg" className="bg-white text-red-700 hover:bg-green-100 transition-colors duration-300">
                            <Link href="/shop">Shop Now</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-red-600 transition-colors duration-300">
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

