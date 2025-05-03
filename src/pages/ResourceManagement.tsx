import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { mockData, mockEmployees } from '@/utils/mockData';
import { format, parseISO, addDays, startOfWeek, endOfMonth, startOfMonth, addMonths, addWeeks } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ResourceManagement = () => {
  // Get current week and future weeks
  const today = new Date();
  const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  const futureDate = addWeeks(currentWeekStart, 24); // Show 24 weeks from current week
  
  // Generate weeks from current week
  const weeks = [];
  let currentDate = currentWeekStart;
  while (currentDate <= futureDate) {
    const weekDates = Array.from({ length: 5 }, (_, i) => addDays(currentDate, i));
    weeks.push(weekDates);
    currentDate = addDays(currentDate, 7);
  }

  const getCellColor = (percentage: number) => {
    if (percentage > 100) return 'bg-red-500';
    if (percentage === 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-yellow-300';
    return 'bg-blue-200';
  };

  const getEmployeeAllocation = (employeeId: number, weekStart: Date) => {
    const weekStartStr = format(weekStart, 'yyyy-MM-dd');
    const weekData = mockData.weeks.find(week => week.week.startsWith(weekStartStr));
    if (!weekData) return { percentage: 0, hours: 0 };

    const employeeData = weekData.data.find(emp => emp.employee_id === employeeId);
    return {
      percentage: employeeData?.percent_occupied || 0,
      hours: employeeData?.total_allocated_hours || 0
    };
  };

  return (
    <div className="p-6">
      <Card className="bg-white">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-6">
            Resource Allocation Heat Map - Next 24 Weeks
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse table-fixed">
              <colgroup>
                <col className="w-40" />
                {weeks.map((_, index) => (
                  <col key={index} className="w-8" />
                ))}
              </colgroup>
              <thead>
                <tr>
                  <th className="p-1 text-left font-medium text-gray-500 border text-xs">Employee</th>
                  {weeks.map((week, weekIndex) => (
                    <th key={weekIndex} className="p-1 text-center font-medium text-gray-500 border">
                      <div className="text-xs truncate">
                        {format(week[0], 'MMM d')}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockEmployees.map((employee) => (
                  <tr key={employee.employee_id} className="border">
                    <td className="p-1 font-medium text-xs border-r truncate">
                      {employee.employee_name}
                    </td>
                    {weeks.map((week, weekIndex) => {
                      const allocation = getEmployeeAllocation(employee.employee_id, week[0]);
                      return (
                        <td key={weekIndex} className="border-r">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div 
                                  className={`flex h-5 ${getCellColor(allocation.percentage)}`}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="text-xs">
                                  <div>Week: {format(week[0], 'MMM d')} - {format(week[4], 'MMM d')}</div>
                                  <div>Hours: {allocation.hours}/40</div>
                                  <div>Allocation: {allocation.percentage}%</div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <div className="text-xs font-medium">Allocation Level:</div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500"></div>
              <span className="text-xs">100% Allocated</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-300"></div>
              <span className="text-xs">80-99% Allocated</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-200"></div>
              <span className="text-xs">Under 80%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500"></div>
              <span className="text-xs">Over Allocated</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceManagement;
