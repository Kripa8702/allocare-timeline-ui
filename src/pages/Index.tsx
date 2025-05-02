
import { useState } from "react";
import TopBar from "../components/TopBar";
import AllocationTable from "../components/AllocationTable";
import { weekDates, generateMockEmployees } from "../utils/mockData";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"Employee" | "Project">("Employee");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const employees = generateMockEmployees();
  
  // Filter employees based on search query
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <TopBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />
      <div className="flex-1 p-4 overflow-auto">
        <AllocationTable 
          employees={filteredEmployees} 
          weeks={weekDates} 
        />
      </div>
    </div>
  );
};

export default Index;
