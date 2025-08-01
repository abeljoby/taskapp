import * as React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { ClipboardPlus, Proportions } from "lucide-react"

const wait = () => new Promise((resolve) => setTimeout(resolve, 200));

type TaskSheetProps = {
  onFormSubmit: () => void;
};

export default function TaskSheet({ onFormSubmit }: TaskSheetProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger
      className="fixed bottom-4 right-4 md:top-4 md:bottom-auto z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors duration-200 flex items-center justify-center"
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
      aria-label="Add Task"
    >
      <ClipboardPlus className="w-6 h-6" />
    </SheetTrigger>
    <SheetContent>
        <SheetHeader>
        <SheetTitle>Add a new task</SheetTitle>
        <SheetDescription>
            Enter the details of your task here. Click save when you're done.
        </SheetDescription>
        </SheetHeader>
        <form
        onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            await fetch("http://localhost:8080/tasks/v1/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            });
            onFormSubmit();
            wait().then(() => setOpen(false));
        }}
        className="space-y-4 px-4"
        >
        <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
            Title
            </label>
            <input
            id="title"
            name="title"
            type="text"
            className="w-full border rounded px-2 py-1"
            required
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1" htmlFor="description">
            Description
            </label>
            <textarea
            id="description"
            name="description"
            className="w-full border rounded px-2 py-1"
            rows={3}
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1" htmlFor="status">
            Status
            </label>
            <select
            id="status"
            name="status"
            defaultValue="pending"
            className="w-full border rounded px-2 py-1"
            required
            >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium mb-1" htmlFor="priority">
            Priority
            </label>
            <select
            id="priority"
            name="priority"
            defaultValue="1"
            className="w-full border rounded px-2 py-1"
            required
            >
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium mb-1" htmlFor="dueDate">
            Due Date
            </label>
            <input
            id="dueDate"
            name="dueDate"
            type="date"
            className="w-full border rounded px-2 py-1"
            />
        </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={"Unassigned"}
              className="w-full border rounded px-2 py-1"
              required
            >
              <option value="Unassigned">Unassigned</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="College">College</option>
            </select>
          </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            Submit
        </button>
        </form>
    </SheetContent>
    </Sheet>
  )
}