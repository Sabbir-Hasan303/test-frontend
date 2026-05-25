"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

/**
 * @typedef {Object} Ticket
 * @property {string} productName
 * @property {string} user
 * @property {string} ticketText
 * @property {'Pending'|'Resolved'} status
 */

const tickets = [
  {
    productName: "Product 1",
    user: "Alice Jonson",
    ticketText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    status: "Pending",
  },
  {
    productName: "Product 2",
    user: "Alice Jonson",
    ticketText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    status: "Pending",
  },
  {
    productName: "Product 3",
    user: "Alice Jonson",
    ticketText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    status: "Pending",
  },
  {
    productName: "Product 4",
    user: "Alice Jonson",
    ticketText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    status: "Pending",
  },
]

export default function SupportTicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [response, setResponse] = useState("")

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket)
  }

  const handleSendResponse = () => {
    if (selectedTicket && response) {
      console.log("Sending response:", response, "for ticket:", selectedTicket)
      // Here you would typically send the response to your backend
      setResponse("")
      setSelectedTicket(null)
    }
  }

  const handleDelete = (index) => {
    // Here you would typically delete the ticket from your backend
    console.log("Deleting ticket at index:", index)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Support Tickets</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-4">
          {tickets.map((ticket, index) => (
            <Card key={index} onClick={() => handleTicketSelect(ticket)} className="cursor-pointer">
              <CardHeader>
                <CardTitle>{ticket.productName}</CardTitle>
                <p className="text-sm text-muted-foreground">From: {ticket.user}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{ticket.ticketText}</p>
              </CardContent>
              <div className="flex justify-end gap-2 p-4 pt-0">
                <Badge variant="secondary" className={ticket.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}>
                  {ticket.status}
                </Badge>
                <Button variant="destructive" size="sm" onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(index)
                }}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          {selectedTicket && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedTicket.productName}</CardTitle>
                <p className="text-sm text-muted-foreground">From: {selectedTicket.user}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{selectedTicket.ticketText}</p>
                <h3 className="mt-4 font-medium">Response</h3>
                <Textarea
                  placeholder="Type your response here..."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="mt-2"
                />
              </CardContent>
              <CardFooter>
                <Button onClick={handleSendResponse}>Send Response</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground">Footer</p>
    </div>
  )
}

