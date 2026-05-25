"use client"

import { cn } from "@/lib/utils"
import { Activity, BarChart, Box, ChevronDown, CreditCard, Edit, Eye, FileText, Grid, HelpCircle, Home, Image, Info, LayoutDashboard, List, MessageSquare, Package, Plus, RefreshCcw, Settings, Shield, ShoppingCart, Tag, Truck, Users } from 'lucide-react'
import Link from "next/link"
import * as React from "react"
import { useEffect, useRef } from "react"

const scrollbarStyles = `
.scrollbar-thin::-webkit-scrollbar {
width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
background: #1a202c;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
background-color: rgba(255, 255, 255, 0.3);
border-radius: 3px;
}
.scrollbar-thin {
scrollbar-width: thin;
scrollbar-color: rgba(255, 255, 255, 0.3) #1a202c;
}
`

const navigation = [
{
  title: "Dashboard",
  href: "/dashboard",
  icon: LayoutDashboard
},
{
  title: "Products",
  href: "/dashboard/products",
  icon: ShoppingCart,
  children: [
    {
      title: "New Product",
      href: "/dashboard/products/new",
      icon: Plus
    },
    {
      title: "Edit Product",
      href: "/dashboard/products/edit/1", // Replace '1' with a dynamic ID in a real app
      icon: Edit
    },
    {
      title: "All Products",
      href: "/dashboard/products/all",
      icon: List
    },
    {
      title: "Categories",
      href: "/dashboard/products/categories",
      icon: Grid
    },
    {
      title: "Tags",
      href: "/dashboard/products/tags",
      icon: Tag
    }
  ]
},
{
  title: "Inventory Management",
  href: "/dashboard/inventory",
  icon: Box,
  children: [
    {
      title: "Dealer List",
      href: "/dashboard/inventory",
      icon: List
    },
    {
      title: "Inventory",
      href: "/dashboard/inventory/add-warehouse",
      icon: Package
    }
  ]
},
{
  title: "Orders Management",
  href: "/dashboard/orders",
  icon: ShoppingCart,
  children: [
    {
      title: "Order List",
      href: "/dashboard/orders",
      icon: List
    },
    {
      title: "Order Details",
      href: "/dashboard/orders/details/1",
      icon: FileText
    }
  ]
},
{
  title: "Accounts & Payments",
  href: "/dashboard/accounts",
  icon: FileText,
  children: [
    {
      title: "Payments",
      href: "/dashboard/accounts/payments",
      icon: CreditCard
    },
    {
      title: "Refund Request",
      href: "/dashboard/accounts/refund-request",
      icon: RefreshCcw
    }
  ]
},
{
  title: "Reports",
  href: "/dashboard/reports",
  icon: BarChart,
  children: [
    {
      title: "Financial Report",
      href: "/dashboard/reports/financial",
      icon: CreditCard
    },
    {
      title: "Sales Report",
      href: "/dashboard/reports/sales",
      icon: ShoppingCart
    },
    {
      title: "Activity Report",
      href: "/dashboard/reports/activity",
      icon: Activity
    },
    {
      title: "Inventory Report",
      href: "/dashboard/reports/inventory",
      icon: Package
    }
  ]
},
{
  title: "Marketing & Promotion",
  href: "/dashboard/marketing",
  icon: MessageSquare,
  children: [
    {
      title: "Discount Coupons",
      href: "/dashboard/marketing/coupons",
      icon: Tag
    },
    {
      title: "Banners & Ads",
      href: "/dashboard/marketing/banners",
      icon: Image
    },
    {
      title: "Newsletter",
      href: "/dashboard/marketing/newsletter",
      icon: FileText
    }
  ]
},
{
  title: "Content Management",
  href: "/dashboard/content",
  icon: FileText,
  children: [
    {
      title: "All Blogs",
      href: "/dashboard/content/blogs",
      icon: FileText
    },
    {
      title: "Add New Blogs",
      href: "/dashboard/content/blogs/new",
      icon: Plus
    },
    {
      title: "Edit Blogs",
      href: "/dashboard/content/blogs/edit",
      icon: Edit
    },
    {
      title: "Homepage Content",
      href: "/dashboard/content/homepage",
      icon: Home
    },
    {
      title: "Manage FAQ",
      href: "/dashboard/content/faq",
      icon: HelpCircle
    },
    {
      title: "Manage About Us",
      href: "/dashboard/content/about",
      icon: Info
    },
    {
      title: "Privacy Policy",
      href: "/dashboard/content/privacy",
      icon: Shield
    },
    {
      title: "Shipping Details",
      href: "/dashboard/content/shipping",
      icon: Truck
    }
  ]
},
{
  title: "Reviews & Inquiries",
  href: "/dashboard/reviews",
  icon: MessageSquare,
  children: [
    {
      title: "Product Reviews",
      href: "/dashboard/reviews/product-reviews",
      icon: MessageSquare,
    },
    {
      title: "Moderate Reviews",
      href: "/dashboard/reviews/moderate-reviews",
      icon: MessageSquare,
    },
    {
      title: "Customer Queries",
      href: "/dashboard/reviews/customer-queries",
      icon: MessageSquare,
    },
    {
      title: "Support Tickets",
      href: "/dashboard/reviews/support-tickets",
      icon: MessageSquare,
    },
  ],
},
{
  title: "Settings",
  href: "/dashboard/settings",
  icon: Settings,
  children: [
    {
      title: "General Settings",
      href: "/dashboard/settings/general",
    },
    {
      title: "Payment Settings",
      href: "/dashboard/settings/payment",
    },
    {
      title: "Shipping Settings",
      href: "/dashboard/settings/shipping",
    },
    {
      title: "API Integration",
      href: "/dashboard/settings/api",
    },
  ]
},
{
  title: "User Management",
  href: "/dashboard/users",
  icon: Users,
  children: [
    {
      title: "User List",
      href: "/dashboard/users",
      icon: Users
    },
    {
      title: "Add New User",
      href: "/dashboard/users/new",
      icon: Plus
    },
    {
      title: "View User",
      href: "/dashboard/users/view/1", // Replace '1' with a dynamic ID in a real app
      icon: Eye
    },
    {
      title: "Customer List",
      href: "/dashboard/customers",
      icon: Users
    },
    {
      title: "View Customer",
      href: "/dashboard/customers/view/1", // Replace '1' with a dynamic ID in a real app
      icon: Eye
    },
    {
      title: "Roles & Permissions",
      href: "/dashboard/roles",
      icon: Shield
    },
  ]
},
{
  title: "Roles & Permissions",
  href: "/dashboard/roles",
  icon: Shield,
},
]

function NavItem({ item, isChild, onClose }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const hasChildren = item.children && item.children.length > 0
  const Icon = item.icon

  const handleClick = (e) => {
    if (hasChildren) {
      e.preventDefault()
      setIsOpen(!isOpen)
    } else if (window.innerWidth < 1024) { // Close sidebar on mobile when clicking a link
      onClose?.()
    }
  }

  if (hasChildren) {
    return (
      <div>
        <div
          onClick={handleClick}
          className={cn(
            "flex w-full items-center justify-between rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer",
            isOpen && "bg-gray-800 text-white"
          )}
        >
          <span className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            {item.title}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </div>
        {isOpen && (
          <div className="ml-4 border-l border-gray-700 pl-4 mt-1 space-y-1">
            {item.children.map((child) => (
              <NavItem key={child.href} item={child} isChild onClose={onClose} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      onClick={handleClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-gray-800 transition-colors text-gray-400 hover:text-white",
        isChild ? "mt-1" : ""
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {item.title}
    </Link>
  )
}

export function Sidebar({ className, onClose, ...props }) {
  const sidebarRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && onClose) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out lg:hidden",
          className === "block" ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-[280px] bg-gray-900 transition-transform duration-300 ease-in-out lg:translate-x-0",
          !className && "-translate-x-full",
          className
        )}
        {...props}
      >
        <style>{scrollbarStyles}</style>
        <div className="space-y-4 py-4 flex flex-col h-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-900">
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight text-white">
              VMAI
            </h2>
          </div>
          <nav className="space-y-1 px-2 overflow-y-auto max-h-[calc(100vh-4rem)]">
            {navigation.map((item) => (
              <NavItem key={item.href} item={item} onClose={onClose} />
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

