import CheckoutPage from '@/components/frontend/CheckoutPage'
import { InfoCards } from "@/components/frontend/info-cards"
import { NewsletterSubscription } from "@/components/frontend/newsletter-subscription"
import React from 'react'

export const metadata = {
    title: "CheckoutPage | Village Meat Agro",
    description: "Village Meat Agro is a company that provides quality meat products to its customers.",
}

export default function Checkout() {
  return (
    <div>
        <CheckoutPage />
        <InfoCards />
        <NewsletterSubscription />
    </div>
  )
}
