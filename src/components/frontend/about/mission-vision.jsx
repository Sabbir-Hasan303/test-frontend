"use client"

import { motion } from "framer-motion"
import { Target, Eye, Award } from 'lucide-react'

export function MissionVision() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Our Mission, Vision & Values
          </motion.h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-green-50 p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-green-100"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To provide the highest quality meat products while maintaining strict food safety standards and supporting local communities through sustainable practices.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-blue-50 p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-blue-100"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110">
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become the leading meat processing company in Bangladesh, known for our commitment to quality, innovation, and customer satisfaction.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-yellow-50 p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-yellow-100"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110">
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600">
              Quality, integrity, innovation, and customer focus drive everything we do. We believe in sustainable practices and supporting our local communities.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

