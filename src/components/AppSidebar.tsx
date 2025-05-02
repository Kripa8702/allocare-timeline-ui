
import { NavLink } from "react-router-dom";
import { Calendar, LayoutDashboard, BarChart } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Allocation",
      path: "/allocation",
      icon: BarChart,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-gray-100 py-3">
        <div className="flex items-center gap-3 px-4">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-purple-50">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-purple-900">Allora</h1>
            <p className="text-xs text-gray-500">Resource Allocation</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive 
                          ? "text-purple-600 bg-purple-50 font-medium" 
                          : "text-gray-700 hover:text-purple-600 hover:bg-purple-50/50"
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
