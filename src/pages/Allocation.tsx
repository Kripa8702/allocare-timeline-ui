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
  const resetSelectedWeek = () => setSelectedWeek(null);
  const [isAddAllocationOpen, setIsAddAllocationOpen] = useState(false);
  
  const employees = mockEmployees;
  
  // Filter employees based on search query
  const filteredEmployees = employees.filter(employee => 
    employee.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        onAddAllocationOpen={handleAddAllocationOpen}
      />
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-white rounded-md shadow-sm">
          {calendarView === 'week' ? (
            <AllocationTable 
              data={mockData}
              onWeekClick={handleWeekClick}
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
        employees={employees}
        projects={mockProjects}
        defaultStartDate={selectedWeek?.start}
        defaultEndDate={selectedWeek?.end}
        open={isAddAllocationOpen}
        onOpenChange={handleAddAllocationOpen}
      />
    </div>
  );
};

export default Allocation;
