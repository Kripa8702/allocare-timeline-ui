import React from "react";
import { isThisWeek, format } from "date-fns";
import { Employee, Project } from "../utils/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ProjectBlock from "./ProjectBlock";
import TimelineHeader from "./TimelineHeader";

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

const AllocationTable = ({ employees, weeks }: AllocationTableProps) => {
  const HOURS_PER_WEEK = 40;

  const getAllocationStatus = (percentage: number): AllocationStatus => {
    if (percentage === 100) return AllocationStatus.OPTIMAL;
    if (percentage > 100) return AllocationStatus.OVER_ALLOCATED;
    return AllocationStatus.UNDER_ALLOCATED;
  };

  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse w-full">
        <TableBody>
          {/* Timeline Header */}
          <TimelineHeader weeks={weeks} />
          {employees.map((employee) => (
            <React.Fragment key={employee.id}>
              {/* Employee row */}
              <TableRow className="border-b border-gray-200">
                <TableCell className="sticky left-0 z-10 bg-white p-4 border border-gray-200 align-top">
                  <div className="flex flex-col">
                    <span className="font-medium">{employee.name}</span>
                    <span className="text-sm text-gray-500">{employee.role}</span>
                  </div>
                </TableCell>
                {weeks.map((week, weekIndex) => {
                  const allocation = employee.allocations.find(
                    (a) => a.weekIndex === weekIndex
                  );
                  const percentage = allocation?.percentage || 0;
                  const hours = allocation?.hours || 0;
                  const status = getAllocationStatus(percentage);

                  // Get all projects for this week
                  const weekProjects = employee.projects.filter((project) => {
                    const endWeek = project.startWeek + Math.ceil(project.hours / HOURS_PER_WEEK) - 1;
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
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
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
                              {hours}h
                            </span>
                          </div>
                        </div>
                        <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${getAllocationBarClass(percentage)}`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
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
  );
};

// Helper function to get dot color based on allocation percentage
function getAllocationDotClass(percentage: number): string {
  if (percentage === 100) {
    return "bg-green-500"; // Green dot
  } else if (percentage > 100) {
    return "bg-red-500"; // Red dot
  } else {
    return "bg-yellow-500"; // Yellow dot
  }
}

// Helper function to get progress bar color based on allocation percentage
function getAllocationBarClass(percentage: number): string {
  if (percentage === 100) {
    return "bg-green-500"; // Green bar
  } else if (percentage > 100) {
    return "bg-red-500"; // Red bar
  } else {
    return "bg-yellow-500"; // Yellow bar
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
    return "bg-green-100 text-green-700"; // Green badge
  } else if (percentage > 100) {
    return "bg-red-100 text-red-700"; // Red badge
  } else {
    return "bg-yellow-100 text-yellow-700"; // Yellow badge
  }
}

export default AllocationTable;
