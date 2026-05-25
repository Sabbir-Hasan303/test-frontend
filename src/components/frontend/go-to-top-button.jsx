"use client"

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-transparent hover:bg-[#164e63] text-black hover:text-white"
      size="icon"
      onClick={scrollToTop}
    >
      <ChevronUp className="h-6 w-6" />
      <span className="sr-only">Go to top</span>
    </Button>
  )
}

