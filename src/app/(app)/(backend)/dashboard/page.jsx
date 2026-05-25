import { OverviewCards } from "@/components/backend/overview-cards"
import { RevenueChart } from "@/components/backend/revenue-chart"
import { NewsFeed } from "@/components/backend/news-feed"
import { TopPages } from "@/components/backend/top-pages"
import { TopSellingProducts } from "@/components/backend/top-selling-products"
import { RecentOrders } from "@/components/backend/recent-orders"
import { Referrals } from "@/components/backend/referrals"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <OverviewCards />
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChart />
        <NewsFeed />
      </div>
      <TopPages />
      <TopSellingProducts />
      <div className="grid gap-6 md:grid-cols-2">
        <RecentOrders />
        <Referrals />
      </div>
    </div>
  )
}

