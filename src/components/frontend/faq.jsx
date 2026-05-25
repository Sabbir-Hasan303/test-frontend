'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

const faqs = [
    {
      question: "What makes VMAI products sustainable?",
      answer: "VMAI products are designed with sustainability in mind. We use eco-friendly materials, implement energy-efficient manufacturing processes, and ensure our packaging is recyclable or biodegradable. Additionally, we have a product lifecycle program that aims to reduce waste and promote circular economy principles."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is shipped, you'll receive a confirmation email with a tracking number. You can use this number on our website's 'Track Order' page or directly on the courier's website to monitor your package's journey."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be in their original condition and packaging. Custom or personalized items are not eligible for return unless they're defective. Please visit our 'Returns' page for more detailed information and to initiate a return."
    },
    {
      question: "Are VMAI products available internationally?",
      answer: "Yes, we ship to many countries worldwide. During checkout, you can select your country to see if we deliver to your location. Please note that international orders may be subject to customs fees or import duties, which are the responsibility of the customer."
    },
    {
      question: "How can I become a VMAI retailer?",
      answer: "We're always looking for partners who share our vision for sustainability and quality. If you're interested in becoming a VMAI retailer, please fill out the application form on our 'Become a Retailer' page. Our team will review your application and get back to you within 5-7 business days."
    },
    {
      question: "Do you offer warranties on your products?",
      answer: "Yes, most VMAI products come with a standard 1-year warranty against manufacturing defects. Some premium products may have extended warranty options. Check the product page or included documentation for specific warranty information on your purchase."
    },
    {
      question: "How do I care for and maintain my VMAI products?",
      answer: "Each VMAI product comes with specific care instructions to ensure longevity and maintain quality. Generally, we recommend gentle cleaning with eco-friendly products. For detailed care guides, please refer to the product manual or visit our 'Product Care' page on the website."
    },
    {
      question: "Are VMAI products tested on animals?",
      answer: "No, VMAI is committed to cruelty-free practices. We do not test our products on animals, nor do we work with suppliers who conduct animal testing. Our products are developed using alternative, ethical testing methods."
    }
  ]

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
        <Image
          src="/assets/banner/faq-banner.jpg"
          alt="FAQ hero image"
          fill={true}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Find answers to common questions about our products and services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 relative">
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold text-green-800 hover:text-green-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {filteredFAQs.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No matching FAQs found. Please try a different search term.</p>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-800">Didn't Find Your Answer?</h2>
          <p className="text-xl mb-8 text-gray-700">
            Our customer support team is here to help. Reach out to us for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 transition-colors duration-300">
              <Link href="/contact">Contact Support</Link>
            </Button>
            {/* <Button asChild size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 transition-colors duration-300">
              <Link href="/live-chat">Start Live Chat</Link>
            </Button> */}
          </div>
        </div>
      </section>
    </div>
  )
}
