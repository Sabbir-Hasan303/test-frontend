import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 pb-4 lg:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <Image
              src="https://github.com/Sabbir-Hasan303/Sabbir-s-Blog/blob/main/images/VMAI%20Images/logo.png?raw=true"
              alt="Village Meat Agro"
              width={150}
              height={50}
              className="transform hover:scale-105 transition-transform duration-200 drop-shadow-xl filter brightness-105"
              style={{
                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))',
                transform: 'translateY(-4px)'
              }}
            />
            <p className="text-sm text-gray-600 mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                see more...
              </Link>
            </p>
            <div className="flex space-x-2 mb-4">
              {[1, 2, 3, 4].map((num) => (
                <Image
                  key={num}
                  src="/assets/others/iso.png"
                  alt={`ISO ${num} Certification`}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ))}
            </div>
            <div className="font-semibold mb-2">CERTIFIED FROM XYZ</div>
          </div>

          {/* Company Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company Information</h3>
            <ul className="space-y-2">
              {[
                { name: "Our Story", href: "/our-story" },
                // { name: "Our Outlets", href: "/outlets" },
                { name: "Our Customers", href: "/our-customers" },
                { name: "License & Certifications", href: "/licenses-certifications" }
              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { name: "FAQ", href: "/faq" },
                { name: "Walk The Meat", href: "#" },
                { name: "Expert Speaks", href: "#" },
                { name: "Article & Recipes", href: "/blog" },
                { name: "Why VMAI", href: "/why-vmai" }
              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Policies</h3>
            <ul className="space-y-2">
              {[
                    { name: "Terms & Conditions", href: "/terms-and-conditions" },
                    { name: "Refund & Return Policy", href: "/refund-return-policy" },
                    { name:"Privacy Policy", href: "/privacy-policy" },
                ].map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Corporate</h3>
            <ul className="space-y-2">
              {["Jobs Open", "Farm Business", "Farm Carrier", "Our Suppliers", "Accessibility", "Promotions"].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter and Download App */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              Lorem Ipsum is simply dummy text of the printing.
            </p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="flex-grow" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          {/* <div>
            <h3 className="font-semibold text-lg mb-4">Download App</h3>
            <div className="flex space-x-4">
              <Link href="#" className="block">
                <Image src="/placeholder.svg?height=40&width=135" alt="Get it on Google Play" width={135} height={40} />
              </Link>
              <Link href="#" className="block">
                <Image src="/placeholder.svg?height=40&width=135" alt="Download on the App Store" width={135} height={40} />
              </Link>
            </div>
          </div> */}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Village Meat Agro Industries Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

