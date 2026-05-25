import { AboutHero } from "@/components/frontend/about/hero"
import { CompanyOverview } from "@/components/frontend/about/company-overview"
import { MissionVision } from "@/components/frontend/about/mission-vision"
import { Timeline } from "@/components/frontend/about/timeline"
import { Team } from "@/components/frontend/about/team"
import { Facilities } from "@/components/frontend/about/facilities"
import { ContactInfo } from "@/components/frontend/about/contact-info"
import { LocationMap } from "@/components/frontend/about/location-map"


export const metadata = {
  title: "About Us | Village Meat Agro",
  description: "Village Meat Agro is a company that provides quality meat products to its customers.",
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <CompanyOverview />
      <MissionVision />
      <Timeline />
      <Team />
      <Facilities />
      <ContactInfo />
      <LocationMap />
    </main>
  )
}

