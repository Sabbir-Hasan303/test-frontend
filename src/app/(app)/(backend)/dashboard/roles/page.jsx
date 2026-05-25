"use client"

import { ChevronLeft, ChevronRight, Pencil, Search, Trash2 } from 'lucide-react'
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

/**
 * @typedef {Object} Role
 * @property {number} id
 * @property {string} name
 * @property {Object.<string, boolean>} permissions
 */

const initialRoles = [
  {
    id: 1,
    name: "Admin",
    permissions: {
      "Permission 1": false,
      "Permission 2": true,
      "Permission 3": false,
      "Permission 4": true,
      "Permission 5": false,
      "Permission 6": true,
    },
  },
  {
    id: 2,
    name: "Warehouse Manager",
    permissions: {
      "Permission 1": false,
      "Permission 2": true,
      "Permission 3": false,
      "Permission 4": true,
      "Permission 5": false,
      "Permission 6": true,
    },
  },
]

const formSchema = z.object({
  roleName: z.string().min(2, {
    message: "Role name must be at least 2 characters.",
  }),
})

export default function RolesAndPermissionsPage() {
  const [roles, setRoles] = useState(initialRoles)
  const [newRoleName, setNewRoleName] = useState("")
  const [editingRole, setEditingRole] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2
  const [searchQuery, setSearchQuery] = useState("")

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleName: "",
    },
  })

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentRoles = filteredRoles.slice(startIndex, endIndex)

  const handleAddRole = () => {
    if (newRoleName.trim()) {
      const newRole = {
        id: Date.now(),
        name: newRoleName.trim(),
        permissions: {},
      }
      setRoles(prevRoles => [...prevRoles, newRole])
      setNewRoleName("")
    }
  }

  const handleUpdateRole = () => {
    if (editingRole) {
      setRoles(prevRoles =>
        prevRoles.map(role =>
          role.id === editingRole.id ? editingRole : role
        )
      )
      setEditingRole(null)
    }
  }

  const handleDeleteRole = (roleId) => {
    setRoles(prevRoles => prevRoles.filter(role => role.id !== roleId))
  }

  const handlePermissionChange = (roleId, permission, checked) => {
    setRoles(prevRoles =>
      prevRoles.map(role =>
        role.id === roleId
          ? { ...role, permissions: { ...role.permissions, [permission]: checked } }
          : role
      )
    )
  }

  const onSubmit = () => {
    handleUpdateRole()
  }

  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    buttons.push(
      <Button
        key="prev"
        variant="outline"
        size="icon"
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
    )

    if (startPage > 1) {
      buttons.push(
        <Button
          key={1}
          variant="outline"
          onClick={() => setCurrentPage(1)}
        >
          1
        </Button>
      )
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1" className="mx-2">...</span>)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Button>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2" className="mx-2">...</span>)
      }
      buttons.push(
        <Button
          key={totalPages}
          variant="outline"
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Button>
      )
    }

    buttons.push(
      <Button
        key="next"
        variant="outline"
        size="icon"
        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    )

    return buttons
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Role & Permission</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Add New"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
              />
              <Button onClick={handleAddRole}>Add</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-full">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentRoles.map((role, index) => (
                    <TableRow key={role.id}>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell>{role.name}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
                            onClick={() => setEditingRole(role)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit Role</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
                            onClick={() => handleDeleteRole(role.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete Role</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-center space-x-2 mt-4">
              {renderPaginationButtons()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Update Role</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Permission 1</TableHead>
                  <TableHead>Permission 2</TableHead>
                  <TableHead>Permission 3</TableHead>
                  <TableHead>Permission 4</TableHead>
                  <TableHead>Permission 5</TableHead>
                  <TableHead>Permission 6</TableHead>
                  <TableHead>Manage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>{role.name}</TableCell>
                    {Object.keys(role.permissions).map((permission) => (
                      <TableCell key={permission}>
                        <input
                          type="checkbox"
                          checked={role.permissions[permission]}
                          onChange={(e) => handlePermissionChange(role.id, permission, e.target.checked)}
                        />
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Manage Role</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editingRole} onOpenChange={() => setEditingRole(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Role</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="roleName"
                render={() => (
                  <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Update"
                        value={editingRole?.name || ""}
                        onChange={(e) => setEditingRole(prev => prev ? { ...prev, name: e.target.value } : null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <p className="text-center text-sm text-muted-foreground">Footer</p>
    </div>
  )
}

