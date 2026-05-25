import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
    title: "Refund & Return Policy | Village Meat Agro",
    description: "Village Meat Agro is a company that provides quality meat products to its customers.",
}


export default function RefundReturnPolicy() {
    return (
        <div className="min-h-screen">
            {/* Policy Content Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-amber-50">
                <div className="container mx-auto">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-amber-800">Refund & Return Policy</h2>
                    <Tabs defaultValue="returns" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="returns">Returns</TabsTrigger>
                            <TabsTrigger value="refunds">Refunds</TabsTrigger>
                        </TabsList>
                        <TabsContent value="returns">
                            <Card>
                                <CardContent className="pt-6">
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 text-amber-800">Return Policy</h2>
                                    <p className="mb-4">We want you to be completely satisfied with your purchase. If you're not happy with your order, we offer a hassle-free return policy:</p>
                                    <ul className="list-disc pl-6 mb-4 space-y-2">
                                        <li>You have 30 days from the date of delivery to return your item(s).</li>
                                        <li>Items must be unused, unworn, and in their original packaging with all tags attached.</li>
                                        <li>For hygiene reasons, we cannot accept returns on certain items such as earrings, undergarments, or opened beauty products.</li>
                                        <li>Custom or personalized items are non-returnable unless defective.</li>
                                    </ul>
                                    <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 text-amber-700">How to Initiate a Return</h3>
                                    <ol className="list-decimal pl-6 mb-4 space-y-2">
                                        <li>Log into your account and go to your order history.</li>
                                        <li>Select the item(s) you wish to return and choose a reason for the return.</li>
                                        <li>Print the pre-paid return label provided.</li>
                                        <li>Pack the item(s) securely and attach the return label.</li>
                                        <li>Drop off the package at your nearest post office or schedule a pickup.</li>
                                    </ol>
                                    <p>Once we receive and process your return, we'll notify you via email.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="refunds">
                            <Card>
                                <CardContent className="pt-6">
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 text-amber-800">Refund Policy</h2>
                                    <p className="mb-4">We process refunds promptly to ensure your satisfaction:</p>
                                    <ul className="list-disc pl-6 mb-4 space-y-2">
                                        <li>Refunds are typically processed within 3-5 business days after we receive your return.</li>
                                        <li>The refund will be credited back to the original payment method used for the purchase.</li>
                                        <li>For credit card payments, it may take an additional 5-10 business days for the refund to appear on your statement, depending on your card issuer.</li>
                                        <li>If you used store credit or a gift card, the amount will be added back to your account or a new gift card will be issued.</li>
                                    </ul>
                                    <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 text-amber-700">Exceptions</h3>
                                    <ul className="list-disc pl-6 mb-4 space-y-2">
                                        <li>Items marked as "Final Sale" are not eligible for refunds.</li>
                                        <li>If you received a defective or incorrect item, we'll cover the return shipping costs and process a full refund or exchange.</li>
                                        <li>Shipping fees are non-refundable unless the return is due to our error.</li>
                                    </ul>
                                    <p className="mb-4">If you have any questions about your refund, please don't hesitate to contact our customer service team.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-red-700 text-white py-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Need More Help?</h2>
                    <p className="text-xl mb-8">
                        Our customer support team is always ready to assist you with any questions or concerns.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild size="lg" className="bg-white text-red-700 hover:bg-green-100 transition-colors duration-300">
                            <Link href="/contact">Contact Support</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-red-600 transition-colors duration-300">
                            <Link href="/faq">View FAQs</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}


