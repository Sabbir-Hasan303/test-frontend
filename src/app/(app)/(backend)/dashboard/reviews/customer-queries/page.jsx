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
 * @typedef {Object} Query
 * @property {string} productName
 * @property {string} user
 * @property {string} queryText
 * @property {'Pending'|'Resolved'} status
 */

const queries = [
  {
    productName: "Product 1",
    user: "Alice Jonson",
    queryText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    status: "Pending",
  },
  {
    productName: "Product 2",
    user: "Alice Jonson",
    queryText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    status: "Pending",
  },
  {
    productName: "Product 3",
    user: "Alice Jonson",
    queryText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    status: "Pending",
  },
  {
    productName: "Product 4",
    user: "Alice Jonson",
    queryText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    status: "Pending",
  },
]

export default function CustomerQueriesPage() {
  const [selectedQuery, setSelectedQuery] = useState(null)
  const [response, setResponse] = useState("")

  const handleQuerySelect = (query) => {
    setSelectedQuery(query)
  }

  const handleSendResponse = () => {
    if (selectedQuery && response) {
      console.log("Sending response:", response, "for query:", selectedQuery)
      // Here you would typically send the response to your backend
      setResponse("")
      setSelectedQuery(null)
    }
  }

  const handleDelete = (index) => {
    // Here you would typically delete the query from your backend
    console.log("Deleting query at index:", index)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Product Queries</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-4">
          {queries.map((query, index) => (
            <Card key={index} onClick={() => handleQuerySelect(query)} className="cursor-pointer">
              <CardHeader>
                <CardTitle>{query.productName}</CardTitle>
                <p className="text-sm text-muted-foreground">From: {query.user}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{query.queryText}</p>
              </CardContent>
              <div className="flex justify-end gap-2 p-4 pt-0">
                <Badge variant="secondary" className={query.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}>
                  {query.status}
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
          {selectedQuery && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedQuery.productName}</CardTitle>
                <p className="text-sm text-muted-foreground">From: {selectedQuery.user}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{selectedQuery.queryText}</p>
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

