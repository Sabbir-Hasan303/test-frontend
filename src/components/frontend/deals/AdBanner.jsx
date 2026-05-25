import Image from 'next/image';
import Link from 'next/link';

export function AdBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {/* First Banner */}
      <div className="relative bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-80">
          <Image
            src="https://img.freepik.com/premium-vector/flash-sale-banner-template-red-background_42331-3514.jpg"
            alt="Exclusive Offer"
            fill
            className="object-cover"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div> */}
        </div>
        {/* <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
          <h2 className="text-3xl font-bold mb-3">Exclusive Offer!</h2>
          <p className="text-lg mb-5">Grab your deal today with <span className="font-bold">30% off</span>.</p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition-all duration-300">
            Shop Now
          </button>
        </div> */}
      </div>

      {/* Second Banner */}
      <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-80">
          <Image
            src="https://static.vecteezy.com/system/resources/previews/002/191/918/non_2x/mega-deals-sale-banner-background-vector.jpg"
            alt="Mega Deals"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
          <h2 className="text-3xl font-bold mb-3">Mega Deals!</h2>
          <p className="text-lg mb-5">Up to <span className="font-bold">50% off</span> on your favorite items.</p>
          <Link href="/deals">
            <button className="bg-white text-pink-600 px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition-all duration-300">
                Explore Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
