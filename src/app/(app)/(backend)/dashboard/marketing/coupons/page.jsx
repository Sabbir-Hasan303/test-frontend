"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil, Trash2 } from 'lucide-react'
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
    Form,
    FormControl,
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
import { Switch } from "@/components/ui/switch"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const formSchema = z.object({
  offerName: z.string().min(2, {
    message: "Offer name must be at least 2 characters.",
  }),
  offerType: z.string(),
  value: z.string(),
  maxDiscount: z.string(),
  code: z.string(),
})

/**
 * @typedef {Object} Offer
 * @property {string} id
 * @property {string} name
 * @property {'Discount' | 'Promo Code'} type
 * @property {string} value
 * @property {string} code
 * @property {'Active' | 'Inactive'} status
 */

const initialOffers = [
  {
    id: "1",
    name: "Summer Sale",
    type: "Discount",
    value: "20%",
    code: "SUMMER20",
    status: "Active",
  },
  {
    id: "2",
    name: "Free Shipping",
    type: "Promo Code",
    value: "Free Shipping",
    code: "FREESHIP",
    status: "Active",
  },
]

export default function DiscountCouponsPage() {
  const [offers, setOffers] = useState(initialOffers)
  const [editingOffer, setEditingOffer] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      offerName: "",
      offerType: "",
      value: "",
      maxDiscount: "",
      code: "",
    },
  })

  function onSubmit(values) {
    if (editingOffer) {
      // Update existing offer
      setOffers(offers.map(offer =>
        offer.id === editingOffer.id
          ? { ...offer, ...values, type: values.offerType }
          : offer
      ));
      setEditingOffer(null);
    } else {
      // Create new offer
      const newOffer = {
        id: Math.random().toString(36).substr(2, 9),
        name: values.offerName,
        type: values.offerType,
        value: values.value,
        code: values.code,
        status: "Active",
      };
      setOffers([...offers, newOffer]);
    }
    form.reset();
  }

  const handleEditOffer = (offer) => {
    setEditingOffer(offer);
    form.reset({
      offerName: offer.name,
      offerType: offer.type,
      value: offer.value,
      code: offer.code,
    });
  };

  const handleStatusChange = (offerId, isActive) => {
    setOffers(offers.map(offer =>
      offer.id === offerId ? { ...offer, status: isActive ? "Active" : "Inactive" } : offer
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-semibold">Discount & Coupon</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create New Offer</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="offerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Offer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Summer Sale" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="offerType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Offer Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Discount">Discount</SelectItem>
                            <SelectItem value="Promo Code">Promo Code</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input placeholder="20" className="w-full" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="maxDiscount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Discount Threshold</FormLabel>
                        <FormControl>
                          <Input placeholder="20" className="w-full" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code (if applicable)</FormLabel>
                        <FormControl>
                          <Input placeholder="SUMMER20" className="w-full" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  {editingOffer ? 'Update Offer' : 'Create Offer'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Offer List</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="hidden sm:table-cell">Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {offers.map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell className="font-medium">{offer.name}</TableCell>
                      <TableCell>{offer.type}</TableCell>
                      <TableCell>{offer.value}</TableCell>
                      <TableCell className="hidden sm:table-cell">{offer.code}</TableCell>
                      <TableCell>
                        <Switch
                          checked={offer.status === "Active"}
                          onCheckedChange={(checked) => handleStatusChange(offer.id, checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditOffer(offer)}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <Dialog open={editingOffer !== null} onOpenChange={(open) => !open && setEditingOffer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Offer</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="offerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Offer Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="offerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Offer Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Discount">Discount</SelectItem>
                        <SelectItem value="Promo Code">Promo Code</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

