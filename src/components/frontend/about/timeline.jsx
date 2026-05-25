"use client"

import { motion } from "framer-motion"

const milestones = [
  {
    year: "2015",
    title: "Company Founded",
    description: "Village Meat Agro Industries Ltd. was established with a vision to revolutionize the meat industry.",
    color: "bg-green-100 border-green-500"
  },
  {
    year: "2017",
    title: "Factory Establishment",
    description: "State-of-the-art processing facility opened in Faridpur.",
    color: "bg-blue-100 border-blue-500"
  },
  {
    year: "2019",
    title: "Market Expansion",
    description: "Expanded operations across major cities in Bangladesh.",
    color: "bg-purple-100 border-purple-500"
  },
  {
    year: "2021",
    title: "Quality Certification",
    description: "Received international quality certifications for our processes.",
    color: "bg-yellow-100 border-yellow-500"
  },
  {
    year: "2023",
    title: "Digital Transformation",
    description: "Launched online ordering system and modernized operations.",
    color: "bg-red-100 border-red-500"
  }
]

export function Timeline() {
  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-12"
        >
          Our Journey
        </motion.h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200" />

          {/* Timeline items */}
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex flex-col md:flex-row items-center"
              >
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8 md:ml-auto"}`}>
                  <div className={`${milestone.color} p-4 md:p-6 rounded-lg shadow-md max-w-md mx-auto md:mx-0 border-l-4 transition-all duration-300 hover:shadow-xl hover:scale-105`}>
                    <div className="text-green-600 font-bold text-lg md:text-xl mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                <div className={`absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 ${milestone.color.replace('bg-', 'bg-')} rounded-full border-4 border-white transition-all duration-300 hover:scale-150`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

