import { Calendar, Home, Inbox, Search, Settings, SquareCheckBig } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Tasks",
    url: "#",
    icon: Home,
  },
]

const categories = [
  {
    title: "Unassigned",
    url: "#",
  },
  {
    title: "Personal",
    url: "#",
  },
  {
    title: "Work",
    url: "#",
  },
  {
    title: "College",
    url: "#",
  },
]
 
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center text-2xl font-extrabold tracking-tight gap-2 mt-1 ml-1">
        <SquareCheckBig className="w-7 h-7 text-primary" />
        <span className="font-logo text-primary">
          TaskApp
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {/* <item.icon /> */}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* Developed by Abel Joby */}
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}