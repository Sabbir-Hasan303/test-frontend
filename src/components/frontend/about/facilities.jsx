"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Factory, Truck, Users, ShieldCheck } from 'lucide-react'

const features = [
  {
    icon: Factory,
    title: "Modern Processing Facility",
    description: "State-of-the-art equipment and technology for meat processing"
  },
  {
    icon: Truck,
    title: "Efficient Distribution",
    description: "Quick and reliable delivery network across Bangladesh"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Skilled professionals ensuring quality at every step"
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Strict quality control and food safety measures"
  }
]

export function Facilities() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Facilities
          </h2>
          <p className="text-lg text-gray-600">
            Equipped with modern technology and staffed by skilled professionals,
            our facilities maintain the highest standards of quality and hygiene.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="/assets/about/processing1.jpg"
              alt="Our processing facility"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 bg-gray-50 rounded-lg"
              >
                <feature.icon className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[300px] rounded-lg overflow-hidden"
          >
            <Image
              src="/assets/about/processing2.jpg"
              alt="Facility interior"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[300px] rounded-lg overflow-hidden"
          >
            <Image
              src="/assets/about/processing3.png"
              alt="Quality control"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative h-[300px] rounded-lg overflow-hidden"
          >
            <Image
              src="/assets/about/processing4.png"
              alt="Distribution center"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

