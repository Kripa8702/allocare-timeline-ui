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
        {/* Center: Search Bar */}
        <div className="relative w-[400px]">
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
        
        {/* Right: Add Allocation and Filter Buttons */}
        <div className="flex items-center gap-4">
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => onAddAllocationOpen?.(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Allocation
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setShowFilters(!showFilters)}
            className={`bg-white border-gray-300 shadow-sm ${showFilters ? "bg-purple-50 border-purple-200 text-purple-700" : "hover:bg-purple-50 hover:text-purple-700"}`}
          >
            {showFilters ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
