"use client"

import { Clock, ShieldCheck, Headphones, CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'

const cards = [
  {
    icon: Clock,
    title: "60 Mins Delivery",
    description: "Free shipping over 400tk",
    color: "bg-gradient-to-br from-purple-400 to-indigo-600",
    iconColor: "text-yellow-300",
  },
  {
    icon: ShieldCheck,
    title: "Authorized Products",
    description: "within 30 days for an exchange",
    color: "bg-gradient-to-br from-green-400 to-teal-600",
    iconColor: "text-white",
  },
  {
    icon: Headphones,
    title: "Customer Service Support",
    description: "9am to 9pm",
    color: "bg-gradient-to-br from-pink-400 to-red-600",
    iconColor: "text-yellow-200",
  },
  {
    icon: CreditCard,
    title: "Flexible Payments",
    description: "Pay with multiple credit cards",
    color: "bg-gradient-to-br from-blue-400 to-indigo-600",
    iconColor: "text-green-300",
  },
]

export function InfoCards() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us?</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl overflow-hidden shadow-lg ${card.color} transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className={`rounded-full p-4 ${card.iconColor} bg-white bg-opacity-20 mb-4`}>
                  <card.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-white">{card.title}</h3>
                <p className="text-white text-opacity-80">{card.description}</p>
              </div>
              <div className="h-2 bg-white bg-opacity-30"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

