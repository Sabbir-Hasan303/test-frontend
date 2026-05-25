"use client"

import * as React from "react"
import { Bold, Italic, List, ListOrdered, Undo, Redo } from 'lucide-react'

import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"

export function RichTextEditor() {
  return (
    <div className="border rounded-md">
      <div className="flex items-center p-2 gap-1 border-b">
        <div className="flex items-center gap-1">
          <Toggle aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </Toggle>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <div className="flex items-center gap-1">
          <Toggle aria-label="Toggle bullet list">
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="Toggle numbered list">
            <ListOrdered className="h-4 w-4" />
          </Toggle>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <div className="flex items-center gap-1">
          <Toggle aria-label="Undo">
            <Undo className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="Redo">
            <Redo className="h-4 w-4" />
          </Toggle>
        </div>
      </div>
      <textarea
        className="w-full min-h-[200px] p-2 focus:outline-none"
        placeholder="Enter description..."
      />
    </div>
  )
}

