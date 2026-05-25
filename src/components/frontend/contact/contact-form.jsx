'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight } from 'lucide-react'

export function ContactForm() {
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(event) {
        event.preventDefault()
        setIsLoading(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            event.target.reset()
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">Send us a message</h2>
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-white">First name</Label>
                        <Input
                            id="firstName"
                            placeholder="John"
                            required
                            className="bg-white/20 !border-white/20 focus:!border-white/60 text-white !placeholder-white/40"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-white">Last name</Label>
                        <Input
                            id="lastName"
                            placeholder="Doe"
                            required
                            className="bg-white/20 !border-white/20  focus:!border-white/60 text-white !placeholder-white/40"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="bg-white/20 !border-white/20  focus:!border-white/60 text-white !placeholder-white/40"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <Textarea
                        id="message"
                        placeholder="Tell us about your project..."
                        required
                        className="min-h-[150px] bg-white/20 !border-white/20  focus:!border-white/60 text-white !placeholder-white/40"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-white text-gray-900 hover:bg-gray-100"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        'Sending...'
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            Submit
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    )}
                </Button>
            </form>
        </div>
    )
}

