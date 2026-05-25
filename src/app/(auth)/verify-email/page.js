'use client'

import {Button} from '@/components/ui/button'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const VerifyEmail = () => {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleResendVerification = async () => {
        try {
            setLoading(true)
            setError(null)
            await resendEmailVerification({ setStatus })
        } catch (err) {
            setError('Failed to send verification email. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just
                emailed to you? If you didn't receive the email, we will gladly
                send you another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            {error && (
                <div className="mb-4 font-medium text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="mt-4 flex items-center justify-between">
                <Button
                    onClick={handleResendVerification}
                    disabled={loading || status === 'verification-link-sent'}>
                    {loading ? 'Sending...' : 'Resend Verification Email'}
                </Button>

                <button
                    type="button"
                    className="underline text-sm text-gray-600 hover:text-gray-900"
                    onClick={logout}>
                    Logout
                </button>
            </div>
        </>
    )
}

export default VerifyEmail
