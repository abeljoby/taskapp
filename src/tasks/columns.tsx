"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Task = {
  id: string
  title: string
  description?: string
  status: "pending" | "in_progress" | "completed"
  priority: 1 | 2 | 3 // 1: High, 2: Medium, 3: Low
  dueDate?: string // ISO date format, e.g. "2025-07-15"
  category?: string
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "due_date",
    header: "Due Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
]

