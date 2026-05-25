"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { ImageUpload } from "@/components/backend/image-upload"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  heroTitle: z.string().min(1, { message: "Hero title is required" }),
  heroImage: z.string().min(1, { message: "Hero image is required" }),
  featuredProductsTitle: z.string().min(1, { message: "Featured products title is required" }),
  featuredProductsImage: z.string().min(1, { message: "Featured products image is required" }),
  aboutUsTitle: z.string().min(1, { message: "About us title is required" }),
  aboutUsImage: z.string().min(1, { message: "About us image is required" }),
})

export default function HomepageContentPage() {
  const [previewImage, setPreviewImage] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heroTitle: "",
      heroImage: "",
      featuredProductsTitle: "",
      featuredProductsImage: "",
      aboutUsTitle: "",
      aboutUsImage: "",
    },
  })

  function onSubmit(values) {
    console.log(values)
    // Here you would typically send the data to your backend
  }

  const openPreview = (imageUrl) => {
    setPreviewImage(imageUrl)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Homepage Content</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Homepage Content</CardTitle>
          <CardDescription>
            Update the content and images for different sections of the homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Hero Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Hero Section</h2>
                <FormField
                  control={form.control}
                  name="heroTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hero Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter hero title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heroImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hero Image</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-4">
                          <ImageUpload
                            maxImages={1}
                            onChange={(files) => field.onChange(files[0] ? URL.createObjectURL(files[0]) : '')}
                          />
                          {field.value && (
                            <Button type="button" variant="outline" onClick={() => openPreview(field.value)}>
                              Preview
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Featured Products Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Featured Products Section</h2>
                <FormField
                  control={form.control}
                  name="featuredProductsTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Products Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter featured products title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="featuredProductsImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Products Image</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-4">
                          <ImageUpload
                            maxImages={1}
                            onChange={(files) => field.onChange(files[0] ? URL.createObjectURL(files[0]) : '')}
                          />
                          {field.value && (
                            <Button type="button" variant="outline" onClick={() => openPreview(field.value)}>
                              Preview
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* About Us Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">About Us Section</h2>
                <FormField
                  control={form.control}
                  name="aboutUsTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About Us Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter about us title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="aboutUsImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About Us Image</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-4">
                          <ImageUpload
                            maxImages={1}
                            onChange={(files) => field.onChange(files[0] ? URL.createObjectURL(files[0]) : '')}
                          />
                          {field.value && (
                            <Button type="button" variant="outline" onClick={() => openPreview(field.value)}>
                              Preview
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Image Preview Dialog */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
            <DialogDescription>
              Preview of the uploaded image.
            </DialogDescription>
          </DialogHeader>
          {previewImage && (
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <Image
                src={previewImage}
                alt="Preview"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

