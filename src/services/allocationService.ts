import { format, startOfWeek } from 'date-fns';

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

export const fetchAllocations = async (): Promise<AllocationData> => {
  const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const response = await fetch('http://127.0.0.1:8000/api/allocations', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      start_date: format(currentWeekStart, 'yyyy-MM-dd')
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch allocation data');
  }

  return response.json();
}; 