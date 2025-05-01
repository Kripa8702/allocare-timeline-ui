
import React from "react";
import { isThisWeek } from "date-fns";
import { Employee, WeekAllocation } from "../utils/mockData";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface AllocationTableProps {
  employees: Employee[];
  weeks: Date[][];
}

const AllocationTable = ({ employees, weeks }: AllocationTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse">
        <TableBody>
          {employees.map((employee, employeeIndex) => {
            // Calculate row height based on number of projects (but with less height)
            const rowHeight = 40; // Fixed height for employee row
            const projectRowHeight = 36; // Smaller height for project rows
            
            return (
              <React.Fragment key={employee.id}>
                {/* Add separator between employees except for the first one */}
                {employeeIndex > 0 && (
                  <TableRow>
                    <TableCell colSpan={weeks.length + 1} className="p-0">
                      <Separator className="my-2 bg-gray-200" />
                    </TableCell>
                  </TableRow>
                )}
                
                {/* Employee row with allocation */}
                <TableRow className="border-t border-gray-200">
                  {/* Employee name cell */}
                  <TableCell 
                    className="min-w-[200px] bg-white border-l border-gray-200 p-3"
                    style={{ height: `${rowHeight}px` }}
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">{employee.name}</h3>
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
                        className={`border-t border-r border-gray-200 p-2 text-center ${
                          isCurrentWeek ? "bg-blue-50" : "bg-white"
                        }`}
                      >
                        {allocation && (
                          <div className="flex flex-col items-center">
                            <Badge variant={allocation.percentage > 100 ? "destructive" : "outline"} 
                                  className={`text-xs font-medium ${allocation.percentage > 100 ? "bg-red-100" : "bg-gray-100"} rounded-md px-2 py-1`}>
                              {allocation.percentage}%
                            </Badge>
                            <span className="text-xs text-gray-500 mt-1">
                              {allocation.hours}h
                            </span>
                            <Progress 
                              value={Math.min(allocation.percentage, 100)} 
                              className="h-1 w-16 mt-1" 
                              indicatorClassName={allocation.percentage > 100 ? "bg-red-500" : "bg-blue-500"}
                            />
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
                      className="min-w-[200px] bg-white border-l border-gray-200 pl-8 py-2"
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
                            <div className={`rounded-md px-2 py-1 text-xs font-medium ${getProjectColor(project.name)}`}>
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
