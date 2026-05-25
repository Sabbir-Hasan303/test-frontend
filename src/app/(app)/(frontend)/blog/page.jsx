import { Suspense } from 'react'
import BlogHeader from '@/components/frontend/blog/BlogHeader'
import FeaturedPost from '@/components/frontend/blog/FeaturedPost'
import BlogGrid from '@/components/frontend/blog/BlogGrid'
import Sidebar from '@/components/frontend/blog/Sidebar'
// import Pagination from '@/components/frontend/blog/Pagination'

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <BlogHeader />
            <main className="container mx-auto px-4 py-12">
                <Suspense fallback={<div>Loading featured post...</div>}>
                    <FeaturedPost />
                </Suspense>
                <div className="flex flex-col lg:flex-row gap-8 mt-12">
                    <div className="lg:w-2/3">
                        <Suspense fallback={<div>Loading blog posts...</div>}>
                            <BlogGrid />
                        </Suspense>
                        {/* <Pagination /> */}
                    </div>
                    <aside className="lg:w-1/3">
                        <Sidebar />
                    </aside>
                </div>
            </main>
        </div>
    )
}
