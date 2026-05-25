import { SiteHeader } from "@/components/frontend/site-header"
import { Banner } from "@/components/frontend/banner"
import { FeaturedCategories } from "@/components/frontend/featured-categories"
import { PopularProducts } from "@/components/frontend/popular-products"
import { FrequentlyBought } from "@/components/frontend/frequently-bought"
import { DailyBestSells } from "@/components/frontend/daily-best-sells"
import { DayOfDeal } from "@/components/frontend/day-of-deal"
import { PromoBanner } from "@/components/frontend/promo-banner"
import { NewArrivals } from "@/components/frontend/new-arrivals"
import { TrendingProducts } from "@/components/frontend/trending-products"
import { InfoCards } from "@/components/frontend/info-cards"
import { PerfectPairings } from "@/components/frontend/perfect-pairings"
import { SpecialOffers } from "@/components/frontend/special-offers"
import { ShopByCategory } from "@/components/frontend/shop-by-category"
import { WhyVillageMeat } from "@/components/frontend/why-village-meat"
import { NewsletterSubscription } from "@/components/frontend/newsletter-subscription"
import { Footer } from "@/components/frontend/footer"
import { GoToTopButton } from "@/components/frontend/go-to-top-button"

export const metadata = {
    title: 'Village Meat Agro',
    description: 'Your trusted source for quality meat products',
  }

const Home = () => {
    return (
        <div>
        <SiteHeader />
        <Banner />
        <FeaturedCategories />
        <div className="bg-gradient-to-r from-green-50 to-orange-50">
            <PopularProducts />
            <DayOfDeal />
        </div>
        <PromoBanner />
        <FrequentlyBought />
        <div className="bg-gradient-to-r from-green-50 to-blue-50">
            <NewArrivals />
            <DailyBestSells />
        </div>
        <PerfectPairings />
        <TrendingProducts />
        <InfoCards />
        <SpecialOffers />
        <ShopByCategory />
        <WhyVillageMeat />
        <NewsletterSubscription />
        <Footer />
        <GoToTopButton />
      </div>
    )
}

export default Home
