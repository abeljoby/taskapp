import './App.css'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { AppSidebar } from './components/app-sidebar'
import TaskPage from './tasks/page'
import { useState } from 'react'

function App() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<1 | 2 | 3 | "">("")

  return (
    <>
      <SidebarProvider>
        <AppSidebar selectCategory={setCategoryFilter} selectStatus={setStatusFilter} selectPriority={setPriorityFilter}/>
        <SidebarTrigger />
        <main>
          <TaskPage category={categoryFilter} status={statusFilter} priority={priorityFilter}/>
        </main>
      </SidebarProvider>
    </>
  )
}

export default App
