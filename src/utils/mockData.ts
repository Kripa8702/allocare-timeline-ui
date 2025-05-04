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
  end_date?: string;
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
  { employee_id: 66, employee_name: 'Vats Patel', role: 'Developer' },
  { employee_id: 71, employee_name: 'Hetvi Shah', role: 'Designer' },
  { employee_id: 88, employee_name: 'Rahul Mehta', role: 'QA Engineer' }
];


export const mockProjects: Project[] = [
  { project_id: 382, project_name: "Santusti", color: "#FFFFBA" },
  { project_id: 379, project_name: "Earth Monk - Branding", color: "#BAE1FF" },
  { project_id: 367, project_name: "Saraswati Shishukunj - Website", color: "#FFFFBA" },
  { project_id: 401, project_name: "Gujarat Gramya Bank App", color: "#C1FFD7" },
  { project_id: 413, project_name: "Allora Dashboard", color: "#FFBABA" }
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
              "actual_hours": 10,
              "percent_allocated": 30,
              "color_code": "#FFFFBA"
            },
            {
              "project_id": 379,
              "project_name": "Earth Monk - Branding",
              "start_date": "2025-05-06",
              "hours_allocated": 15,
              "actual_hours": 13,
              "percent_allocated": 38,
              "color_code": "#BAE1FF"
            }
          ],
          "total_allocated_hours": 27,
          "total_actual_hours": 23,
          "percent_occupied": 68
        },
        {
          "employee_id": 66,
          "employee_name": "Vats Patel",
          "allocations": [
            {
              "project_id": 401,
              "project_name": "Gujarat Gramya Bank App",
              "start_date": "2025-05-05",
              "hours_allocated": 32,
              "actual_hours": 30,
              "percent_allocated": 80,
              "color_code": "#C1FFD7"
            }
          ],
          "total_allocated_hours": 32,
          "total_actual_hours": 30,
          "percent_occupied": 80
        },
        {
          "employee_id": 71,
          "employee_name": "Hetvi Shah",
          "allocations": [
            {
              "project_id": 413,
              "project_name": "Allora Dashboard",
              "start_date": "2025-05-06",
              "hours_allocated": 20,
              "actual_hours": 18,
              "percent_allocated": 50,
              "color_code": "#FFBABA"
            }
          ],
          "total_allocated_hours": 20,
          "total_actual_hours": 18,
          "percent_occupied": 50
        },
        {
          "employee_id": 88,
          "employee_name": "Rahul Mehta",
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
          "allocations": [
            {
              "project_id": 382,
              "project_name": "Santusti",
              "start_date": "2025-05-13",
              "hours_allocated": 16,
              "actual_hours": 14,
              "percent_allocated": 40,
              "color_code": "#FFFFBA"
            }
          ],
          "total_allocated_hours": 16,
          "total_actual_hours": 14,
          "percent_occupied": 40
        },
        {
          "employee_id": 66,
          "employee_name": "Vats Patel",
          "allocations": [
            {
              "project_id": 401,
              "project_name": "Gujarat Gramya Bank App",
              "start_date": "2025-05-12",
              "hours_allocated": 28,
              "actual_hours": 25,
              "percent_allocated": 70,
              "color_code": "#C1FFD7"
            }
          ],
          "total_allocated_hours": 28,
          "total_actual_hours": 25,
          "percent_occupied": 70
        },
        {
          "employee_id": 71,
          "employee_name": "Hetvi Shah",
          "allocations": [
            {
              "project_id": 413,
              "project_name": "Allora Dashboard",
              "start_date": "2025-05-14",
              "hours_allocated": 18,
              "actual_hours": 16,
              "percent_allocated": 45,
              "color_code": "#FFBABA"
            }
          ],
          "total_allocated_hours": 18,
          "total_actual_hours": 16,
          "percent_occupied": 45
        },
        {
          "employee_id": 88,
          "employee_name": "Rahul Mehta",
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
          "allocations": [
            {
              "project_id": 367,
              "project_name": "Saraswati Shishukunj - Website",
              "start_date": "2025-05-20",
              "hours_allocated": 20,
              "actual_hours": 18,
              "percent_allocated": 50,
              "color_code": "#FFFFBA"
            }
          ],
          "total_allocated_hours": 20,
          "total_actual_hours": 18,
          "percent_occupied": 50
        },
        {
          "employee_id": 66,
          "employee_name": "Vats Patel",
          "allocations": [],
          "total_allocated_hours": 0,
          "total_actual_hours": 0,
          "percent_occupied": 0
        },
        {
          "employee_id": 71,
          "employee_name": "Hetvi Shah",
          "allocations": [
            {
              "project_id": 379,
              "project_name": "Earth Monk - Branding",
              "start_date": "2025-05-19",
              "hours_allocated": 24,
              "actual_hours": 22,
              "percent_allocated": 60,
              "color_code": "#BAE1FF"
            }
          ],
          "total_allocated_hours": 24,
          "total_actual_hours": 22,
          "percent_occupied": 60
        },
        {
          "employee_id": 88,
          "employee_name": "Rahul Mehta",
          "allocations": [
            {
              "project_id": 401,
              "project_name": "Gujarat Gramya Bank App",
              "start_date": "2025-05-21",
              "hours_allocated": 20,
              "actual_hours": 18,
              "percent_allocated": 50,
              "color_code": "#C1FFD7"
            }
          ],
          "total_allocated_hours": 20,
          "total_actual_hours": 18,
          "percent_occupied": 50
        }
      ]
    }

  ]
};
