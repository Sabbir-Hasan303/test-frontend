"use client"

import * as React from "react"
import { Cloud, Trash2, UploadCloud } from 'lucide-react'
import Image from "next/image"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/**
 * @typedef {Object} UploadedFile
 * @property {string} id
 * @property {File} file
 * @property {string} preview
 * @property {'Banner' | 'Sidebar Ad' | 'Popup Ad'} type
 * @property {Date} uploadDate
 */

export default function BannersAndAdsPage() {
  const [uploadType, setUploadType] = useState("Banner")
  const [files, setFiles] = useState([])
  const [filterType, setFilterType] = useState("all")

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        setFiles((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(7),
            file,
            preview: URL.createObjectURL(file),
            type: uploadType,
            uploadDate: new Date(),
          },
        ])
      }
      reader.readAsDataURL(file)
    })
  }, [uploadType])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  })

  const handleDelete = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const filteredFiles = files.filter((file) =>
    filterType === "all" ? true : file.type === filterType
  )

  // Cleanup object URLs on unmount
  React.useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Banners & Ads</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>
            Drag and drop your banner or ad files here
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Select
              value={uploadType}
              onValueChange={(value) => setUploadType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Banner">Banner</SelectItem>
                <SelectItem value="Sidebar Ad">Sidebar Ad</SelectItem>
                <SelectItem value="Popup Ad">Popup Ad</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-12 transition-colors",
              isDragActive
                ? "border-primary/50 bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <Cloud className="h-10 w-10 text-muted-foreground" />
              <div className="text-xl font-semibold">Drag and drop files here</div>
              <div className="text-sm text-muted-foreground">
                or click to browse
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Files</h2>
          <Select
            value={filterType}
            onValueChange={setFilterType}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Banner">Banner</SelectItem>
              <SelectItem value="Sidebar Ad">Sidebar Ad</SelectItem>
              <SelectItem value="Popup Ad">Popup Ad</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFiles.map((file) => (
            <Card key={file.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={file.preview}
                  alt={`${file.type} preview`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{file.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {file.uploadDate.toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
                    onClick={() => handleDelete(file.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete file</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
            <h3 className="font-semibold">No files uploaded</h3>
            <p className="text-sm text-muted-foreground">
              Upload your first banner or ad to get started
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

