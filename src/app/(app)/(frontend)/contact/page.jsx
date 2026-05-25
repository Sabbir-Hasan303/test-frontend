import { ContactForm } from '@/components/frontend/contact/contact-form'
import { CircleImage } from '@/components/frontend/contact/circle-image'
import { MapContactSection } from '@/components/frontend/contact/map-contact-section'
import { InfoCards } from "@/components/frontend/info-cards"
import { NewsletterSubscription } from "@/components/frontend/newsletter-subscription"
import Image from 'next/image'

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://lh3.googleusercontent.com/p/AF1QipPKJsIjjZIkGwErblY_L5FJEBBxvcWeMV9XKBrZ=s680-w680-h510"
            alt="Background"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help! Reach out to our team and we'll get back to you promptly.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <ContactForm />
              </div>
              <div className="md:w-1/2 bg-gradient-to-br from-[#dc2626] to-white p-8 md:p-12 flex items-center justify-center">
                <CircleImage />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Contact Section */}
      <MapContactSection />
      <InfoCards />
      <NewsletterSubscription />
    </div>
  )
}

