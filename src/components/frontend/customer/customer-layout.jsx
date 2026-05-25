"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Package, ShoppingBag, Star, Heart, Settings, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const sidebarItems = [
  {
    icon: User,
    label: 'My Profile',
    href: '/customer/profile',
    description: 'Manage your personal information'
  },
  {
    icon: Package,
    label: 'Orders',
    href: '/customer/orders',
    description: 'Track your order history'
  },
  {
    icon: ShoppingBag,
    label: 'Purchased Items',
    href: '/customer/purchased-items',
    description: 'View your purchase history'
  },
  {
    icon: Star,
    label: 'My Reviews',
    href: '/customer/reviews',
    description: 'Manage your product reviews'
  },
  {
    icon: Heart,
    label: 'My Wishlists',
    href: '/customer/wishlists',
    description: 'View your saved items'
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/customer/settings',
    description: 'Manage your preferences'
  },
]

export function CustomerLayout({ children }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const SidebarContent = () => (
    <ScrollArea className="h-full">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold text-[#253D4E] mb-2">Dashboard</h2>
        <p className="text-sm text-gray-500 mb-8">Manage your account and preferences</p>
        <nav className="flex flex-col gap-3">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className="block">
                <span
                  className={`group flex items-start p-4 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-[#3BB77E] text-white shadow-lg shadow-[#3BB77E]/20'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className={`h-5 w-5 mt-0.5 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-[#3BB77E]'
                  }`} />
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${
                      isActive ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.label}
                    </div>
                    <div className={`text-xs ${
                      isActive ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </span>
              </Link>
            )
          })}
        </nav>
      </div>
    </ScrollArea>
  )

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="lg:hidden mb-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-80 sm:w-96 p-0 bg-white border-r"
            >
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex gap-8">
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-8 bg-white rounded-2xl shadow-sm border">
              <SidebarContent />
            </div>
          </aside>
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
