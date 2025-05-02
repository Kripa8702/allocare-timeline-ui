
import React, { useState } from "react";
import { Employee } from "../utils/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@/components/ui/table";
import ProjectBlock from "./ProjectBlock";
import TimelineHeader from "./TimelineHeader";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar, CalendarDays, CalendarIcon } from "lucide-react";

// Allocation status enums
enum AllocationStatus {
  OPTIMAL = "Optimal",
  UNDER_ALLOCATED = "Under Allocated",
  OVER_ALLOCATED = "Over Allocated"
}

interface AllocationTableProps {
  employees: Employee[];
  weeks: Date[][];
}

// View type for allocation display
type ViewType = "day" | "week" | "month";

const AllocationTable = ({ employees, weeks }: AllocationTableProps) => {
  const [viewType, setViewType] = useState<ViewType>("week");
  
  // Hour limits based on view type
  const HOURS_PER_VIEW = {
    day: 8,
    week: 40,
    month: 160
  };

  const getAllocationStatus = (percentage: number): AllocationStatus => {
    if (percentage === 100) return AllocationStatus.OPTIMAL;
    if (percentage > 100) return AllocationStatus.OVER_ALLOCATED;
    return AllocationStatus.UNDER_ALLOCATED;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end mb-4">
        <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
          <ToggleGroup type="single" value={viewType} onValueChange={(value) => value && setViewType(value as ViewType)}>
            <ToggleGroupItem value="day" aria-label="Day view" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> Day
            </ToggleGroupItem>
            <ToggleGroupItem value="week" aria-label="Week view" className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" /> Week
            </ToggleGroupItem>
            <ToggleGroupItem value="month" aria-label="Month view" className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" /> Month
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-md shadow-sm border border-gray-100">
        <Table className="border-collapse w-full">
          <TableBody>
            {/* Timeline Header */}
            <TimelineHeader weeks={weeks} viewType={viewType} />
            {employees.map((employee) => (
              <React.Fragment key={employee.id}>
                {/* Employee row */}
                <TableRow className="border-b border-gray-200 hover:bg-gray-50">
                  <TableCell className="sticky left-0 z-10 bg-white p-4 border border-gray-200 w-[180px]">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">{employee.name}</span>
                      <span className="text-xs text-gray-500">{employee.role}</span>
                    </div>
                  </TableCell>
                  {weeks.map((week, weekIndex) => {
                    const allocation = employee.allocations.find(
                      (a) => a.weekIndex === weekIndex
                    );
                    
                    // Adjust percentage and hours based on view type
                    const maxHours = HOURS_PER_VIEW[viewType];
                    const baseHours = allocation?.hours || 0;
                    
                    // Scale hours appropriately based on the view
                    let hours = baseHours;
                    if (viewType === "day") {
                      hours = baseHours / 5; // Assuming 5 working days in a week
                    } else if (viewType === "month") {
                      hours = baseHours * 4; // Assuming 4 weeks in a month
                    }
                    
                    const percentage = Math.round((hours / maxHours) * 100);
                    const status = getAllocationStatus(percentage);

                    // Get all projects for this week/view
                    const weekProjects = employee.projects.filter((project) => {
                      const endWeek = project.startWeek + Math.ceil(project.hours / HOURS_PER_VIEW.week) - 1;
                      return weekIndex >= project.startWeek && weekIndex <= endWeek;
                    });

                    // Create array of project blocks with consistent positioning
                    const projectBlocks = Array.from({ length: Math.max(...employee.projects.map(p => p.rowIndex)) + 1 }, (_, index) => {
                      const project = weekProjects.find(p => p.rowIndex === index);
                      return project ? (
                        <ProjectBlock
                          key={project.id}
                          project={project}
                          totalWeeks={weeks.length}
                          weekIndex={weekIndex}
                        />
                      ) : <div key={index} className="h-[80px]" />; // Empty space holder with matching height
                    });

                    return (
                      <TableCell
                        key={weekIndex}
                        className="p-2 border-r border-gray-200 min-w-[200px] align-top"
                      >
                        <div className="mb-3 flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getAllocationDotClass(percentage)}`} />
                            <span className={`text-xs font-medium ${getAllocationTextClass(percentage)}`}>
                              {status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getAllocationBadgeClass(percentage)}`}>
                              {percentage}%
                            </span>
                            <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-200">
                              {Math.round(hours)}h
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {projectBlocks}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Helper functions for allocation indicators
function getAllocationDotClass(percentage: number): string {
  if (percentage === 100) {
    return "bg-green-500"; // Bright green dot
  } else if (percentage > 100) {
    return "bg-red-500"; // Bright red dot
  } else {
    return "bg-yellow-500"; // Bright yellow dot
  }
}

// Helper function to get text color based on allocation percentage
function getAllocationTextClass(percentage: number): string {
  if (percentage === 100) {
    return "text-green-700"; // Green text
  } else if (percentage > 100) {
    return "text-red-700"; // Red text
  } else {
    return "text-yellow-700"; // Yellow text
  }
}

// Helper function to get badge color based on allocation percentage
function getAllocationBadgeClass(percentage: number): string {
  if (percentage === 100) {
    return "bg-green-100 text-green-700 border border-green-300"; // Bright green badge
  } else if (percentage > 100) {
    return "bg-red-100 text-red-700 border border-red-300"; // Bright red badge
  } else {
    return "bg-yellow-100 text-yellow-700 border border-yellow-300"; // Bright yellow badge
  }
}

export default AllocationTable;
