"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil, Trash2 } from 'lucide-react'
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
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
    DialogTitle,
    DialogTrigger,
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
import { Textarea } from "@/components/ui/textarea"

// Define the form schema using Zod
const formSchema = z.object({
  question: z.string().min(1, { message: "Question is required" }),
  answer: z.string().min(1, { message: "Answer is required" }),
})

export default function FaqPage() {
  const [faqItems, setFaqItems] = useState([])
  const [editingItem, setEditingItem] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  })

  function onSubmit(values) {
    if (editingItem) {
      setFaqItems(faqItems.map(item =>
        item.id === editingItem.id ? { ...item, ...values } : item
      ))
      setEditingItem(null)
    } else {
      const newItem = {
        ...values,
        id: Date.now().toString(),
      }
      setFaqItems([...faqItems, newItem])
    }
    form.reset()
  }

  function handleEdit(item) {
    setEditingItem(item)
    form.reset(item)
  }

  function handleDelete(id) {
    setFaqItems(faqItems.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage FAQ</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editingItem ? "Edit FAQ Item" : "Add New FAQ Item"}</CardTitle>
          <CardDescription>
            {editingItem ? "Update the question and answer" : "Enter a new question and answer for the FAQ"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the question" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter the answer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{editingItem ? "Update" : "Add"} FAQ Item</Button>
              {editingItem && (
                <Button type="button" variant="outline" onClick={() => {
                  setEditingItem(null)
                  form.reset()
                }}>
                  Cancel Edit
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>FAQ Items</CardTitle>
          <CardDescription>Manage your existing FAQ items</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem value={item.id} key={item.id}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>{item.question}</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently delete the FAQ item.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => handleDelete(item.id)}>
                              Delete
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

