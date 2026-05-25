"use client"

import {useState} from 'react'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {toast} from "@/hooks/use-toast"
import Image from "next/image"

export function NewsletterSubscription() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the email to your backend

        toast({
            title      : "Subscribed!",
            description: "Thank you for subscribing to our newsletter.",
        })
        setEmail('')
    }

    return (
        <section className="relative overflow-visible">
            <div className="w-full py-16 px-4" style={{
                background: "linear-gradient(135deg, #B22222 0%, #FF6347 50%, #FF4500 100%)",
            }}>
                <div className="container mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 pr-0 lg:pr-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                                Stay home & get your daily needs from our shop </h2>
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl">
                                <Input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12 py-4 px-6 rounded-full bg-white/90 backdrop-blur-sm text-black placeholder:text-gray-500 border-0 flex-1"/>
                                <Button type="submit" className="h-12 px-8 rounded-full bg-[#10b981] hover:bg-[#065f46] text-white font-semibold"> Subscribe </Button>
                            </form>
                        </div>
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                                <div className="absolute inset-0 bg-white rounded-full shadow-xl" />
                                <Image src="https://github.com/Sabbir-Hasan303/Sabbir-s-Blog/blob/main/images/VMAI%20Images/newsletter.png?raw=true" alt="Delivery Person" width={400} height={400} className="relative z-10 scale-125 translate-y-8"/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 translate-x-1/2 translate-y-1/2 rounded-full"></div>
                </div>
            </div>
        </section>
    )
}

