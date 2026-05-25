"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Flame, Home, Info, Menu, Phone, Search, ShoppingBag, X, User } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  const menuItems = [
    { href: "/", label: "HOME", icon: Home },
    { href: "/shop", label: "SHOP", icon: ShoppingBag },
    { href: "/blog", label: "BLOG", icon: BookOpen },
    { href: "/about", label: "ABOUT", icon: Info },
    { href: "/contact", label: "CONTACT", icon: Phone },
    // { href: "/deals", label: "DEALS", icon: Flame },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="relative z-50">
        <Menu className="h-6 w-6" />
      </Button>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`fixed inset-y-0 left-0 w-full max-w-sm bg-white dark:bg-gray-800 z-50 shadow-xl transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-6 bg-gradient-to-r from-green-400 to-blue-500">
            <div className="flex justify-between mb-8">
              <Image
                src="https://github.com/Sabbir-Hasan303/Sabbir-s-Blog/blob/main/images/VMAI%20Images/logo.png?raw=true"
                alt="Village Meat Agro"
                width={120}
                height={40}
                className="transform hover:scale-105 transition-transform duration-200 drop-shadow-xl filter brightness-105"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-none bg-white/20 text-white placeholder-white/70"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
            </div>
          </div>
          <ScrollArea className="flex-grow">
            <nav className="px-4 py-6 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`h-5 w-5 ${
                      isActive(item.href)
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-500'
                    }`} />
                    <span className={`font-base ${
                      isActive(item.href)
                        ? 'text-green-600 dark:text-green-400 font-semibold'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="px-4 py-6 bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Need help?</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Contact us</p>
                </div>
              </div>
              <a href="tel:+8801744967018">
                <Button variant="outline" size="sm" className="rounded-full">
                  Call Now
                </Button>
              </a>
            </div>
            <div className="flex items-center justify-between">
              <Link
                href="/login"
                className="w-full flex items-center justify-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-5 w-5 mr-2" /> Login / Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
