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

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  productWeight: z.string(),
  quantity: z.string(),
  category: z.string(),
  tags: z.string(),
  sku: z.string(),
  regularPrice: z.string(),
  salePrice: z.string(),
  description: z.string(),
  metaDescription: z.string(),
})

export default function NewProductPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productWeight: "",
      quantity: "",
      category: "",
      tags: "",
      sku: "",
      regularPrice: "",
      salePrice: "",
      description: "",
      metaDescription: "",
    },
  })

  function onSubmit(values) {
    console.log(values)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add New Product</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Weight</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product weight" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter quantity" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="category1">Category 1</SelectItem>
                      <SelectItem value="category2">Category 2</SelectItem>
                      <SelectItem value="category3">Category 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tags" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="tag1">Tag 1</SelectItem>
                      <SelectItem value="tag2">Tag 2</SelectItem>
                      <SelectItem value="tag3">Tag 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter SKU" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="regularPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Regular Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter regular price" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter sale price" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="productImage"
            render={() => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <ImageUpload />
                </FormControl>
                <FormDescription>Upload up to 5 product images</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="metaDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter meta description"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full sm:w-auto">
            Add Product
          </Button>
        </form>
      </Form>
    </div>
  )
}

