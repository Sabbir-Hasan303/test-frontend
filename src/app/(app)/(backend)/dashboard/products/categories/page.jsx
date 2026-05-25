"use client"

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
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ChevronDown, ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {string|null} parentId
 * @property {Category[]} [subCategories]
 * @property {boolean} [isExpanded]
 */

const initialCategories = [
  {
    id: "1",
    name: "Parent 1",
    parentId: null,
    subCategories: [
      {
        id: "1-1",
        name: "Child 1",
        parentId: "1",
        subCategories: [
          { id: "1-1-1", name: "Grandchild 1", parentId: "1-1" },
          { id: "1-1-2", name: "Grandchild 2", parentId: "1-1" },
        ]
      },
      { id: "1-2", name: "Child 2", parentId: "1" },
    ],
    isExpanded: false,
  },
  {
    id: "2",
    name: "Parent 2",
    parentId: null,
    subCategories: [
      { id: "2-1", name: "Child 1", parentId: "2" },
      { id: "2-2", name: "Child 2", parentId: "2" },
    ],
    isExpanded: false,
  },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryParent, setNewCategoryParent] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const renderCategoryOptions = (categories, depth = 0) => {
    return categories.flatMap((category) => [
      <SelectItem key={category.id} value={category.id}>
        {'\u00A0'.repeat(depth * 2)}{category.name}
      </SelectItem>,
      ...(category.subCategories ? renderCategoryOptions(category.subCategories, depth + 1) : []),
    ]);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: `${Date.now()}`, // Use timestamp for unique ID
        name: newCategoryName,
        parentId: newCategoryParent,
        subCategories: [],
        isExpanded: false,
      }
      setCategories(prevCategories => {
        const updatedCategories = addCategoryToTree(prevCategories, newCategory);
        return updatedCategories;
      })
      setNewCategoryName("")
      setNewCategoryParent(null)
    }
  }

  const addCategoryToTree = (categories, newCategory) => {
    if (newCategory.parentId === "root" || !newCategory.parentId) {
      return [...categories, newCategory];
    }
    return categories.map(category => {
      if (category.id === newCategory.parentId) {
        return {
          ...category,
          subCategories: [...(category.subCategories || []), newCategory],
        };
      } else if (category.subCategories) {
        return {
          ...category,
          subCategories: addCategoryToTree(category.subCategories, newCategory),
        };
      }
      return category;
    });
  };

  const handleUpdateCategory = () => {
    if (editingCategory) {
      setCategories(prevCategories =>
        updateCategoryInTree(prevCategories, editingCategory)
      )
      setEditingCategory(null)
    }
  }

  const updateCategoryInTree = (categories, updatedCategory) => {
    return categories.map(category => {
      if (category.id === updatedCategory.id) {
        return updatedCategory
      }
      if (category.subCategories) {
        return {
          ...category,
          subCategories: updateCategoryInTree(category.subCategories, updatedCategory),
        }
      }
      return category
    })
  }

  const toggleCategory = (categoryId) => {
    setCategories(prevCategories =>
      toggleCategoryInTree(prevCategories, categoryId)
    )
  }

  const toggleCategoryInTree = (categories, categoryId) => {
    return categories.map(category => {
      if (category.id === categoryId) {
        return { ...category, isExpanded: !category.isExpanded }
      }
      if (category.subCategories) {
        return {
          ...category,
          subCategories: toggleCategoryInTree(category.subCategories, categoryId),
        }
      }
      return category
    })
  }

  const handleDeleteCategory = (categoryId) => {
    setCategories(prevCategories => deleteCategoryFromTree(prevCategories, categoryId))
  }

  const deleteCategoryFromTree = (categories, categoryId) => {
    return categories.filter(category => category.id !== categoryId)
      .map(category => {
        if (category.subCategories) {
          return {
            ...category,
            subCategories: deleteCategoryFromTree(category.subCategories, categoryId),
          }
        }
        return category
      })
  }

  const renderCategories = (categories, depth = 0) => {
    return categories.map(category => (
      <React.Fragment key={category.id}>
        <TableRow>
          <TableCell>
            <div
              className="flex items-center gap-2 cursor-pointer rounded-md transition-colors"
              style={{ paddingLeft: `${depth * 20}px` }}
              onClick={() => toggleCategory(category.id)}
            >
              {category.subCategories && category.subCategories.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-6 w-6"
                >
                  {category.isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              )}
              <span>{category.name}</span>
            </div>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
                onClick={() => setEditingCategory(category)}
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit category</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
                onClick={() => handleDeleteCategory(category.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete category</span>
              </Button>
            </div>
          </TableCell>
        </TableRow>
        {category.isExpanded && category.subCategories && renderCategories(category.subCategories, depth + 1)}
      </React.Fragment>
    ))
  }

  const totalPages = Math.ceil(categories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCategories = categories.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Categories</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="font-medium">Category Name</div>
                <Input
                  placeholder="Category Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="font-medium">Parent Category</div>
                <Select onValueChange={(value) => setNewCategoryParent(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="root">No Parent</SelectItem>
                    {renderCategoryOptions(categories)}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddCategory}>Add</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hierarchical Category Table</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderCategories(currentCategories)}
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

      <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
        <DialogContent aria-describedby="edit-category-description">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div id="edit-category-description" className="text-sm text-muted-foreground mb-4">
            Edit the name and parent category for the selected category.
          </div>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <div className="font-medium">Category Name</div>
              <Input
                placeholder="Category Name"
                value={editingCategory?.name || ""}
                onChange={(e) => setEditingCategory(prev => prev ? {...prev, name: e.target.value} : null)}
              />
            </div>
            <div className="space-y-2">
              <div className="font-medium">Parent Category</div>
              <Select
                value={editingCategory?.parentId || "root"}
                onValueChange={(value) => setEditingCategory(prev => prev ? {...prev, parentId: value} : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select parent category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="root">No Parent</SelectItem>
                  {categories.filter(c => c.id !== editingCategory?.id).map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleUpdateCategory}>Update Category</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

