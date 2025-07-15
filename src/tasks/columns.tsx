"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { JSX } from "react"

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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as "pending" | "in_progress" | "completed"
      const statusMap: Record<"pending" | "in_progress" | "completed", { label: string; icon: JSX.Element }> = {
      pending: {
        label: "Pending",
        icon: <span className="mr-2 text-yellow-500"><svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /></svg></span>,
      },
      in_progress: {
        label: "In Progress",
        icon: <span className="mr-2 text-blue-500"><svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 108 8H10V2z" /></svg></span>,
      },
      completed: {
        label: "Completed",
        icon: <span className="mr-2 text-green-600"><svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 6.293a1 1 0 00-1.414 0L9 12.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg></span>,
      },
      }
      const { label, icon } = statusMap[status]
      return (
      <div className="flex items-center">
        {icon}
        {label}
      </div>
      )
    },
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

