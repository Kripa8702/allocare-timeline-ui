import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Users, Calendar, LogOut } from 'lucide-react';

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Resource Management",
      path: "/resources",
      icon: Users,
    },
    {
      title: "Allocation",
      path: "/allocation",
      icon: Calendar,
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r border-gray-200">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-purple-900">Allora</h1>
            <p className="text-sm text-gray-500">Resource Allocation</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.path)}
                    tooltip={item.title}
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sign Out Section */}
        <SidebarGroup className="mt-auto border-t border-gray-200">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleSignOut}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="h-5 w-5" />
                    <span>Sign out</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
