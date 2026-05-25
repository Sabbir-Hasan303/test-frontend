"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Linkedin, Twitter } from 'lucide-react'

const team = [
  {
    name: "Shakila Sultana Miti",
    position: "Chairman",
    image: "/assets/about/Team1.jpeg",
    linkedin: "#",
    twitter: "#",
    color: "bg-green-100",
    hoverColor: "hover:bg-green-200"
  },
  {
    name: "MD Sadi",
    position: "MD",
    image: "/assets/about/Team2.png",
    linkedin: "#",
    twitter: "#",
    color: "bg-blue-100",
    hoverColor: "hover:bg-blue-200"
  },
  {
    name: "Sabbir Hasan",
    position: "Developer",
    image: "/assets/about/Team3.jpeg",
    linkedin: "#",
    twitter: "#",
    color: "bg-yellow-100",
    hoverColor: "hover:bg-yellow-200"
  },
  {
    name: "Tamzid Sam",
    position: "Developer",
    image: "/assets/about/Team4.jpeg",
    linkedin: "#",
    twitter: "#",
    color: "bg-purple-100",
    hoverColor: "hover:bg-purple-200"
  }
]

export function Team() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Meet Our Leadership Team
          </h2>
          <p className="text-lg text-gray-600">
            Our experienced team is dedicated to delivering excellence in every aspect of our operations.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`${member.color} rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${member.hoverColor}`}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1 transition-colors duration-300 group-hover:text-green-600">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-4">{member.position}</p>
                <div className="flex space-x-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

