import { useState, useEffect } from "react"
import { columns, Task } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Task[]> {
  const response = await fetch("http://localhost:8080/tasks/v1/");
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
}

export default function TaskPage() {
  const [data, setData] = useState<Task[]>([])

  useEffect(() => {
    getData().then(setData)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}