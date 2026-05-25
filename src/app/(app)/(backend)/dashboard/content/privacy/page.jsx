"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
Card,
CardContent,
CardDescription,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/form"
import { RichTextEditor } from "@/components/backend/rich-text-editor"

// Define the form schema using Zod
const formSchema = z.object({
content: z.string().min(1, {
  message: "Privacy Policy content is required.",
}),
})

export default function PrivacyPolicyPage() {
const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    content: "",
  },
})

// Update the onSubmit function to accept values without type annotations
function onSubmit(values) {
  console.log(values)
  // Here you would typically send the data to your backend
}

return (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Privacy Policy Content</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Edit Privacy Policy Content</CardTitle>
        <CardDescription>
          Update the Privacy Policy page content. This will be displayed to your customers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="content"
              render={() => (
                <FormItem>
                  <FormLabel>Privacy Policy</FormLabel>
                  <FormControl>
                    <RichTextEditor />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  </div>
)
}

