
import React from "react";
import { isThisWeek } from "date-fns";
import { Employee } from "../utils/mockData";
import { 
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface AllocationTableProps {
  employees: Employee[];
  weeks: Date[][];
}

const AllocationTable = ({ employees, weeks }: AllocationTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse w-full">
        <TableBody>
          {employees.map((employee, employeeIndex) => {
            const rowHeight = 32; // Reduced height for employee row
            const projectRowHeight = 28; // Smaller height for project rows
            
            return (
              <React.Fragment key={employee.id}>
                {/* Employee row with allocation */}
                <TableRow className={`border-t ${employeeIndex > 0 ? "border-t-2 border-gray-300" : "border-gray-200"}`}>
                  {/* Employee name cell */}
                  <TableCell 
                    className="w-[140px] min-w-[140px] bg-white border-l border-gray-200 p-2"
                    style={{ height: `${rowHeight}px` }}
                  >
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{employee.name}</h3>
                      <p className="text-xs text-gray-500">{employee.role}</p>
                    </div>
                  </TableCell>

                  {/* Allocation cells */}
                  {weeks.map((week, weekIndex) => {
                    const isCurrentWeek = isThisWeek(week[0]);
                    const allocation = employee.allocations.find(
                      (a) => a.weekIndex === weekIndex
                    );

                    return (
                      <TableCell
                        key={weekIndex}
                        className={`border-r border-gray-200 p-1 text-center ${
                          isCurrentWeek ? "bg-blue-50" : "bg-white"
                        }`}
                      >
                        {allocation && (
                          <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center space-x-1">
                              <Badge 
                                variant="outline" 
                                className={`text-xs font-medium px-1.5 py-0.5 ${getAllocationColorClass(allocation.percentage)}`}
                              >
                                {allocation.percentage}%
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {allocation.hours}h
                              </span>
                            </div>
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>

                {/* Project rows */}
                {employee.projects.map((project) => (
                  <TableRow key={`${employee.id}-${project.id}`} className="border-gray-200">
                    {/* Project name cell */}
                    <TableCell 
                      className="w-[140px] min-w-[140px] bg-white border-l border-gray-200 pl-6 py-1"
                      style={{ height: `${projectRowHeight}px` }}
                    >
                      <span className="text-sm font-medium">{project.name}</span>
                    </TableCell>

                    {/* Project allocation cells */}
                    {weeks.map((week, weekIndex) => {
                      const isCurrentWeek = isThisWeek(week[0]);
                      const isProjectActive = weekIndex >= project.startWeek && weekIndex <= project.endWeek;

                      return (
                        <TableCell
                          key={weekIndex}
                          className={`border-r border-gray-200 p-1 text-center ${
                            isCurrentWeek ? "bg-blue-50" : "bg-white"
                          }`}
                        >
                          {isProjectActive && (
                            <div className={`rounded-md px-1.5 py-0.5 text-xs font-medium ${getProjectColor(project.name)}`}>
                              {project.percentage}%
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

// Helper function to get color based on allocation percentage
function getAllocationColorClass(percentage: number): string {
  if (percentage === 100) {
    return "bg-green-500 text-white border-green-600"; // Bright green for 100%
  } else if (percentage > 100) {
    return "bg-red-500 text-white border-red-600"; // Bright red for >100%
  } else {
    return "bg-yellow-400 text-gray-800 border-yellow-500"; // Bright yellow for <100%
  }
}

// Helper function to get color based on project name
function getProjectColor(projectName: string): string {
  const colors = {
    "TD": "bg-blue-100 border border-blue-300 text-blue-800",
    "HMS": "bg-green-100 border border-green-300 text-green-800",
    "GSA": "bg-yellow-100 border border-yellow-300 text-yellow-800",
    "VCT": "bg-purple-100 border border-purple-300 text-purple-800",
    "BRT": "bg-pink-100 border border-pink-300 text-pink-800",
    "LMS": "bg-orange-100 border border-orange-300 text-orange-800",
  };
  
  return colors[projectName as keyof typeof colors] || "bg-gray-100 border border-gray-300 text-gray-800";
}

export default AllocationTable;
