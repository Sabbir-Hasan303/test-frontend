'use client'

// import Button from '@/components/Button'
// import Input from '@/components/Input'
import InputError from '@/components/InputError'
// import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'


import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Spinner from '@/components/Spinner'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()
        setLoading(true)

        await login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })

        setLoading(false)
    }

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <AuthSessionStatus className="mb-4" status={status} />

                    <Card className="border-none shadow-none">
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submitForm}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            className="block mt-1 w-full"
                                            placeholder="m@example.com"
                                            onChange={event => setEmail(event.target.value)}
                                            required
                                            autoFocus
                                        />

                                        <InputError messages={errors.email} className="mt-2" />
                                    </div>


                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            className="block mt-1 w-full"
                                            onChange={event => setPassword(event.target.value)}
                                            required
                                            autoComplete="current-password"
                                        />
                                        <InputError messages={errors.password} className="mt-2" />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember_me"
                                            onCheckedChange={(checked) => setShouldRemember(checked)}
                                            name="remember"
                                        // onChange={event => setShouldRemember(event.target.checked)}
                                        />
                                        <Label htmlFor="remember_me">Remember me</Label>
                                    </div>


                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                    {/* <Button variant="outline" className="w-full">
                                        Login with Google
                                    </Button> */}
                                </div>
                            </form>
                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="underline">
                                    Sign up
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    )
}

export default Login
