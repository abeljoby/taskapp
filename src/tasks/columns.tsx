"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

export type Task = {
  id: string
  title: string
  description?: string
  status: "pending" | "in_progress" | "completed"
  priority: 1 | 2 | 3 // 1: High, 2: Medium, 3: Low
  due_date?: string // ISO date format, e.g. "2025-07-15"
  category?: string
}

export const columns= ({
  onDelete,
  onUpdate,
}: {
  onDelete: (id: string) => void
  onUpdate: (task: Task) => void
}): ColumnDef<Task>[] => [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const prio = row.getValue("priority") as 1 | 2 | 3
      const prioName: Record<1 | 2 | 3, string> = {1:"High",2:"Medium",3:"Low"}
      const formatted = prioName[prio]
 
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Due Date
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   )
    // },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onUpdate(task)}>Update task</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(task.id)}>Delete task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

