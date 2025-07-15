import './App.css'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { AppSidebar } from './components/app-sidebar'
import TaskPage from './tasks/page'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main>
          <TaskPage />
        </main>
      </SidebarProvider>
    </>
  )
}

export default App
