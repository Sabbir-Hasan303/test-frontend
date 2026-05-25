'use client'
import { Card } from '@/components/ui/card'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Dynamically import motion components
const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
)

export function ContactInfo() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl">
        {/* Static content for initial render */}
        <div className="space-y-6">
          {/* Your original static content */}
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl">
      <div className="space-y-6">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-start gap-4"
        >
          <div className="p-2 bg-[#CCFF00]/20 rounded-xl">
            <MapPin className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Location</h3>
            <p className="mt-1 text-gray-500">
              90/1, City Centre,
              <br />
              Suit-D-1, 24th Floor,
              <br />
              Motijheel, Dhaka-1000
            </p>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-start gap-4"
        >
          <div className="p-2 bg-[#CCFF00]/20 rounded-xl">
            <MapPin className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Factory Location</h3>
            <p className="mt-1 text-gray-500">
              Kasoba, Gotti, Rahutpara,
              <br />
              Shaltha, Faridpur
            </p>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-start gap-4"
        >
          <div className="p-2 bg-[#CCFF00]/20 rounded-xl">
            <Phone className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Phone</h3>
            <p className="mt-1 text-gray-500">
              <a href="tel:+8801744967018" className="hover:text-blue-600">
                +880 1744 967018
              </a>
            </p>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-start gap-4"
        >
          <div className="p-2 bg-[#CCFF00]/20 rounded-xl">
            <Mail className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Email</h3>
            <p className="mt-1 text-gray-500">
              <a href="mailto:info@vmai.com" className="hover:text-blue-600">
                info@vmai.com
              </a>
            </p>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-start gap-4"
        >
          <div className="p-2 bg-[#CCFF00]/20 rounded-xl">
            <Clock className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Hours</h3>
            <p className="mt-1 text-gray-500">
              Mon-Fri: 9:00 AM - 6:00 PM
              <br />
              Sat-Sun: Closed
            </p>
          </div>
        </MotionDiv>
      </div>
    </Card>
  )
}

export default ContactInfo

