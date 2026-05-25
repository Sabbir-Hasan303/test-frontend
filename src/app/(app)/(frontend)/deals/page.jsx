import Image from 'next/image'
import Link from 'next/link'
import { Timer } from '@/components/frontend/deals/Timer'
import { Tag, Percent, Package, Gift } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const deals = [
  {
    id: 1,
    slug: 'flash-sale',
    title: 'Flash Sale',
    description: 'Limited time offers with massive discounts!',
    image: 'https://img.freepik.com/premium-vector/flash-sale-super-sale-banner-template-design-special-offer-discount_734948-399.jpg',
    color: 'from-red-600 to-red-400',
    icon: Percent,
    endTime: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    discount: '50% OFF',
    itemsLeft: 42,
  },
  {
    id: 2,
    slug: 'clearance',
    title: 'Clearance',
    description: 'Last chance to grab these items at unbeatable prices!',
    image: 'https://img.freepik.com/premium-vector/clearance-sale-super-offer-sale-banner-template-stock-clearance-background-stock-out-banner_1135545-842.jpg',
    color: 'from-yellow-600 to-yellow-400',
    icon: Tag,
    endTime: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 days from now
    discount: 'UP TO 70% OFF',
    itemsLeft: 156,
  },
  {
    id: 3,
    slug: 'bundle-offers',
    title: 'Bundle Offers',
    description: 'Save big when you buy these curated product sets!',
    image: 'https://flashsales.com/cdn/shop/files/bundle_deal_banner_1445x.jpg?v=1677728194',
    color: 'from-green-600 to-green-400',
    icon: Package,
    endTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
    discount: '30% OFF BUNDLES',
    itemsLeft: 89,
  },
  {
    id: 4,
    slug: 'seasonal-specials',
    title: 'Seasonal Specials',
    description: 'Exclusive deals to celebrate the season!',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/004/563/903/small_2x/winter-sale-background-special-offer-banner-background-for-business-and-advertising-illustration-free-vector.jpg',
    color: 'from-blue-600 to-blue-400',
    icon: Gift,
    endTime: Date.now() + 14 * 24 * 60 * 60 * 1000, // 14 days from now
    discount: 'SEASON SPECIAL',
    itemsLeft: 203,
  },
]

function NewsletterSection() {
    return (
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 mt-12">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">
            Get Exclusive Deals Straight to Your Inbox
          </h2>
          <p className="text-white/90">
            Subscribe to our newsletter and never miss out on our special offers!
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <Button className="bg-white text-green-600 hover:bg-white/90 rounded-full">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    )
  }

function HeroSection() {
  return (
    <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
      <Image
        src="https://img.freepik.com/premium-vector/flash-sale-super-sale-banner-template-design-special-offer-discount_734948-399.jpg"
        alt="Deals Hero"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
        <div className="max-w-2xl space-y-4">
          <Badge className="bg-red-500 text-white px-3 py-1 text-sm mb-4">
            Limited Time Offer
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Exclusive Deals on Premium Meat
          </h1>
          <p className="text-lg text-white/90 py-4">
            Get up to 50% off on selected premium cuts. Don&apos;t miss out on these amazing offers!
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Shop Now
            </Button>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default function DealsPage() {
  return (
    <div className='bg-gradient-to-b from-white to-red-50'>
    <div className="container mx-auto py-8">
      <HeroSection />
      <h1 className="text-4xl font-bold text-center mb-8">Hot Deals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {deals.map((deal) => {
          const Icon = deal.icon
          return (
            <Link
              href={`/deals/${deal.slug}`}
              key={deal.id}
              className="group block overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className={`bg-gradient-to-br ${deal.color} p-6 h-full flex flex-col justify-between`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-semibold text-white mb-2">{deal.title}</h2>
                    <p className="text-white text-opacity-90 mb-4">{deal.description}</p>
                    <div className="flex items-center space-x-2 mb-4">
                      <Icon className="w-6 h-6 text-white" />
                      <span className="text-white font-bold">{deal.discount}</span>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-full p-3">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="mb-4">
                  <Timer endTime={deal.endTime} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white text-opacity-90">Items left: {deal.itemsLeft}</span>
                  {/* <button className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300">
                    Shop Now
                  </button> */}
                </div>
                <div className="mt-4 relative h-48 overflow-hidden rounded-lg">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="transition-transform duration-300 group-hover:scale-110 object-cover"
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      <NewsletterSection />
    </div>
    </div>
  )
}
