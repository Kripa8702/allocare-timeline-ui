import { addDays, startOfWeek } from "date-fns";

export interface Employee {
  employee_id: number;
  employee_name: string;
  role: string;
}

export interface Project {
  project_id: number;
  project_name: string;
  color: string;
}

export interface ProjectAllocation {
  project_id: number;
  project_name: string;
  hours_allocated: number;
  actual_hours: number;
  percent_allocated: number;
  start_date: string;
  color_code: string;
}

export interface EmployeeAllocation {
  employee_id: number;
  employee_name: string;
  allocations: ProjectAllocation[];
  total_allocated_hours: number;
  total_actual_hours: number;
  percent_occupied: number;
}

export interface WeekData {
  week: string;
  data: EmployeeAllocation[];
}

export interface Weeks {
  weeks: WeekData[];
}

export const mockEmployees = [
  { employee_id: 52, employee_name: 'Vrajesh Rami', role: 'Developer' },
  { employee_id: 66, employee_name: 'Vats Patel', role: 'Developer' }
];

export const mockProjects: Project[] = [
  { project_id: 382, project_name: "Santusti", color: "#FFFFBA" },
  { project_id: 379, project_name: "Earth Monk - Branding", color: "#BAE1FF" },
  { project_id: 367, project_name: "Saraswati Shishukunj - Website", color: "#FFFFBA" }
];

export const mockData: Weeks = {
  "weeks": [
    {
      "week": "2025-04-28 to 2025-05-04",
      "data": [
        {
          "employee_id": 52,
          "employee_name": "Vrajesh Rami",
          "allocations": [
            {
              "project_id": 382,
              "project_name": "Santusti",
              "start_date": "2025-04-28",
              "hours_allocated": 10,
              "actual_hours": 0,
              "percent_allocated": 25,
              "color_code": "#FFFFBA"
            }
          ],
          "total_allocated_hours": 10,
          "total_actual_hours": 0,
          "percent_occupied": 25
        },
        {
          "employee_id": 66,
          "employee_name": "Vats Patel",
          "allocations": [],
          "total_allocated_hours": 0,
          "total_actual_hours": 0,
          "percent_occupied": 0
        }
      ]
    },
    {
      "week": "2025-05-05 to 2025-05-11",
      "data": [
        {
          "employee_id": 52,
          "employee_name": "Vrajesh Rami",
          "allocations": [
            {
              "project_id": 382,
              "project_name": "Santusti",
              "start_date": "2025-05-05",
              "hours_allocated": 12,
              "actual_hours": 0,
              "percent_allocated": 30,
              "color_code": "#FFFFBA"
            },
            {
              "project_id": 379,
              "project_name": "Earth Monk - Branding",
              "start_date": "2025-05-06",
              "hours_allocated": 15,
              "actual_hours": 0,
              "percent_allocated": 38,
              "color_code": "#BAE1FF"
            },
            {
              "project_id": 367,
              "project_name": "Saraswati Shishukunj - Website",
              "start_date": "2025-05-07",
              "hours_allocated": 6,
              "actual_hours": 0,
              "percent_allocated": 15,
              "color_code": "#FFFFBA"
            }
          ],
          "total_allocated_hours": 33,
          "total_actual_hours": 0,
          "percent_occupied": 83
        },
        {
          "employee_id": 66,
          "employee_name": "Vats Patel",
          "allocations": [],
          "total_allocated_hours": 0,
          "total_actual_hours": 0,
          "percent_occupied": 0
        }
      ]
    },
    {
      "week": "2025-05-12 to 2025-05-18",
      "data": [
        {
          "employee_id": 52,
          "employee_name": "Vrajesh Rami",
          "allocations": [],
          "total_allocated_hours": 0,
          "total_actual_hours": 0,
          "percent_occupied": 0
        },
        {
          "employee_id": 66,
          "employee_name": "Vats Patel",
          "allocations": [],
          "total_allocated_hours": 0,
          "total_actual_hours": 0,
          "percent_occupied": 0
        }
      ]
    },
    {
      "week": "2025-05-19 to 2025-05-25",
      "data": [
        {
          "employee_id": 52,
          "employee_name": "Vrajesh Rami",
          "allocations": [],
          "total_allocated_hours": 0,
          "total_actual_hours": 0,
          "percent_occupied": 0
        },
        {
          "employee_id": 66,
          "employee_name": "Vats Patel",
          "allocations": [],
          "total_allocated_hours": 0,
          "total_actual_hours": 0,
          "percent_occupied": 0
        }
      ]
    }
  ]
};
