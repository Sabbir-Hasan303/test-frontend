import { Card } from '@/components/ui/card'
import { ContactInfo } from '@/components/frontend/contact/contact-info'
import Image from 'next/image'

export function MapContactSection() {
  return (
    <div className="relative w-full bg-white overflow-hidden">
      {/* Enhanced decorative background */}
      <div className="absolute inset-0">
        {/* Top right curved shape */}
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-[#dc2626] to-[#ef4444] rounded-[100px] rotate-45 opacity-90" />

        {/* Bottom left curved shape */}
        <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-to-tr from-[#b91c1c] to-[#dc2626] rounded-[100px] -rotate-45 opacity-90" />

        {/* Decorative circles */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-red-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-red-600/20 rounded-full blur-xl animate-pulse" />

        {/* Wave pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-10">
          <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
            <path
              fill="#dc2626"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
          <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
            <path
              fill="#ef4444"
              fillOpacity="0.5"
              d="M0,160L48,144C96,128,192,96,288,101.3C384,107,480,149,576,165.3C672,181,768,171,864,154.7C960,139,1056,117,1152,117.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 mb-4">
            Get in Touch
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto relative">
            <span className="absolute -left-4 -top-4 text-6xl text-red-200 opacity-50">"</span>
            We'd love to hear from you. Contact us for any inquiries or support.
            <span className="absolute -right-4 -bottom-4 text-6xl text-red-200 opacity-50">"</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
          {/* Map Card */}
          <Card className="w-full overflow-hidden shadow-lg rounded-3xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.3701363610934!2d90.41619631744384!3d23.733839500000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85c366aaf1b%3A0x63938f6d4c346f38!2sMotijheel%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1672935675811!5m2!1sen!2sbd"
              className="w-full h-[400px] border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our location on Google Maps"
            />
          </Card>

          <div className="relative z-10 px-4 py-12">
            <div className="relative max-w-5xl mx-auto">
              {/* Contact Info Card */}
              <div className="relative z-20 lg:absolute lg:left-[-32px] lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[300px]">
                <ContactInfo />
              </div>

              {/* Center Image */}
              <div className="relative z-10 my-6 lg:my-0 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl mx-auto max-w-2xl">
                <Image
                  src="https://img.freepik.com/premium-photo/contact-us-customer-support-hotline-people-connect-call-customer-support_36325-1640.jpg"
                  alt="Modern office interior"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

