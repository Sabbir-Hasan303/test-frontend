import Image from "next/image"
import { Button } from "@/components/ui/button"

export function PromoBanner() {
  return (
    <section className="py-12 bg-[#F2FCE4]">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-[#253D4E] mb-4">
              Stay home & get your daily <br />
              needs from our shop
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Start your daily shopping with Village Meat Agro
            </p>
            <div className="flex space-x-4">
              <Button className="bg-[#3BB77E] hover:bg-[#3BB77E]/90 text-white px-8 py-3 rounded-full text-lg">
                Shop Now
              </Button>
              <Button variant="outline" className="px-8 py-3 rounded-full text-lg border-[#3BB77E] text-[#3BB77E] hover:bg-[#3BB77E] hover:text-white">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <Image
              src="https://wp.alithemes.com/html/nest/demo/assets/imgs/banner/banner-9.png"
              alt="Promo Banner"
              width={600}
              height={400}
              className="rounded-lg"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg">
              <Image
                src="https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-1.svg"
                alt="Free Delivery"
                width={60}
                height={60}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

