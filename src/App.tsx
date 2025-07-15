import './App.css'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { AppSidebar } from './components/app-sidebar'
import TaskPage from './tasks/page'
import { Sheet } from 'lucide-react'
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './components/ui/sheet'
import TaskSheet from './tasks/add-task-sheet'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <TaskPage />
        </main>
      </SidebarProvider>
    </>
  )
}

export default App
