import { ProductListingPage } from "@/components/frontend/shop/product-listing-page"
import { DayOfDeal } from "@/components/frontend/day-of-deal"
import { InfoCards } from "@/components/frontend/info-cards"
import { NewsletterSubscription } from "@/components/frontend/newsletter-subscription"
export default function ShopPage() {
  return (
    <>
        <ProductListingPage />
        <DayOfDeal />
        <InfoCards />
        <NewsletterSubscription />
    </>
  )
}

