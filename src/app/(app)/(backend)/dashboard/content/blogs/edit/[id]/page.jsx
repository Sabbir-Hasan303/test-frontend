"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/backend/image-upload"
import { RichTextEditor } from "@/components/backend/rich-text-editor"

// Define the form schema using Zod
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  tags: z.string({
    required_error: "Please select at least one tag.",
  }),
  author: z.string({
    required_error: "Please select an author.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  metaDescription: z.string().min(10, {
    message: "Meta description must be at least 10 characters.",
  }),
  status: z.string({
    required_error: "Please select a status.",
  }),
})

// Mock function to fetch blog data
const fetchBlogData = async () => {
  // In a real application, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
  return {
    title: "Example Blog Post",
    slug: "example-blog-post",
    category: "technology",
    tags: "featured",
    author: "john-doe",
    description: "This is an example blog post description.",
    metaDescription: "Meta description for SEO purposes.",
    status: "published",
    banner: "/placeholder.svg?height=300&width=300",
    thumbnail: "/placeholder.svg?height=100&width=100"
  }
}

export default function EditBlogPage({ params }) {
  const [isLoading, setIsLoading] = useState(true)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      tags: "",
      author: "",
      description: "",
      metaDescription: "",
      status: "",
    },
  })

  useEffect(() => {
    const loadBlogData = async () => {
      setIsLoading(true)
      const blogData = await fetchBlogData(params.id)
      form.reset(blogData)
      setIsLoading(false)
    }
    loadBlogData()
  }, [params.id, form])

  // Update the onSubmit function to accept values without type annotations
  function onSubmit(values) {
    console.log(values)
    // Here you would typically send the updated data to your backend
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Blog Post</h1>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={() => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title"  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={() => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter slug"  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="category"
                render={() => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    {/* <Select onValueChange={field.onChange} defaultValue={field.value}> */}
                    <Select>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <Select>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Tags" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="trending">Trending</SelectItem>
                        <SelectItem value="popular">Popular</SelectItem>
                        <SelectItem value="editor-choice">Editor's Choice</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={() => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <Select>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Author" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="john-doe">John Doe</SelectItem>
                        <SelectItem value="jane-smith">Jane Smith</SelectItem>
                        <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={() => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <RichTextEditor />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="metaDescription"
                    render={() => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter meta description"
                        className="resize-none"
                      />
                    </FormControl>
                    <FormDescription>
                      This will be used for SEO purposes.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={() => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="banner"
                render={() => (
                  <FormItem>
                    <FormLabel>Update Banner</FormLabel>
                    <FormControl>
                      <ImageUpload maxImages={1} />
                    </FormControl>
                    <FormDescription>
                      Recommended size: 1200x630 pixels
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumbnail"
                render={() => (
                  <FormItem>
                    <FormLabel>Update Thumbnail</FormLabel>
                    <FormControl>
                      <ImageUpload maxImages={1} />
                    </FormControl>
                    <FormDescription>
                      Recommended size: 400x400 pixels
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Update Blog Post</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

