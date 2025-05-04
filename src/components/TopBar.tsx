import React from 'react';
import { Search, Filter, Calendar, LogOut, User, X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { theme } from "../utils/theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useNavigate } from "react-router-dom";
import { Employee, Project } from '@/utils/mockData';

export type CalendarView = "day" | "week" | "month";

interface TopBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  calendarView: CalendarView;
  setCalendarView: (view: CalendarView) => void;
  employees: Employee[];
  projects: Project[];
  selectedProject: string;
  setSelectedProject: (project: string) => void;
  onAddAllocationOpen?: (open: boolean) => void;
}

const TopBar: React.FC<TopBarProps> = ({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  calendarView,
  setCalendarView,
  employees,
  projects,
  selectedProject,
  setSelectedProject,
  onAddAllocationOpen,
}) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="sticky top-0 z-10">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left: Search and Filter Section */}
        <div className="flex items-center gap-4 flex-1">
          {/* Search Bar */}
          <div className="relative w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full bg-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Project Filter */}
          <div className="w-[200px]">
            <Select
              value={selectedProject}
              onValueChange={setSelectedProject}
            >
              <SelectTrigger className="w-full bg-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.project_id} value={project.project_id.toString()}>
                    {project.project_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Right: Add Allocation and Filter Buttons */}
        <div className="flex items-center gap-4">
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => onAddAllocationOpen?.(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Allocation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
