"use client"

import { useState } from "react"
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  DialogTitle,
} from "@/components/ui/dialog"

/**
 * @typedef {Object} Tag
 * @property {string} id
 * @property {string} name
 */

const initialTags = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
  { id: "3", name: "Books" },
  { id: "4", name: "Home & Garden" },
  { id: "5", name: "Toys" },
]

export default function TagsPage() {
  const [tags, setTags] = useState(initialTags)
  const [newTagName, setNewTagName] = useState("")
  const [editingTag, setEditingTag] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const newTag = {
        id: `${Date.now()}`,
        name: newTagName.trim(),
      }
      setTags(prevTags => [...prevTags, newTag])
      setNewTagName("")
    }
  }

  const handleUpdateTag = () => {
    if (editingTag) {
      setTags(prevTags =>
        prevTags.map(tag =>
          tag.id === editingTag.id ? editingTag : tag
        )
      )
      setEditingTag(null)
    }
  }

  const handleDeleteTag = (tagId) => {
    setTags(prevTags => prevTags.filter(tag => tag.id !== tagId))
  }

  const totalPages = Math.ceil(tags.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTags = tags.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Tags</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Tag</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="font-medium">Tag Name</div>
                <Input
                  placeholder="Tag Name"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                />
              </div>
              <Button onClick={handleAddTag}>Add</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tag Name</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTags.map((tag) => (
                  <TableRow key={tag.id}>
                    <TableCell>{tag.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
                          onClick={() => setEditingTag(tag)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit tag</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
                          onClick={() => handleDeleteTag(tag.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete tag</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                disabled
              >
                {currentPage}
              </Button>
              {currentPage < totalPages && (
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  {currentPage + 1}
                </Button>
              )}
              {currentPage + 1 < totalPages && (
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => setCurrentPage(currentPage + 2)}
                >
                  {currentPage + 2}
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!editingTag} onOpenChange={(open) => !open && setEditingTag(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tag</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <div className="font-medium">Tag Name</div>
              <Input
                placeholder="Tag Name"
                value={editingTag?.name || ""}
                onChange={(e) => setEditingTag(prev => prev ? {...prev, name: e.target.value} : null)}
              />
            </div>
          </div>
          <Button onClick={handleUpdateTag}>Update Tag</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

