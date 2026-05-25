import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import SinglePostSidebar from '@/components/frontend/blog/singleblog/SinglePostSidebar'
import RelatedPosts from '@/components/frontend/blog/singleblog/RelatedPosts'
import CommentSection from '@/components/frontend/blog/singleblog/CommentSection'
import ShareButtons from '@/components/frontend/blog/singleblog/ShareButtons'

async function getBlogPost(slug) {
    // This is a mock function. In a real app, you'd fetch the blog post from your API or database
    const post = {
        slug,
        title: "The Future of Sustainable Meat: Balancing Taste, Health, and Environment",
        date: "2023-07-01",
        image: "https://nfcacademy.org/wp-content/uploads/2023/07/pleasing-blog-banner-design-on-blog-banner-of-blog-banner-design.jpg",
        content: `
      <p>The meat industry stands at a crossroads. With growing concerns about environmental sustainability, animal welfare, and human health, there's an increasing demand for innovative solutions that can satisfy our taste for meat while addressing these critical issues. This article explores the cutting-edge technologies and practices shaping the future of sustainable meat production.</p>

      <h2>Lab-Grown Meat: A Game-Changer?</h2>
      <p>One of the most promising developments in sustainable meat production is lab-grown or cultured meat. This technology involves growing meat from animal cells in a controlled laboratory environment, eliminating the need for animal slaughter and potentially reducing the environmental impact of meat production.</p>
      <p>Companies like Memphis Meats and Mosa Meat have made significant strides in this field, producing lab-grown beef, chicken, and duck. While still in its early stages, cultured meat could revolutionize the industry by providing a more ethical and sustainable alternative to traditional meat.</p>

      <h2>Plant-Based Alternatives: Not Just for Vegetarians</h2>
      <p>The rise of plant-based meat alternatives has been nothing short of phenomenal. Brands like Beyond Meat and Impossible Foods have created products that mimic the taste and texture of meat so convincingly that they're winning over even die-hard meat lovers.</p>
      <p>These products not only cater to vegetarians and vegans but also to "flexitarians" – people looking to reduce their meat consumption for health or environmental reasons. The continued improvement in taste and texture of these alternatives suggests they'll play a significant role in the future of sustainable "meat" consumption.</p>

      <h2>Sustainable Farming Practices</h2>
      <p>While alternative protein sources are gaining traction, traditional animal farming is also evolving to become more sustainable. Practices such as rotational grazing, which mimics natural herd movements and helps sequester carbon in the soil, are being adopted by forward-thinking farmers.</p>
      <p>Additionally, there's a growing focus on heritage breeds and locally adapted livestock, which often require fewer resources and are more resilient to local conditions. These practices not only reduce the environmental impact of meat production but also often result in higher quality, more flavorful meat.</p>

      <h2>The Role of Technology</h2>
      <p>Technology is playing a crucial role in making meat production more sustainable. From precision farming techniques that optimize feed and reduce waste, to blockchain technology that enhances traceability and transparency in the supply chain, innovation is helping to address many of the industry's challenges.</p>
      <p>Artificial intelligence and big data are being used to predict market demands more accurately, reducing overproduction and waste. Meanwhile, advancements in packaging technology are helping to extend shelf life and reduce food waste.</p>

      <h2>Consumer Education and Changing Habits</h2>
      <p>Perhaps one of the most important factors in the future of sustainable meat is consumer behavior. As people become more aware of the environmental and health impacts of their food choices, many are choosing to reduce their meat consumption or opt for more sustainably produced options.</p>
      <p>Education plays a crucial role here. Helping consumers understand the impact of their choices and the benefits of sustainable options is key to driving change in the industry.</p>

      <h2>Conclusion</h2>
      <p>The future of sustainable meat is multifaceted, involving technological innovation, changes in farming practices, and shifts in consumer behavior. While challenges remain, the progress being made in lab-grown meat, plant-based alternatives, and sustainable farming practices offers hope for a future where we can enjoy meat without compromising our health or the planet.</p>
      <p>As consumers, we have the power to shape this future through our choices. By supporting sustainable practices and being open to new alternatives, we can contribute to a more sustainable and ethical meat industry.</p>
    `,
        tags: ["Sustainable Farming", "Lab-Grown Meat", "Plant-Based Alternatives", "Technology", "Consumer Behavior"],
        category: "Sustainability"
    }

    if (!post) {
        notFound()
    }

    return post
}

export default async function BlogPost({ params }) {
    const post = await getBlogPost(params.slug)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative w-full h-[400px]">
                <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300"
                />
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                    </Link>
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <article className="lg:w-2/3">
                        <header className="mb-8">
                            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                            <div className="flex flex-wrap items-center text-gray-600 mb-4 gap-4">
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <Badge variant="secondary" className="mr-2">{post.category}</Badge>
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="mr-2">{tag}</Badge>
                                ))}
                            </div>
                        </header>
                        <div
                            className="prose prose-lg max-w-none mb-8"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                        <footer className="border-t border-gray-200 pt-8">
                            <h3 className="text-xl font-semibold mb-4">Share this post</h3>
                            <ShareButtons url={`https://yourblog.com/blog/${post.slug}`} title={post.title} />
                        </footer>
                    </article>
                    <aside className="lg:w-1/3">
                        <Suspense fallback={<div>Loading sidebar...</div>}>
                            <SinglePostSidebar />
                        </Suspense>
                    </aside>
                </div>
            </div>
            <Suspense fallback={<div>Loading related posts...</div>}>
                <div className='bg-gradient-to-r from-green-50 to-blue-50'>
                    <RelatedPosts currentPostSlug={post.slug} />
                </div>
            </Suspense>
            <Suspense fallback={<div>Loading comments...</div>}>
                <CommentSection postSlug={post.slug} />
            </Suspense>
        </div>
    )
}
