'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Truck, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'

const CheckoutPage = () => {
  const [shippingAddress, setShippingAddress] = useState('existing')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [notes, setNotes] = useState('')
  const [checkoutItems, setCheckoutItems] = useState([
    { id: 1, name: "Premium Grass-Fed Beef", quantity: 2, price: 57.70, slug: "premium-beef", image: "https://www.villagemeatagro.com/_next/image?url=%2Fassets%2FProducts%2FDaal_Puri.png&w=1920&q=75" },
    { id: 2, name: "Organic Free-Range Chicken", quantity: 1, price: 29.85, slug: "organic-chicken", image: "https://www.villagemeatagro.com/_next/image?url=%2Fassets%2FProducts%2FDaal_Puri.png&w=1920&q=75" },
    { id: 3, name: "Fresh Organic Vegetables Pack", quantity: 1, price: 15.99, slug: "organic-veggies", image: "https://www.villagemeatagro.com/_next/image?url=%2Fassets%2FProducts%2FDaal_Puri.png&w=1920&q=75" },
  ])

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value)
    if (value === 'online') {
      alert("Redirecting to SSLCommerz for payment...")
    }
  }

  const updateQuantity = (id, change) => {
    setCheckoutItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id) => {
    setCheckoutItems(items => items.filter(item => item.id !== id))
  }

  const applyCoupon = () => {
    if (couponCode === 'HEALTH10') {
      setDiscount(10)
    } else {
      alert('Invalid coupon code')
    }
  }

  const subtotal = checkoutItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const total = subtotal - discount

  const handlePlaceOrder = () => {
    alert("Order placed successfully!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-stone-800">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Your Cart */}
            <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-[#64748b] to-[#cbd5e1]">
                <CardTitle className="text-white">Your Cart</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 bg-stone-100 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-stone-200">
                      <div className="relative w-20 h-20 overflow-hidden rounded-md group">
                        <Image
                          src={item.image}
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-grow">
                        <Link href={`/products/${item.slug}`} className="text-lg font-semibold text-stone-800 hover:text-[#2563eb] transition-colors duration-300">
                          {item.name}
                        </Link>
                        <p className="text-stone-600">${item.price.toFixed(2)}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, -1)} className="h-8 w-8 bg-white hover:bg-green-100 text-stone-800 border-stone-300">
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium text-stone-800">{item.quantity}</span>
                          <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, 1)} className="h-8 w-8 bg-white hover:bg-green-100 text-stone-800 border-stone-300">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-stone-800">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-red-500 bg-red-100 hover:text-white hover:bg-red-700 transition-colors duration-300">
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button variant="outline" asChild className="w-full bg-[#155e75] hover:bg-[#0891b2] text-white hover:text-white border-stone-300">
              <Link href="/shop" className="flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Continue Shopping Products
              </Link>
            </Button>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Shipping Information */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-[#a1a1aa] to-[#d4d4d8]">
                <CardTitle className="text-white">Shipping</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-2">
                  <Label htmlFor="shippingAddress" className="text-stone-800">Shipping Address</Label>
                  <Select value={shippingAddress} onValueChange={setShippingAddress}>
                    <SelectTrigger className="bg-white border-stone-300 text-stone-800">
                      <SelectValue placeholder="Select shipping address" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="existing">123 Street, Green City, EC 12345</SelectItem>
                      <SelectItem value="new">Add new address</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {shippingAddress === 'new' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-stone-800">First Name</Label>
                        <Input id="firstName" placeholder="John" className="bg-white border-stone-300 text-stone-800 placeholder-stone-400" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-stone-800">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" className="bg-white border-stone-300 text-stone-800 placeholder-stone-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-stone-800">Address</Label>
                      <Input id="address" placeholder="123 Street" className="bg-white border-stone-300 text-stone-800 placeholder-stone-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-stone-800">City</Label>
                        <Input id="city" placeholder="Green City" className="bg-white border-stone-300 text-stone-800 placeholder-stone-400" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode" className="text-stone-800">ZIP Code</Label>
                        <Input id="zipCode" placeholder="EC 12345" className="bg-white border-stone-300 text-stone-800 placeholder-stone-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-stone-800">Country</Label>
                      <Select>
                        <SelectTrigger className="bg-white border-stone-300 text-stone-800">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-stone-800">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="bg-white border-stone-300 text-stone-800 placeholder-stone-400" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-stone-800">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" className="bg-white border-stone-300 text-stone-800 placeholder-stone-400" />
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700">
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-800">Subtotal:</span>
                    <span className="font-semibold text-stone-800">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-800">Discount:</span>
                    <span className="font-semibold text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-stone-800">Total:</span>
                    <span className="text-stone-800">${total.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-stone-300">
                    <Label htmlFor="coupon" className="text-stone-800">Apply Coupon</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        id="coupon"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-grow bg-white border-stone-300 text-stone-800 placeholder-stone-400"
                      />
                      <Button onClick={applyCoupon} className="bg-green-600 hover:bg-green-700 text-white">Apply</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-stone-400 to-stone-700">
                <CardTitle className="text-white">Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" className="border-stone-400 text-stone-600" />
                    <Label htmlFor="cod" className="flex items-center text-stone-800">
                      <Truck className="w-4 h-4 mr-2" />
                      Cash on Delivery (COD)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" className="border-stone-400 text-stone-600" />
                    <Label htmlFor="online" className="flex items-center text-stone-800">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Online Payment (SSLCommerz)
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Order Notes */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-[#e03b25] to-[#c72825]">
                <CardTitle className="text-white">Special Instructions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-stone-800">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions for your order?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="bg-white border-stone-300 text-stone-800 placeholder-stone-400"
                  />
                </div>
              </CardContent>
            </Card>



            <div className="mt-8">
                <Button onClick={handlePlaceOrder} className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 transition-colors duration-300 w-full">
                    Place Order
                </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CheckoutPage

