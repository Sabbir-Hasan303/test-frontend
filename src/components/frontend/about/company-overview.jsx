"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function CompanyOverview() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Village Meat Agro
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Village Meat Agro Industries Ltd. is a leading provider of premium quality meat products in Bangladesh. With our state-of-the-art facility in Faridpur and corporate office in Dhaka, we are committed to delivering excellence in every product we offer.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our journey began with a vision to revolutionize the meat industry in Bangladesh by introducing modern processing techniques while maintaining the highest standards of quality and hygiene.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-8 bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
              <div className="text-center transition-all duration-300 hover:transform hover:scale-110">
                <div className="text-4xl font-bold text-green-600 mb-2">10+</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
              <div className="text-center transition-all duration-300 hover:transform hover:scale-110">
                <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center transition-all duration-300 hover:transform hover:scale-110">
                <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="/assets/about/about_vmai.jpg"
              alt="Our facility"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

