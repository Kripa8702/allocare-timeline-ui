import { useState } from "react";
import TopBar, { CalendarView } from "../components/TopBar";
import AllocationTable from "../components/AllocationTable";
import DayView from "../components/DayView";
import { mockData, mockEmployees, mockProjects } from "@/utils/mockData";
import AddAllocationForm from "@/components/AddAllocationForm";

const Allocation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [calendarView, setCalendarView] = useState<CalendarView>("week");
  const [selectedWeek, setSelectedWeek] = useState<{ start: string; end: string } | null>(null);
  const [selectedProject, setSelectedProject] = useState("all");
  const resetSelectedWeek = () => setSelectedWeek(null);
  const [isAddAllocationOpen, setIsAddAllocationOpen] = useState(false);
  
  const employees = mockEmployees;
  
  // Filter employees based on search query and project selection
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.employee_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedProject === "all") return matchesSearch;
    
    // Check if employee has allocations for the selected project
    const hasProjectAllocation = mockData.weeks.some(week => 
      week.data.some(empData => 
        empData.employee_id === employee.employee_id &&
        empData.allocations.some(alloc => 
          alloc.project_id.toString() === selectedProject
        )
      )
    );
    
    return matchesSearch && hasProjectAllocation;
  });

  const handleWeekClick = (weekStart: string, weekEnd: string) => {
    setSelectedWeek({ start: weekStart, end: weekEnd });
    setIsAddAllocationOpen(true);
  };

  const handleAddAllocationOpen = (open: boolean) => {
    setIsAddAllocationOpen(open);
    if (!open) {
      // Clear selected week when closing
      resetSelectedWeek();
    } else if (!selectedWeek) {
      // Clear selected week when opening from button (not from week click)
      resetSelectedWeek();
    }
  };
  
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <TopBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        calendarView={calendarView}
        setCalendarView={setCalendarView}
        employees={employees}
        projects={mockProjects}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        onAddAllocationOpen={handleAddAllocationOpen}
      />
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-white rounded-md shadow-sm">
          {calendarView === 'week' ? (
            <AllocationTable 
              data={mockData}
              onWeekClick={handleWeekClick}
              filteredEmployees={filteredEmployees}
            />
          ) : (
            <DayView 
              employees={filteredEmployees}
              data={mockData}
            />
          )}
        </div>
      </div>

      {/* Add Allocation Form */}
      <AddAllocationForm
        employees={employees || []}
        projects={mockProjects || []}
        defaultStartDate={selectedWeek?.start}
        defaultEndDate={selectedWeek?.end}
        open={isAddAllocationOpen}
        onOpenChange={handleAddAllocationOpen}
      />
    </div>
  );
};

export default Allocation;
