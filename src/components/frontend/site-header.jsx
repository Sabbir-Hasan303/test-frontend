"use client"

import Link from "next/link"
import { ShoppingCart, Heart, Search, MapPin, X, ChevronDown, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useEffect, useRef, useState } from 'react'
import { MegaMenu } from "@/components/frontend/mega-menu"
import { MobileMenu } from "@/components/frontend/mobile-menu"
import { usePathname } from 'next/navigation'
import { CartSidebar } from '@/components/frontend/products/cart-sidebar'

export function SiteHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const marqueeRef = useRef(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isActive = (path) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Assuming 1024px as the breakpoint
    };

    handleResize(); // Call once to set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.mega-menu') && !event.target.closest('button')) {
        setIsMegaMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const messages = [
    "Need Help? Call us: (+8801954841388) or vmai@gmail.com",
    "Flash Sale: 50% off on all electronics this weekend!",
    "New arrivals: Summer collection now available"
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    setCurrentMessageIndex(0);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <header className="w-full">
      {isVisible && (
        <div className="relative bg-primary text-primary-foreground px-4 py-2 text-sm overflow-hidden">
          <div
            ref={marqueeRef}
            className="whitespace-nowrap inline-block"
            style={{
              animation: 'marquee 20s linear infinite',
            }}
          >
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-primary-foreground/10 z-10"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="border-b">
        <div className="container flex flex-col lg:flex-row items-center justify-between py-2 text-sm">
          <nav className="hidden lg:flex items-center space-x-4 text-xs xl:text-sm">
            <Link href="/faq" className="hover:text-green-600">Quick Help</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/about" className="hover:text-green-600">About Us</Link>
            {/* <span className="text-muted-foreground">|</span>
            <Link href="/tracking" className="hover:text-green-600">Order Tracking</Link> */}
          </nav>
          <div className="flex items-center space-x-2 h-6 overflow-hidden relative w-full lg:w-[37rem] text-xs md:text-sm">
            {messages.map((message, index) => (
              <p
                key={index}
                className="h-6 absolute inset-0 flex items-center justify-center transition-opacity duration-500 w-full"
                style={{
                  opacity: currentMessageIndex === index ? 1 : 0,
                  zIndex: currentMessageIndex === index ? 1 : 0,
                }}
              >
                {message}
              </p>
            ))}
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <span>English</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <span>USD</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>USD</DropdownMenuItem>
                <DropdownMenuItem>EUR</DropdownMenuItem>
                <DropdownMenuItem>GBP</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <Link href="/register" className="hover:text-primary hidden sm:inline">Signup</Link>
            <span className="text-muted-foreground hidden sm:inline">|</span>
            <Link href="/login" className="hover:text-primary hidden sm:inline">Login</Link>
          </div>
        </div>
      </div>

      <div className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2 relative -my-5">
            <Image
              src="/assets/logo/VMAI.png"
              alt="Village Meat Agro"
              width={180}
              height={50}
              priority
              className="transform hover:scale-105 transition-transform duration-200 drop-shadow-xl filter brightness-105"
              style={{
                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))',
                transform: 'translateY(-4px)'
              }}
            />
          </Link>
          <div className="flex-1 max-w-xl mx-8 hidden lg:flex">
            <Input
              type="search"
              placeholder="Search Product"
              className="rounded-l-md focus-visible:ring-0 border-r-0"
            />
            <Button variant="outline" size="icon" className="rounded-l-none">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="items-center space-x-2 hidden lg:flex bg-gray-100">
              <MapPin className="h-4 w-4" />
              <span>Location</span>
            </Button>
            <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                        0
                    </span>
                </Button>
            </Link>
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                0
              </span>
            </Button>
            <Link href="/customer/profile">
              <Button variant="ghost" size="icon" className="relative">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>

      <div className="border-b bg-muted">
        <div className="container flex items-center justify-between py-2">
          <div className="relative flex items-center justify-between w-full lg:w-auto">
            <div className="relative w-full lg:w-auto">
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2 w-48 lg:w-auto justify-between lg:justify-start"
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              >
                <span className="hidden md:inline">Browse All Category</span>
                <span className="md:hidden">Categories</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMegaMenuOpen ? 'transform rotate-180' : ''}`} />
              </Button>
              {isMegaMenuOpen && <MegaMenu isMobile={isMobile} />}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 lg:hidden w-24 border px-2"
            >
              <MapPin className="h-5 w-5" /><span>Location</span>
            </Button>
          </div>
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                isActive('/')
                  ? 'text-green-600 font-semibold'
                  : 'hover:text-primary'
              }`}
            >
              HOME
            </Link>
            <Link
              href="/shop"
              className={`font-medium transition-colors ${
                isActive('/shop')
                  ? 'text-green-600 font-semibold'
                  : 'hover:text-primary'
              }`}
            >
              SHOP
            </Link>
            <Link
              href="/blog"
              className={`font-medium transition-colors ${
                isActive('/blog')
                  ? 'text-green-600 font-semibold'
                  : 'hover:text-primary'
              }`}
            >
              BLOG
            </Link>
            <Link
              href="/about"
              className={`font-medium transition-colors ${
                isActive('/about')
                  ? 'text-green-600 font-semibold'
                  : 'hover:text-primary'
              }`}
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className={`font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-green-600 font-semibold'
                  : 'hover:text-primary'
              }`}
            >
              CONTACT
            </Link>
            {/* <Link
              href="/deals"
              className={`font-medium transition-colors ${
                isActive('/deals')
                  ? 'text-red-600 font-semibold'
                  : 'text-red-500 hover:text-red-600'
              }`}
            >
              🔥 DEALS
            </Link> */}
          </nav>
          <div className="items-center space-x-3 hidden lg:flex">
            <div className="w-12 h-12 relative">
              <Image
                src="https://github.com/Sabbir-Hasan303/Sabbir-s-Blog/blob/main/images/VMAI%20Images/support-icon.png?raw=true"
                alt="Customer Service"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <a href="tel:1900-888" className="text-lg font-semibold text-green-500">
                1900 - 888
              </a>
              <p className="text-xs text-gray-500 -ml-3">24/7 Support Center</p>
            </div>
          </div>
        </div>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}

