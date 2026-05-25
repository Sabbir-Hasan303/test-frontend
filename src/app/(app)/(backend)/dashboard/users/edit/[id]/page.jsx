"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  role: z.string({
    required_error: "Please select a role.",
  }),
  nid: z.string().optional(),
  address: z.string().optional(),
})

// Mock function to fetch user data
const fetchUserData = async () => {
  // This would be an API call in a real application
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    name: "Alice Jonson",
    role: "dealer",
    email: "example@gmail.com",
    phone: "+236257462357462",
    address: "42929 Velma Rapids, USA",
    nid: "236257462357462",
  }
}

export default function EditUserPage({ params }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "admin",
      nid: "",
      address: "",
    },
  })

  useEffect(() => {
    async function loadUserData() {
      try {
        const userData = await fetchUserData(params.id)
        form.reset(userData)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [params.id, form])

  const onSubmit = async (values) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log("Updating user with values:", values)
      router.push("/dashboard/users")
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit User</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* ... other form fields */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="dealer">Dealer</SelectItem>
                      {/* Add more roles as needed */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ... other form fields */}
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </div>
  )
}

