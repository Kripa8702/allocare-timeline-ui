import { AllocationData } from '@/services/allocationService';
import { Weeks, WeekData, EmployeeAllocation, ProjectAllocation } from './mockData';

export const transformAllocationData = (data: AllocationData): Weeks => {
  const transformedWeeks: WeekData[] = data.weeks.map(week => {
    const transformedData: EmployeeAllocation[] = week.data.map(employee => {
      const transformedAllocations: ProjectAllocation[] = employee.allocations.map(allocation => ({
        project_id: allocation.project_id,
        project_name: allocation.project_name,
        hours_allocated: allocation.hours_allocated,
        actual_hours: allocation.actual_hours,
        percent_allocated: allocation.percent_allocated,
        start_date: allocation.start_date,
        color_code: '#FFFFBA' // Default color, you might want to get this from a project mapping
      }));

      return {
        employee_id: employee.employee_id,
        employee_name: employee.employee_name,
        allocations: transformedAllocations,
        total_allocated_hours: employee.total_allocated_hours,
        total_actual_hours: employee.total_actual_hours,
        percent_occupied: employee.percent_occupied
      };
    });

    return {
      week: week.week,
      data: transformedData
    };
  });

  return {
    weeks: transformedWeeks
  };
}; 