import Link from 'next/link'
import AuthCard from '@/app/(auth)/AuthCard'
import Image from 'next/image'
export const metadata = {
    title: 'Login',
}

const Layout = ({ children }) => {
    return (
        <div>
            <div className="text-gray-900 antialiased">
                <AuthCard
                    logo={
                        <Link href="/">
                            <Image src="/assets/logo/VMAI.jpg" alt="VMAI" width={100} height={100} />
                        </Link>
                    }>
                    {children}
                </AuthCard>
            </div>
        </div>
    )
}

export default Layout
