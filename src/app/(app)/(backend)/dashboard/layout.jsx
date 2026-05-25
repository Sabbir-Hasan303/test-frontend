"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/backend/sidebar"
import { Navbar } from "@/components/backend/navbar"

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024) // Using lg breakpoint (1024px)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar
          className={isSidebarOpen || !isMobile ? "block" : "hidden"}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar onToggleSidebar={toggleSidebar} />
          <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

