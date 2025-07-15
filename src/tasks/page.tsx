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

type TaskProps = {
  status: string
  category: string
};

export default function TaskPage({ status, category }: TaskProps) {
  const [data, setData] = useState<Task[]>([])
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [showUpdate, setShowUpdate] = useState(false)

  const fetchData = useCallback(() => {
    getData().then(setData)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:8080/tasks/v1/${id}`, { method: "DELETE" })
    fetchData()
  }

  const handleUpdate = (task: Task) => {
    setEditTask(task)
    setShowUpdate(true)
  }

  const handleUpdateClose = () => {
    setEditTask(null)
    setShowUpdate(false)
    fetchData()
  }

  return (
    <div className="container mx-auto py-15 px-5">
      <TaskSheet onFormSubmit={fetchData} />
      {showUpdate && editTask && (
        <UpdateTask task={editTask} onFormSubmit={handleUpdateClose} onClose={handleUpdateClose} />
      )}
      <DataTable
        status={status}
        category={category}
        columns={getColumns({ onDelete: handleDelete, onUpdate: handleUpdate })}
        data={data}
      />
    </div>
  )
}