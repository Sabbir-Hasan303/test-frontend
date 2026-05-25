import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Award, Shield } from 'lucide-react'

export const metadata = {
    title: "Licenses & Certifications | Village Meat Agro",
    description: "Village Meat Agro is a company that provides quality meat products to its customers.",
}

const certifications = [
    {
        name: "ISO 9001:2015",
        logo: "https://e7.pngegg.com/pngimages/269/421/png-clipart-certified-certified.png",
        description: "Certified for our Quality Management System, ensuring consistent, high-quality products and services.",
        validUntil: "Valid until: Dec 2025"
    },
    {
        name: "GOTS",
        logo: "https://png.pngtree.com/png-vector/20230526/ourmid/pngtree-gold-luxury-certified-badge-with-red-ribbon-and-white-combination-color-vector-png-image_7109577.png",
        description: "Global Organic Textile Standard certified, guaranteeing organic status of our textiles.",
        validUntil: "Valid until: Nov 2024"
    },
    {
        name: "Fair Trade Certified",
        logo: "https://static.vecteezy.com/system/resources/thumbnails/050/703/574/small_2x/certified-label-official-confirmation-of-quality-and-compliance-with-standards-png.png",
        description: "Committed to fair wages and safe working conditions throughout our supply chain.",
        validUntil: "Valid until: Sep 2024"
    },
    {
        name: "B Corp Certification",
        logo: "https://static.vecteezy.com/system/resources/thumbnails/050/703/574/small_2x/certified-label-official-confirmation-of-quality-and-compliance-with-standards-png.png",
        description: "Meets highest standards of verified social and environmental performance, transparency, and accountability.",
        validUntil: "Valid until: Aug 2025"
    },
    {
        name: "FSC Certification",
        logo: "https://png.pngtree.com/png-vector/20230526/ourmid/pngtree-gold-luxury-certified-badge-with-red-ribbon-and-white-combination-color-vector-png-image_7109577.png",
        description: "Forest Stewardship Council certified, ensuring our wood products come from responsibly managed forests.",
        validUntil: "Valid until: Jul 2024"
    },
    {
        name: "Energy Star Partner",
        logo: "https://e7.pngegg.com/pngimages/269/421/png-clipart-certified-certified.png",
        description: "Partnered with Energy Star for energy-efficient product development and practices.",
        validUntil: "Ongoing Partnership"
    }
]

const commitments = [
    {
        icon: <CheckCircle className="w-12 h-12 text-indigo-600 mx-auto" />,
        title: "Quality Assurance",
        description: "Rigorous testing and quality control measures to ensure product excellence."
    },
    {
        icon: <Award className="w-12 h-12 text-indigo-600 mx-auto" />,
        title: "Sustainability",
        description: "Committed to eco-friendly practices and materials in all our operations."
    },
    {
        icon: <Shield className="w-12 h-12 text-indigo-600 mx-auto" />,
        title: "Ethical Standards",
        description: "Upholding fair labor practices and responsible sourcing throughout our supply chain."
    }
]


export default function LicensesCertifications() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
                <Image
                    src="/assets/banner/licenses_bg.jpg"
                    alt="Licenses and Certifications hero image"
                    fill={true}
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Licenses & Certifications</h1>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                            Our commitment to quality, sustainability, and ethical practices
                        </p>
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-indigo-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-800">Our Credentials</h2>
                    <p className="text-lg text-gray-700 mb-8">
                        At VMAI, we're proud of our commitment to excellence. Our licenses and certifications reflect our dedication to quality, sustainability, and ethical business practices. These credentials are more than just badges – they're a testament to our ongoing efforts to provide you with products that meet the highest standards.
                    </p>
                </div>
            </section>

            {/* Certifications Grid */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-indigo-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-indigo-800">Our Certifications</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {certifications.map((cert, index) => (
                            <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <Image
                                            src={cert.logo}
                                            alt={`${cert.name} logo`}
                                            width={60}
                                            height={60}
                                            className="mr-4"
                                        />
                                        <h3 className="text-xl font-semibold text-indigo-700">{cert.name}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">{cert.description}</p>
                                    <Badge variant="outline" className="text-indigo-600 border-indigo-600">
                                        {cert.validUntil}
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Commitment Highlights */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-indigo-50 to-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-indigo-800">Our Commitments</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {commitments.map((commitment, index) => (
                            <div key={index} className="text-center">
                                {commitment.icon}
                                <h3 className="text-xl font-semibold mt-4 mb-2 text-indigo-700">{commitment.title}</h3>
                                <p className="text-gray-600">{commitment.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
