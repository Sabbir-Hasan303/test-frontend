import { Inter } from 'next/font/google'
import { CartProvider } from '@/components/frontend/context/cart-context';
import '@/app/global.css'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: 'Village Meat Agro',
    description: 'Your trusted source for quality meat products',
  }

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <CartProvider>
                    {children}
                </CartProvider>
            </body>
        </html>
    )
}

export default RootLayout
