'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function SortOptions() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <span>Sort by</span>
        <ChevronDown size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul className="py-1">
            {['Price: Low to High', 'Price: High to Low', 'Popularity', 'Newest'].map((option) => (
              <li key={option}>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    // Implement sorting logic here
                    setIsOpen(false)
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
