import { Search, Filter, Calendar } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { theme } from "../utils/theme";

interface TopBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: "Employee" | "Project";
  setActiveTab: (tab: "Employee" | "Project") => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const TopBar = ({ 
  searchQuery, 
  setSearchQuery, 
  activeTab, 
  setActiveTab,
  showFilters,
  setShowFilters
}: TopBarProps) => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-purple-900">Allora</h1>
            <p className="text-sm text-gray-500">Resource Allocation</p>
          </div>
        </div>
        
        {/* Center: Search Bar */}
        <div className="relative w-[400px]">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="text"
              placeholder="Search employees or projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
        
        {/* Right: Filter and Tab Switcher */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setShowFilters(!showFilters)}
            className={`${showFilters ? "bg-purple-50 border-purple-200 text-purple-700" : "hover:bg-purple-50 hover:text-purple-700"}`}
          >
            <Filter className="h-4 w-4" />
          </Button>
          
          <Tabs 
            defaultValue={activeTab} 
            onValueChange={(value) => setActiveTab(value as "Employee" | "Project")}
            className="w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1">
              <TabsTrigger 
                value="Employee"
                className="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
              >
                Employee
              </TabsTrigger>
              <TabsTrigger 
                value="Project"
                className="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
              >
                Project
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
