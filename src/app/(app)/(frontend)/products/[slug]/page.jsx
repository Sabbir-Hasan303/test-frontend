import { notFound } from 'next/navigation'
import { ProductView } from '@/components/frontend/products/product-view'
import { ReviewsSection } from '@/components/frontend/products/reviews-section'
import { RelatedProducts } from '@/components/frontend/products/related-products'

// This would typically come from a database or API
const product = {
  id: '1',
  name: 'Organic Moringa Powder 52g, Superfood Supplement',
  slug: 'organic-moringa-powder',
  currentPrice: 664.00,
  originalPrice: 2999.00,
  discount: 78,
  description: 'Lorem Ipsum is simply dummy text of the printing and typ m has been the industry\'s standard dummy text ever sinc',
  ratings: 992,
  stars: 4,
  images: [
    '/assets/Products/Daal_Puri.png',
    '/assets/Products/Meat_Ball.png',
    '/assets/Products/Mini_Samussa.png',
    '/assets/Products/Nuggets.png',
  ],
  type: 'Organic',
  sku: 'FWM15VKT',
  mfg: 'Jun 4.2024',
  tags: ['Snack', 'Organic', 'Brown'],
  life: '70 days',
  stock: '8 Items In Stock',
  weightOptions: [
    { value: '250g', label: '250g' },
    { value: '500g', label: '500g' },
    { value: '1kg', label: '1kg' },
    { value: '2kg', label: '2kg' },
  ],
  delivery: {
    standard: {
      text: 'Standard Delivery',
      guarantee: 'Guaranteed by 10-13 Dec',
      cost: 150
    },
    cashOnDelivery: true,
    returns: '7 Days Returns'
  }
}

export const metadata = {
  title: product.name,
  description: product.description,
}

// /**
//  * @param {Object} props
//  * @param {Object} props.params
//  * @param {string} props.params.slug
//  */
export default function ProductPage({ params }) {
  if (params.slug !== product.slug) {
    notFound()
  }

  return (
    <>
        <ProductView product={product} />
        <ReviewsSection />
        <RelatedProducts />
    </>
  )
}

