"use client"

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

export default function NewBlogPage() {
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
      status: "draft",
    },
  })

  // Update the onSubmit function to accept values without type annotations
  function onSubmit(values) {
    console.log(values)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-semibold">Add New Blog</h1>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={() => (
                  <FormItem className="flex-1">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={() => (
                  <FormItem className="flex-1">
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter slug" className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
              <FormField
                control={form.control}
                name="category"
                render={() => (
                  <FormItem className="flex-1">
                    <FormLabel>Category</FormLabel>
                    <Select>
                      <FormControl>
                        <SelectTrigger className="w-full">
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
                  <FormItem className="flex-1">
                    <FormLabel>Tags</FormLabel>
                    <Select>
                      <FormControl>
                        <SelectTrigger className="w-full">
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
                  <FormItem className="flex-1">
                    <FormLabel>Author</FormLabel>
                    <Select>
                      <FormControl>
                        <SelectTrigger className="w-full">
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
                    <div className="min-h-[200px] overflow-hidden rounded-md border">
                      <RichTextEditor />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="metaDescription"
                render={() => (
                  <FormItem className="flex-1">
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter meta description"
                        className="resize-none min-h-[100px]"
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
                  <FormItem className="flex-1">
                    <FormLabel>Status</FormLabel>
                    <Select>
                      <FormControl>
                        <SelectTrigger className="w-full">
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

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="banner"
                render={() => (
                  <FormItem className="flex-1">
                    <FormLabel>Banner Image</FormLabel>
                    <FormControl>
                      <div className="overflow-hidden rounded-md border">
                        <ImageUpload />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button type="submit" className="w-full sm:w-auto">
                Create Blog Post
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

