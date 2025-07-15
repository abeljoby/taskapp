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
import { Task } from "./columns";

const wait = () => new Promise((resolve) => setTimeout(resolve, 200));

type UpdateTaskProps = {
  task: Task | null;
  onFormSubmit: () => void;
  onClose: () => void;
};

export default function UpdateTask({ task, onFormSubmit, onClose }: UpdateTaskProps) {
  if (!task) return null;
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    setOpen(true);
  }, [task]);
  return (
    <Sheet open={open} onOpenChange={(v) => { setOpen(v); if (!v) onClose(); }}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit task</SheetTitle>
          <SheetDescription>
            Update your task here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            await fetch(`http://localhost:8080/tasks/v1/`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...task,
                ...data,
                priority: Number(data.priority),
                due_date: data.dueDate || undefined,
              }),
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
              defaultValue={task.title}
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
              defaultValue={task.description}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={task.status}
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
              defaultValue={task.priority}
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
              defaultValue={task.dueDate || ""}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={task.category || "Unassigned"}
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
            Save
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}