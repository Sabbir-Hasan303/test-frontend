"use client"

import {motion} from "framer-motion"
import {Clock, MapPin, Phone} from 'lucide-react'

const contactItems = [
    {
        icon      : MapPin,
        title     : "Head Office",
        content   : "90/1, City Centre, Suit-D-1,\n24th Floor (Lift-25),\nMotijheel C/A, Dhaka-1000",
        color     : "bg-green-100",
        hoverColor: "hover:bg-green-200"
    },
    {
        icon      : MapPin,
        title     : "Factory",
        content   : "Kasoba, Gotti, Rahutpara,\nShaltha, Faridpur",
        color     : "bg-blue-100",
        hoverColor: "hover:bg-blue-200"
    },
    {
        icon      : Phone,
        title     : "Contact",
        content   : "Hotline:\n+880 1744 967018\ninfo@villagemeatagro.com",
        color     : "bg-yellow-100",
        hoverColor: "hover:bg-yellow-200"
    },
    {
        icon      : Clock,
        title     : "Business Hours",
        content   : "Monday - Friday:\n9:00 AM - 6:00 PM\nSaturday - Sunday:\n10:00 AM - 4:00 PM",
        color     : "bg-purple-100",
        hoverColor: "hover:bg-purple-200"
    }
]

export function ContactInfo() {
    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6}} className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Get in Touch </h2>
                    <p className="text-lg text-gray-600">
                        We'd love to hear from you. Contact us for any inquiries or support. </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {contactItems.map((item, index) => (
                        <motion.div key={item.title} initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6, delay: index * 0.1}} className={`${item.color} p-6 rounded-lg shadow-lg transition-all duration-300 ${item.hoverColor} hover:shadow-xl hover:-translate-y-2`}>
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                                <item.icon className="w-6 h-6 text-green-600"/>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600 whitespace-pre-line">
                                {item.content}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

