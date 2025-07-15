import './App.css'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { AppSidebar } from './components/app-sidebar'
import TaskPage from './tasks/page'
import { useState } from 'react'

function App() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  return (
    <>
      <SidebarProvider>
        <AppSidebar selectCategory={setCategoryFilter} selectStatus={setStatusFilter} />
        <SidebarTrigger />
        <main>
          <TaskPage category={categoryFilter} status={statusFilter}/>
        </main>
      </SidebarProvider>
    </>
  )
}

export default App
