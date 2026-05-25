import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, BookOpen, Shield, ArrowDown } from 'lucide-react'

export const metadata = {
    title: "Terms and Conditions | Village Meat Agro",
    description: "Village Meat Agro is a company that provides quality meat products to its customers.",
}

const keyPoints = [
    "You must be 18 years or older to use our services",
    "We prioritize the privacy and security of your personal information",
    "All content on this website is the property of VMAI",
    "We reserve the right to modify or terminate services at any time",
    "By using our site, you agree to our dispute resolution process"
]

const commitmentPoints = [
    "Providing high-quality, sustainable products",
    "Ensuring a secure and user-friendly shopping experience",
    "Respecting your privacy and protecting your data",
    "Offering transparent pricing and fair business practices",
    "Continuously improving our services based on customer feedback"
]


export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
            <section className="bg-blue-600 text-white py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Terms & Conditions</h1>
                    <p className="text-xl md:text-2xl mb-8 container mx-auto">
                        Our commitment to transparency and fair business practices
                    </p>
                    <ArrowDown className="w-12 h-12 mx-auto animate-bounce" />
                </div>
                <div className="absolute inset-0 bg-blue-700 opacity-50 transform -skew-y-6"></div>
            </section>

            {/* Introduction Section */}
            <section>
                <div className="container mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <Card className="bg-white shadow-xl">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold text-gray-800">Welcome to VMAI's Terms & Conditions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-gray-700 mb-8">
                                At Village Meat Agro Industries (VMAI), we're committed to transparency and fairness in our operations.
                                These Terms and Conditions are designed to protect both you, our valued customer, and our business.
                                They govern your use of the VMAI website and services. By accessing or using our website, you agree
                                to be bound by these terms. We encourage you to read them carefully and reach out if you have any questions.
                            </p>
                            <div className="grid md:grid-cols-2 gap-8">
                                <Card className="bg-green-100 border-green-300">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-semibold text-green-800 flex items-center">
                                            <BookOpen className="w-6 h-6 mr-2" />
                                            Key Points to Remember
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {keyPoints.map((point, index) => (
                                                <li key={index} className="flex items-start">
                                                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card className="bg-red-100 border-red-300">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-semibold text-red-800 flex items-center">
                                            <Shield className="w-6 h-6 mr-2" />
                                            Our Commitment to You
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {commitmentPoints.map((point, index) => (
                                                <li key={index} className="flex items-start">
                                                    <CheckCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-1" />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>


            {/* CTA Section */}
            <section className="bg-red-700 text-white py-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Clarification?</h2>
                    <p className="text-xl mb-8">
                        We're here to help you understand our Terms & Conditions. If you have any questions, please don't hesitate to reach out.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild size="lg" className="bg-white text-red-700 hover:bg-green-100 transition-colors duration-300">
                            <Link href="/contact">Contact Our Legal Team</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-red-600 transition-colors duration-300">
                            <Link href="/faq">View FAQs</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer Note */}
            <section className="bg-gray-100 py-8 px-4 md:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sm text-gray-600">
                        Last updated: {new Date().toLocaleDateString()}. These Terms & Conditions are subject to change. Please check back regularly for updates.
                    </p>
                </div>
            </section>
        </div>
    )
}
