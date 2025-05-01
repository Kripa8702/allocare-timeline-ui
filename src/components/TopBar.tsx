
import { Search, Filter } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

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
      <div className="flex items-center justify-between p-4">
        <div className="text-xl font-semibold text-slate-800">Resource Allocation</div>
        
        {/* Center: Search Bar */}
        <div className="relative max-w-md w-full px-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="text"
              placeholder="Search employees or projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
        </div>
        
        {/* Right: Filter and Tab Switcher */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-slate-100" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
          
          <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as "Employee" | "Project")}>
            <TabsList>
              <TabsTrigger value="Employee">Employee</TabsTrigger>
              <TabsTrigger value="Project">Project</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
