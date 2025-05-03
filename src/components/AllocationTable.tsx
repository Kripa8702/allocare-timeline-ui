import React from 'react';
import { Employee, Weeks, mockEmployees } from '../utils/mockData';
import ProjectBlock from './ProjectBlock';
import AllocationStatus from './AllocationStatus';
import { addDays, startOfWeek, format, parseISO, isWithinInterval } from 'date-fns';

interface AllocationTableProps {
  data: Weeks;
  onWeekClick?: (weekStart: string, weekEnd: string) => void;
}

const AllocationTable: React.FC<AllocationTableProps> = ({ data, onWeekClick }) => {
  // Ensure we have data and at least one week
  if (!data?.weeks || data.weeks.length === 0) {
    return <div>No data available</div>;
  }

  // Find the current week's data
  const today = new Date();
  const currentWeekData = data.weeks.find(week => {
    const [startDate, endDate] = week.week.split(' to ').map(date => parseISO(date));
    return isWithinInterval(today, { start: startDate, end: endDate });
  });

  // If no current week found, use the first week in data
  const startWeek = currentWeekData ? parseISO(currentWeekData.week.split(' to ')[0]) : parseISO(data.weeks[0].week.split(' to ')[0]);

  // Generate 4 weeks of dates starting from the current week
  const weeks = Array.from({ length: 4 }, (_, i) => {
    // Start from Monday of the current week
    const weekStart = startOfWeek(startWeek, { weekStartsOn: 1 });
    // Generate Monday to Friday dates
    return Array.from({ length: 5 }, (_, j) => addDays(weekStart, i * 7 + j));
  });

  const getWeekData = (weekDates: Date[]) => {
    const weekStart = format(weekDates[0], 'yyyy-MM-dd');
    return data.weeks.find(week => week.week.startsWith(weekStart));
  };

  const handleCellClick = (weekDates: Date[]) => {
    const weekStart = format(weekDates[0], 'yyyy-MM-dd');
    const weekEnd = format(weekDates[4], 'yyyy-MM-dd');
    onWeekClick?.(weekStart, weekEnd);
  };

  const calculateActualAllocation = (employeeWeekData: any) => {
    if (!employeeWeekData?.allocations) return { percentage: 0, hours: 0 };
    
    const totalActualHours = employeeWeekData.total_actual_hours || 0;
    const totalPlannedHours = employeeWeekData.total_allocated_hours || 0;
    
    const actualPercentage = totalPlannedHours > 0 
      ? Math.round((totalActualHours / totalPlannedHours) * 100)
      : 0;

    return {
      percentage: actualPercentage,
      hours: totalActualHours
    };
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="p-2 border-r border-t border-l border-gray-200 min-w-[200px] align-top">Employee</th>
            {weeks.map((weekDates, weekIndex) => (
              <th 
                key={weekIndex} 
                className="p-2 border-r border-t border-gray-200 min-w-[200px] align-top cursor-pointer hover:bg-gray-50"
                onClick={() => handleCellClick(weekDates)}
              >
                <div className="font-medium">
                  {format(weekDates[0], 'MMM d')} - {format(weekDates[4], 'MMM d')}
                </div>
                <div className="grid grid-cols-5 gap-1 mt-2">
                  {weekDates.map((date, dayIndex) => (
                    <div key={dayIndex} className="text-xs text-gray-500 text-center">
                      {format(date, 'EEE')}
                    </div>
                  ))}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockEmployees.map((employee) => (
            <tr key={employee.employee_id}>
              <td className="p-2 border border-gray-200 min-w-[200px] align-top">
                <div className="font-medium">{employee.employee_name}</div>
              </td>

              {weeks.map((weekDates, weekIndex) => {
                const weekData = getWeekData(weekDates);
                const employeeWeekData = weekData?.data.find(
                  (e) => e.employee_id === employee.employee_id
                );

                const actualAllocation = calculateActualAllocation(employeeWeekData);

                return (
                  <td 
                    key={weekIndex} 
                    className="p-2 border border-gray-200 min-w-[200px] align-top"
                  >
                    <div className="space-y-2">
                      <AllocationStatus 
                        percentage={employeeWeekData?.percent_occupied || 0}
                        totalHours={employeeWeekData?.total_allocated_hours || 0}
                        actualPercentage={actualAllocation.percentage}
                        actualHours={actualAllocation.hours}
                      />
                      {employeeWeekData?.allocations?.map((allocation) => (
                        <ProjectBlock
                          key={allocation.project_id}
                          allocation={allocation}
                        />
                      ))}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllocationTable;