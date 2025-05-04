import { format, startOfWeek, addWeeks } from 'date-fns';
import { Weeks } from '@/utils/mockData';
import { transformAllocationData } from '@/utils/dataTransformer';

export interface AllocationData {
  weeks: {
    week: string;
    data: {
      employee_id: number;
      employee_name: string;
      total_allocated_hours: number;
      total_actual_hours: number;
      percent_occupied: number;
      allocations: {
        project_id: number;
        project_name: string;
        hours_allocated: number;
        actual_hours: number;
        percent_allocated: number;
        start_date: string;
        end_date: string;
      }[];
    }[];
  }[];
}

export const fetchAllocations = async (): Promise<Weeks> => {
  const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const endDate = addWeeks(currentWeekStart, 24);
  const token = localStorage.getItem('token');

  console.log(token);
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch('https://b3ef-103-240-207-253.ngrok-free.app/api/allocations', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      start_date: format(currentWeekStart, 'yyyy-MM-dd'),
      end_date: format(endDate, 'yyyy-MM-dd')
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch allocation data');
  }

  const data = await response.json();
  return transformAllocationData(data);
}; 
