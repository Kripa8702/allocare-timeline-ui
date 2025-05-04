import { AllocationData } from '@/services/allocationService';
import { Weeks, WeekData, EmployeeAllocation, ProjectAllocation } from './mockData';

interface ApiResponse {
  success: boolean;
  message: string;
  data: Array<{
    week: string;
    data: Array<{
      employee_id: number;
      employee_name: string;
      allocations: Array<{
        project_id: number;
        project_name: string;
        start_date: string;
        hours_allocated: number;
        actual_hours: number;
        percent_allocated: number;
        color_code: string;
      }>;
      total_allocated_hours: number;
      total_actual_hours: number;
      percent_occupied: number;
    }>;
  }>;
}

const transformAllocationData = (response: ApiResponse): Weeks => {
  if (!response || !response.success || !response.data || !Array.isArray(response.data)) {
    throw new Error('Invalid data format received from API');
  }

  const transformedWeeks: WeekData[] = response.data.map(week => {
    if (!week || !week.data || !Array.isArray(week.data)) {
      throw new Error('Invalid week data format');
    }

    const transformedData: EmployeeAllocation[] = week.data.map(employee => {
      if (!employee || !employee.employee_id || !employee.employee_name) {
        throw new Error('Invalid employee data format');
      }

      const transformedAllocations: ProjectAllocation[] = (employee.allocations || []).map(allocation => {
        if (!allocation || !allocation.project_id || !allocation.project_name) {
          throw new Error('Invalid allocation data format');
        }

        return {
          project_id: allocation.project_id,
          project_name: allocation.project_name,
          hours_allocated: allocation.hours_allocated || 0,
          actual_hours: allocation.actual_hours || 0,
          percent_allocated: allocation.percent_allocated || 0,
          start_date: allocation.start_date || '',
          color_code: allocation.color_code || '#FFFFBA'
        };
      });

      return {
        employee_id: employee.employee_id,
        employee_name: employee.employee_name,
        allocations: transformedAllocations,
        total_allocated_hours: employee.total_allocated_hours || 0,
        total_actual_hours: employee.total_actual_hours || 0,
        percent_occupied: employee.percent_occupied || 0
      };
    });

    return {
      week: week.week || '',
      data: transformedData
    };
  });

  return {
    weeks: transformedWeeks
  };
};

export { transformAllocationData }; 