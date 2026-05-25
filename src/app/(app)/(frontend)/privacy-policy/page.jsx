import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Shield, Lock, Eye, ScrollText } from 'lucide-react'

export const metadata = {
    title: "Privacy Policy | Village Meat Agro",
    description: "Village Meat Agro is a company that provides quality meat products to its customers.",
}

const privacyHighlights = [
    {
        icon: <Shield className="w-6 h-6 text-blue-600" />,
        title: "Data Protection",
        description: "We use industry-standard security measures to protect your personal information."
    },
    {
        icon: <Lock className="w-6 h-6 text-blue-600" />,
        title: "Secure Transactions",
        description: "All payment transactions are encrypted and processed securely."
    },
    {
        icon: <Eye className="w-6 h-6 text-blue-600" />,
        title: "Transparency",
        description: "We are clear about what data we collect and how we use it."
    }
]

const policyDetails = [
    {
        title: "1. Information We Collect",
        content: "We collect information that you provide directly to us, such as when you create an account, make a purchase, or contact our customer service. This may include your name, email address, postal address, phone number, and payment information. We also automatically collect certain information about your device and how you interact with our website, including your IP address, browser type, and browsing history."
    },
    {
        title: "2. How We Use Your Information",
        content: "We use the information we collect to provide, maintain, and improve our services, process your transactions, communicate with you, and personalize your experience. This includes sending you order confirmations, responding to your inquiries, and sending you marketing communications (if you've opted in). We may also use your information for analytics purposes to better understand our customers and improve our offerings."
    },
    {
        title: "3. Information Sharing and Disclosure",
        content: "We do not sell your personal information to third parties. We may share your information with service providers who perform services on our behalf, such as payment processing, data analysis, and customer service. We may also disclose your information if required by law or to protect our rights, property, or safety."
    },
    {
        title: "4. Data Retention",
        content: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need to use your information, we will securely delete or anonymize it."
    },
    {
        title: "5. Security Measures",
        content: "We implement a variety of security measures to protect your personal information, including encryption, firewalls, and secure server facilities. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security."
    },
    {
        title: "6. Cookies and Tracking Technologies",
        content: "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings. Please note that disabling cookies may affect the functionality of our website."
    },
    {
        title: "7. Third-Party Links",
        content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to review the privacy policies of any third-party sites you visit."
    },
    {
        title: "8. Children's Privacy",
        content: "Our services are not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will promptly delete that information."
    }
]

const privacyRights = [
    {
        title: "Access Your Data",
        description: "You have the right to access the personal information we hold about you and to request a copy of your data."
    },
    {
        title: "Correct Your Data",
        description: "If you believe any information we have about you is incorrect or incomplete, you can request a correction."
    },
    {
        title: "Delete Your Data",
        description: "In certain circumstances, you can request that we delete your personal information from our records."
    },
    {
        title: "Object to Processing",
        description: "You have the right to object to our processing of your personal information in certain situations."
    },
    {
        title: "Data Portability",
        description: "You can request to receive your personal data in a structured, commonly used, and machine-readable format."
    },
    {
        title: "Withdraw Consent",
        description: "If we are processing your data based on your consent, you have the right to withdraw that consent at any time."
    }
]


export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
            {/* Hero Section */}
            <section className="bg-blue-600 text-white py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <ScrollText className="w-16 h-16 mx-auto mb-6" />
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
                    <p className="text-xl md:text-2xl mb-8 container mx-auto">
                        Your privacy is our priority. Learn how we protect and manage your personal information.
                    </p>
                    {/* <ArrowDown className="w-12 h-12 mx-auto animate-bounce" /> */}
                </div>
                <div className="absolute inset-0 bg-blue-700 opacity-50 transform -skew-y-6"></div>
            </section>

            <div className="container mx-auto py-16 px-4 md:px-8 lg:px-16">
                {/* Introduction Section */}
                <section className="">
                    <Card className="bg-white shadow-xl">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold text-gray-800">Our Commitment to Your Privacy</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-gray-700 mb-8">
                                At Village Meat Agro Industries (VMAI), we value your trust and are committed to protecting your personal information.
                                This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you use our website or services.
                                We encourage you to read this policy carefully to understand our practices regarding your personal information.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                {privacyHighlights.map((highlight, index) => (
                                    <Card key={index} className="bg-stone-50 border-teal-200">
                                        <CardContent className="pt-6">
                                            <div className="flex items-center mb-4">
                                                {highlight.icon}
                                                <h3 className="text-lg font-semibold text-blue-800 ml-3">{highlight.title}</h3>
                                            </div>
                                            <p className="text-sm text-gray-600">{highlight.description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>


            {/* Main Content Section */}
            <section className="bg-white">
                <div className="container mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Detailed Privacy Policy</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {policyDetails.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 hover:text-blue-600">
                                    {item.title}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-700">
                                    {item.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>


            {/* Your Rights Section */}
            <section className="bg-gray-50">
                <div className="container mx-auto py-16 px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Privacy Rights</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {privacyRights.map((right, index) => (
                            <Card key={index} className="bg-stone-50 border-teal-200">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-3 text-gray-700">{right.title}</h3>
                                    <p className="text-gray-600">{right.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-red-700 text-white">
                <div className="container mx-auto text-center py-16 px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Questions About Our Privacy Policy?</h2>
                    <p className="text-xl mb-8">
                        We're here to help you understand how we protect your personal information. If you have any questions, please don't hesitate to reach out.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild size="lg" className="bg-white text-red-700 hover:bg-green-100 transition-colors duration-300">
                            <Link href="/contact">Contact Our Privacy Team</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-red-600 transition-colors duration-300">
                            <Link href="/faq">View Privacy FAQs</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer Note */}
            <section className="bg-gray-100">
                <div className="container mx-auto text-center py-8 px-4 md:px-8 lg:px-16">
                    <p className="text-sm text-gray-600">
                        Last updated: {new Date().toLocaleDateString()}. This Privacy Policy is subject to change. Please check back regularly for updates.
                    </p>
                </div>
            </section>
        </div>
    )
}
