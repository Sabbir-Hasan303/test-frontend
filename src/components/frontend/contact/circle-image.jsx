import Image from 'next/image'

export function CircleImage() {
  return (
    <div className="relative w-full mx-auto" style={{ paddingBottom: '100%' }}>
      {/* Main circle with peach background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#dc2626] to-white shadow-lg">
        {/* Decorative stripes */}
        <div className="absolute bottom-0 right-0 w-full h-1/2 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-full h-full transform rotate-[-30deg] translate-y-1/4 translate-x-1/4 flex flex-col gap-4">
            <div className="h-8 bg-[#0066ff] transform -skew-x-[30deg]" />
            <div className="h-8 bg-[#00e6c3] transform -skew-x-[30deg]" />
            <div className="h-8 bg-[#ccff00] transform -skew-x-[30deg]" />
            <div className="h-8 bg-white transform -skew-x-[30deg]" />
          </div>
        </div>

        {/* Image container */}
        <div className="absolute inset-4 rounded-full overflow-hidden bg-white shadow-inner">
          <div className="relative w-full h-full">
            <Image
              src="/assets/contact/support_2.webp"
              alt="Customer service representative"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

