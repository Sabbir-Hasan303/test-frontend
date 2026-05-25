import { Footer } from "@/components/frontend/footer"
import { GoToTopButton } from "@/components/frontend/go-to-top-button"
import { SiteHeader } from "@/components/frontend/site-header"
import { CartProvider } from '@/components/frontend/context/cart-context'

const FrontendLayout = ({ children }) => {
    return (
        <CartProvider>
            <div className="min-h-screen">
                <main>
                    <SiteHeader />
                    {children}
                    <Footer />
                    <GoToTopButton />
                </main>
            </div>
        </CartProvider>
    )
}

export default FrontendLayout
