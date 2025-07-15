import { useState, useEffect, useCallback } from "react"
import { columns as getColumns, Task } from "./columns"
import { DataTable } from "./data-table"
import TaskSheet from "./add-task-sheet"
import UpdateTask from "./update-task-sheet"

async function getData(): Promise<Task[]> {
  const response = await fetch("http://localhost:8080/tasks/v1/")
  if (!response.ok) throw new Error("Failed to fetch tasks")
  return response.json()
}

export default function TaskPage() {
  const [data, setData] = useState<Task[]>([])
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [showUpdate, setShowUpdate] = useState(false)

  const fetchData = useCallback(() => {
    getData().then(setData)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Handler for deleting a task
  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:8080/tasks/v1/${id}`, { method: "DELETE" })
    fetchData()
  }

  // Handler for updating a task (show the update form)
  const handleUpdate = (task: Task) => {
    setEditTask(task)
    setShowUpdate(true)
  }

  // Handler for closing the update form
  const handleUpdateClose = () => {
    setEditTask(null)
    setShowUpdate(false)
    fetchData()
  }

  return (
    <div className="container mx-auto py-10">
      <TaskSheet onFormSubmit={fetchData} />
      {showUpdate && editTask && (
        <UpdateTask task={editTask} onFormSubmit={handleUpdateClose} onClose={handleUpdateClose} />
      )}
      <DataTable
        columns={getColumns({ onDelete: handleDelete, onUpdate: handleUpdate })}
        data={data}
      />
    </div>
  )
}