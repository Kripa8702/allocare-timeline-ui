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
  percent_allocated: number;
  start_date: string;
  color: string;
}

export interface EmployeeAllocation {
  employee_id: number;
  employee_name: string;
  allocations: ProjectAllocation[];
  total_allocated_hours: number;
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
  { employee_id: 1, employee_name: 'John Smith', role: 'Senior Developer' },
  { employee_id: 2, employee_name: 'Sarah Johnson', role: 'Project Manager' },
  { employee_id: 3, employee_name: 'Michael Chen', role: 'UI/UX Designer' },
  { employee_id: 4, employee_name: 'Emily Davis', role: 'Frontend Developer' },
  { employee_id: 5, employee_name: 'David Wilson', role: 'Backend Developer' },
  { employee_id: 6, employee_name: 'Lisa Anderson', role: 'QA Engineer' },
  { employee_id: 7, employee_name: 'Robert Taylor', role: 'DevOps Engineer' },
  { employee_id: 8, employee_name: 'Maria Garcia', role: 'Product Owner' },
  { employee_id: 9, employee_name: 'James Brown', role: 'Full Stack Developer' },
  { employee_id: 10, employee_name: 'Emma Thompson', role: 'Business Analyst' },
  { employee_id: 11, employee_name: 'Alex Rodriguez', role: 'Mobile Developer' },
  { employee_id: 12, employee_name: 'Sophie Martin', role: 'Data Scientist' },
  { employee_id: 13, employee_name: 'Daniel Lee', role: 'Security Engineer' },
  { employee_id: 14, employee_name: 'Olivia White', role: 'Technical Writer' },
  { employee_id: 15, employee_name: 'William Clark', role: 'System Architect' }
];

export const mockProjects: Project[] = [
  { project_id: 1, project_name: "Website Redesign", color: "#4F46E5" },
  { project_id: 2, project_name: "Mobile App Development", color: "#10B981" },
  { project_id: 3, project_name: "AI Chatbot", color: "#F59E0B" },
  { project_id: 4, project_name: "CRM Upgrade", color: "#EF4444" },
  { project_id: 5, project_name: "Internal Dashboard", color: "#8B5CF6" },
  { project_id: 6, project_name: "DevOps Automation", color: "#EC4899" },
];

export const mockData: Weeks = {
  "weeks": [
    {
      "week": "2025-05-05 to 2025-05-09",
      "data": [
        {
          "employee_id": 1,
          "employee_name": "John Smith",
          "allocations": [
            {
              "project_id": 1,
              "project_name": "Website Redesign",
              "hours_allocated": 25,
              "percent_allocated": 62.5,
              "start_date": "2025-05-07",
              "color": "#4F46E5"
            },
            {
              "project_id": 2,
              "project_name": "Mobile App Development",
              "hours_allocated": 15,
              "percent_allocated": 37.5,
              "start_date": "2025-05-07",
              "color": "#10B981"
            }
          ],
          "total_allocated_hours": 40,
          "percent_occupied": 100
        },
        {
          "employee_id": 2,
          "employee_name": "Sarah Johnson",
          "allocations": [
            {
              "project_id": 1,
              "project_name": "Website Redesign",
              "hours_allocated": 20,
              "percent_allocated": 50,
              "start_date": "2025-05-05",
              "color": "#4F46E5"
            },
            {
              "project_id": 3,
              "project_name": "AI Chatbot",
              "hours_allocated": 15,
              "percent_allocated": 37.5,
              "start_date": "2025-05-05",
              "color": "#F59E0B"
            }
          ],
          "total_allocated_hours": 35,
          "percent_occupied": 87.5
        },
        {
          "employee_id": 3,
          "employee_name": "Michael Chen",
          "allocations": [
            {
              "project_id": 1,
              "project_name": "Website Redesign",
              "hours_allocated": 30,
              "percent_allocated": 75,
              "start_date": "2025-05-05",
              "color": "#4F46E5"
            }
          ],
          "total_allocated_hours": 30,
          "percent_occupied": 75
        },
        {
          "employee_id": 4,
          "employee_name": "Emily Davis",
          "allocations": [
            {
              "project_id": 1,
              "project_name": "Website Redesign",
              "hours_allocated": 20,
              "percent_allocated": 50,
              "start_date": "2025-05-05",
              "color": "#4F46E5"
            },
            {
              "project_id": 2,
              "project_name": "Mobile App Development",
              "hours_allocated": 20,
              "percent_allocated": 50,
              "start_date": "2025-05-07",
              "color": "#10B981"
            }
          ],
          "total_allocated_hours": 40,
          "percent_occupied": 100
        },
        {
          "employee_id": 5,
          "employee_name": "David Wilson",
          "allocations": [
            {
              "project_id": 3,
              "project_name": "AI Chatbot",
              "hours_allocated": 35,
              "percent_allocated": 87.5,
              "start_date": "2025-05-05",
              "color": "#F59E0B"
            }
          ],
          "total_allocated_hours": 35,
          "percent_occupied": 87.5
        }
      ]
    },
    {
      "week": "2025-05-12 to 2025-05-16",
      "data": [
        {
          "employee_id": 1,
          "employee_name": "John Smith",
          "allocations": [
            {
              "project_id": 1,
              "project_name": "Website Redesign",
              "hours_allocated": 40,
              "percent_allocated": 100,
              "start_date": "2025-05-12",
              "color": "#4F46E5"
            }
          ],
          "total_allocated_hours": 40,
          "percent_occupied": 100
        },
        {
          "employee_id": 2,
          "employee_name": "Sarah Johnson",
          "allocations": [
            {
              "project_id": 3,
              "project_name": "AI Chatbot",
              "hours_allocated": 30,
              "percent_allocated": 75,
              "start_date": "2025-05-12",
              "color": "#F59E0B"
            }
          ],
          "total_allocated_hours": 30,
          "percent_occupied": 75
        },
        {
          "employee_id": 6,
          "employee_name": "Lisa Anderson",
          "allocations": [
            {
              "project_id": 4,
              "project_name": "CRM Upgrade",
              "hours_allocated": 40,
              "percent_allocated": 100,
              "start_date": "2025-05-12",
              "color": "#EF4444"
            }
          ],
          "total_allocated_hours": 40,
          "percent_occupied": 100
        },
        {
          "employee_id": 7,
          "employee_name": "Robert Taylor",
          "allocations": [
            {
              "project_id": 2,
              "project_name": "Mobile App Development",
              "hours_allocated": 25,
              "percent_allocated": 62.5,
              "start_date": "2025-05-12",
              "color": "#10B981"
            }
          ],
          "total_allocated_hours": 25,
          "percent_occupied": 62.5
        }
      ]
    }
  ]
};

export const mockActualTimeLogs: Weeks = {
  "weeks": [
    {
      "week": "2025-04-28 to 2025-05-02",
      "data": [
        {
          "employee_id": 1,
          "employee_name": "John Smith",
          "allocations": [
            {
              "project_id": 1,
              "project_name": "Website Redesign",
              "hours_allocated": 22,
              "percent_allocated": 55,
              "start_date": "2025-04-28",
              "color": "#4F46E5"
            },
            {
              "project_id": 2,
              "project_name": "Mobile App Development",
              "hours_allocated": 18,
              "percent_allocated": 45,
              "start_date": "2025-04-28",
              "color": "#10B981"
            }
          ],
          "total_allocated_hours": 40,
          "percent_occupied": 100
        },
        {
          "employee_id": 2,
          "employee_name": "Sarah Johnson",
          "allocations": [
            {
              "project_id": 1,
              "project_name": "Website Redesign",
              "hours_allocated": 18,
              "percent_allocated": 45,
              "start_date": "2025-04-28",
              "color": "#4F46E5"
            },
            {
              "project_id": 3,
              "project_name": "AI Chatbot",
              "hours_allocated": 12,
              "percent_allocated": 30,
              "start_date": "2025-04-28",
              "color": "#F59E0B"
            }
          ],
          "total_allocated_hours": 30,
          "percent_occupied": 75
        },
        {
          "employee_id": 3,
          "employee_name": "Michael Chen",
          "allocations": [
            {
              "project_id": 1,
              "project_name": "Website Redesign",
              "hours_allocated": 28,
              "percent_allocated": 70,
              "start_date": "2025-04-28",
              "color": "#4F46E5"
            }
          ],
          "total_allocated_hours": 28,
          "percent_occupied": 70
        }
      ]
    },
    {
      "week": "2025-05-05 to 2025-05-09",
      "data": [
        {
          "employee_id": 1,
          "employee_name": "John Smith",
          "allocations": [
            {
              "project_id": 1,
              "project_name": "Website Redesign",
              "hours_allocated": 23,
              "percent_allocated": 57.5,
              "start_date": "2025-05-05",
              "color": "#4F46E5"
            },
            {
              "project_id": 2,
              "project_name": "Mobile App Development",
              "hours_allocated": 14,
              "percent_allocated": 35,
              "start_date": "2025-05-05",
              "color": "#10B981"
            }
          ],
          "total_allocated_hours": 37,
          "percent_occupied": 92.5
        },
        {
          "employee_id": 2,
          "employee_name": "Sarah Johnson",
          "allocations": [
            {
              "project_id": 1,
              "project_name": "Website Redesign",
              "hours_allocated": 19,
              "percent_allocated": 47.5,
              "start_date": "2025-05-05",
              "color": "#4F46E5"
            },
            {
              "project_id": 3,
              "project_name": "AI Chatbot",
              "hours_allocated": 13,
              "percent_allocated": 32.5,
              "start_date": "2025-05-05",
              "color": "#F59E0B"
            }
          ],
          "total_allocated_hours": 32,
          "percent_occupied": 80
        },
        {
          "employee_id": 3,
          "employee_name": "Michael Chen",
          "allocations": [
            {
              "project_id": 1,
              "project_name": "Website Redesign",
              "hours_allocated": 29,
              "percent_allocated": 72.5,
              "start_date": "2025-05-05",
              "color": "#4F46E5"
            }
          ],
          "total_allocated_hours": 29,
          "percent_occupied": 72.5
        },
        {
          "employee_id": 4,
          "employee_name": "Emily Davis",
          "allocations": [
            {
              "project_id": 1,
              "project_name": "Website Redesign",
              "hours_allocated": 18,
              "percent_allocated": 45,
              "start_date": "2025-05-05",
              "color": "#4F46E5"
            },
            {
              "project_id": 2,
              "project_name": "Mobile App Development",
              "hours_allocated": 19,
              "percent_allocated": 47.5,
              "start_date": "2025-05-05",
              "color": "#10B981"
            }
          ],
          "total_allocated_hours": 37,
          "percent_occupied": 92.5
        },
        {
          "employee_id": 5,
          "employee_name": "David Wilson",
          "allocations": [
            {
              "project_id": 3,
              "project_name": "AI Chatbot",
              "hours_allocated": 33,
              "percent_allocated": 82.5,
              "start_date": "2025-05-05",
              "color": "#F59E0B"
            }
          ],
          "total_allocated_hours": 33,
          "percent_occupied": 82.5
        }
      ]
    }
  ]
};
