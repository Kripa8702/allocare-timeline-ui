import React from 'react';
import { format, startOfWeek, addDays, isWithinInterval, parseISO } from 'date-fns';
import { Employee, Weeks } from '@/utils/mockData';

interface DayViewProps {
  employees: Employee[];
  data: Weeks;
}

const DayView: React.FC<DayViewProps> = ({ employees, data }) => {
  // Get current week's Monday and Friday
  const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
  const friday = addDays(monday, 4);
  
  // Generate weekdays (Mon-Fri)
  const weekdays = Array.from({ length: 5 }, (_, i) => addDays(monday, i));

  // Find the current week's data
  const currentWeekData = data.weeks.find(week => {
    const [startDate, endDate] = week.week.split(' to ').map(date => parseISO(date));
    return isWithinInterval(monday, { start: startDate, end: endDate });
  });

  // Get employee allocations for the current week
  const getEmployeeAllocations = (employeeId: number, date: Date) => {
    if (!currentWeekData) return [];
    
    const employeeData = currentWeekData.data.find(
      emp => emp.employee_id === employeeId
    );
    
    if (!employeeData) return [];

    return employeeData.allocations.filter(allocation => {
      const allocationDate = parseISO(allocation.start_date);
      return format(allocationDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-2 text-left font-semibold text-gray-600">Employee</th>
            {weekdays.map((day) => (
              <th key={day.toISOString()} className="border p-2 text-center font-semibold text-gray-600">
                {format(day, 'EEE')}
                <br />
                {format(day, 'MMM d')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employee_id} className="hover:bg-gray-50">
              <td className="border p-2 font-medium">{employee.employee_name}</td>
              {weekdays.map((day) => {
                const allocations = getEmployeeAllocations(employee.employee_id, day);
                return (
                  <td key={day.toISOString()} className="border p-2">
                    {allocations.length > 0 ? (
                      <div className="space-y-1">
                        {allocations.map(allocation => (
                          <div 
                            key={allocation.project_id}
                            className="h-8 bg-purple-100 rounded p-1 text-sm"
                            title={`${allocation.project_name} (${allocation.hours_allocated}h)`}
                          >
                            {allocation.project_name}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-8 bg-gray-100 rounded"></div>
                    )}
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

export default DayView; 