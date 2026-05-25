"use client"

import { Pencil } from 'lucide-react'
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
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
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

/**
 * @typedef {Object} Gateway
 * @property {string} name
 * @property {Object.<string, string>} fields
 */

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Gateway name must be at least 2 characters.",
  }),
  key: z.string().min(1, {
    message: "Key is required.",
  }),
  secret: z.string().min(1, {
    message: "Secret is required.",
  }),
  webhookUrl: z.string().url("Invalid URL."),
})

export default function PaymentSettingsPage() {
  const [gateways, setGateways] = useState([
    { name: "Stripe", fields: { name: "", key: "", secret: "", webhookUrl: "" } },
    { name: "bKash", fields: { name: "", key: "", secret: "", webhookUrl: "" } },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingGatewayIndex, setEditingGatewayIndex] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      key: "",
      secret: "",
      webhookUrl: "",
    },
  })

  const handleFieldChange = (gatewayIndex, fieldName, value) => {
    setGateways(prevGateways => {
      const updatedGateways = [...prevGateways]
      updatedGateways[gatewayIndex].fields[fieldName] = value
      return updatedGateways
    })
  }

  const handleSave = () => {
    // Here you would typically send the updated settings to your backend
    console.log("Saving payment settings:", gateways)
  }

  const handleAddNew = () => {
    form.reset()
    setEditingGatewayIndex(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (index) => {
    setEditingGatewayIndex(index)
    form.reset(gateways[index].fields)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingGatewayIndex(null)
  }

  const onSubmit = (values) => {
    if (editingGatewayIndex !== null) {
      setGateways(prevGateways => {
        const updatedGateways = [...prevGateways]
        updatedGateways[editingGatewayIndex] = { name: updatedGateways[editingGatewayIndex].name, fields: values }
        return updatedGateways
      })
      setEditingGatewayIndex(null)
    } else {
      setGateways(prevGateways => [...prevGateways, { name: values.name, fields: values }])
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Payment Settings</h1>

      <div className="p-4 border rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Gateway Settings</h2>
          <Button onClick={handleAddNew}>ADD New</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {gateways.map((gateway, index) => (
            <Card key={index} className="border-gray-200">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{gateway.name}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(index)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor={`gatewayName-${index}`}>Name</Label>
                    <Input
                      id={`gatewayName-${index}`}
                      value={gateway.fields.name}
                      onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                      className="bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor={`gatewayKey-${index}`}>Key</Label>
                    <Input
                      id={`gatewayKey-${index}`}
                      value={gateway.fields.key}
                      onChange={(e) => handleFieldChange(index, "key", e.target.value)}
                      className="bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor={`gatewaySecret-${index}`}>Secret</Label>
                    <Input
                      id={`gatewaySecret-${index}`}
                      value={gateway.fields.secret}
                      onChange={(e) => handleFieldChange(index, "secret", e.target.value)}
                      className="bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor={`gatewayWebhook-${index}`}>Webhook URL</Label>
                    <Input
                      id={`gatewayWebhook-${index}`}
                      value={gateway.fields.webhookUrl}
                      onChange={(e) => handleFieldChange(index, "webhookUrl", e.target.value)}
                      className="bg-gray-100"
                      readOnly
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save</Button>
      </div>
      <p className="text-center text-sm text-muted-foreground">Footer</p>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingGatewayIndex !== null ? "Edit Gateway" : "Add New Gateway"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter gateway name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secret <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter secret" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="webhookUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Webhook URL <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter webhook URL" {...field} type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{editingGatewayIndex !== null ? "Update Gateway" : "Create Gateway"}</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

