import { addDays, startOfWeek } from "date-fns";

// Generate 4 weeks of dates starting from now
export const weekDates: Date[][] = Array.from({ length: 4 }, (_, weekIndex) => {
  const thisWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start from Monday
  const weekStart = addDays(thisWeekStart, weekIndex * 7);

  // Create array of 7 days for this week
  return Array.from({ length: 7 }, (_, dayIndex) => {
    return addDays(weekStart, dayIndex);
  });
});

export interface Project {
  id: string;
  name: string;
  startWeek: number;
  hours: number;  // Total hours allocated to the project
  rowIndex: number;
  color: string;
}

export interface WeekAllocation {
  weekIndex: number;
  percentage: number;
  hours: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  allocations: WeekAllocation[];
  projects: Project[];
}

const projectNames = ["TD", "HMS", "GSA", "VCT", "BRT", "LMS"];

export function generateMockEmployees(): Employee[] {
  return [
    {
      id: "1",
      name: "John Smith",
      role: "Frontend Developer",
      allocations: [
        { weekIndex: 0, percentage: 100, hours: 40 },
        { weekIndex: 1, percentage: 120, hours: 48 },
        { weekIndex: 2, percentage: 100, hours: 40 },
        { weekIndex: 3, percentage: 80, hours: 32 },
      ],
      projects: [
        { id: "p1", name: "TD", startWeek: 0, hours: 60, rowIndex: 0, color: "bg-blue-800" },
        { id: "p2", name: "HMS", startWeek: 0, hours: 120, rowIndex: 1, color: "bg-green-800" },
        { id: "p3", name: "GSA", startWeek: 3, hours: 32, rowIndex: 0, color: "bg-yellow-800" },
      ],
    },
    {
      id: "2",
      name: "Emma Johnson",
      role: "UI/UX Designer",
      allocations: [
        { weekIndex: 0, percentage: 80, hours: 32 },
        { weekIndex: 1, percentage: 100, hours: 40 },
        { weekIndex: 2, percentage: 100, hours: 40 },
        { weekIndex: 3, percentage: 60, hours: 24 },
      ],
      projects: [
        { id: "p4", name: "VCT", startWeek: 0, hours: 60, rowIndex: 0, color: "bg-purple-800" },
        { id: "p5", name: "BRT", startWeek: 1, hours: 60, rowIndex: 1, color: "bg-pink-800" },
      ],
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Backend Developer",
      allocations: [
        { weekIndex: 0, percentage: 100, hours: 40 },
        { weekIndex: 1, percentage: 100, hours: 40 },
        { weekIndex: 2, percentage: 100, hours: 40 },
        { weekIndex: 3, percentage: 100, hours: 40 },
      ],
      projects: [
        { id: "p6", name: "TD", startWeek: 0, hours: 60, rowIndex: 0, color: "bg-blue-800" },
        { id: "p7", name: "LMS", startWeek: 2, hours: 80, rowIndex: 0, color: "bg-orange-800" },
      ],
    },
    {
      id: "4",
      name: "Sophia Martinez",
      role: "Project Manager",
      allocations: [
        { weekIndex: 0, percentage: 60, hours: 24 },
        { weekIndex: 1, percentage: 80, hours: 32 },
        { weekIndex: 2, percentage: 80, hours: 32 },
        { weekIndex: 3, percentage: 100, hours: 40 },
      ],
      projects: [
        { id: "p8", name: "HMS", startWeek: 0, hours: 24, rowIndex: 0, color: "bg-green-800" },
        { id: "p9", name: "GSA", startWeek: 1, hours: 60, rowIndex: 0, color: "bg-yellow-800" },
        { id: "p10", name: "VCT", startWeek: 1, hours: 64, rowIndex: 1, color: "bg-purple-800" },
        { id: "p11", name: "BRT", startWeek: 3, hours: 40, rowIndex: 0, color: "bg-pink-800" },
      ],
    },
    {
      id: "5",
      name: "David Wilson",
      role: "QA Engineer",
      allocations: [
        { weekIndex: 0, percentage: 100, hours: 40 },
        { weekIndex: 1, percentage: 80, hours: 32 },
        { weekIndex: 2, percentage: 80, hours: 32 },
        { weekIndex: 3, percentage: 100, hours: 40 },
      ],
      projects: [
        { id: "p12", name: "HMS", startWeek: 0, hours: 40, rowIndex: 0, color: "bg-green-800" },
        { id: "p13", name: "TD", startWeek: 1, hours: 60, rowIndex: 0, color: "bg-blue-800" },
        { id: "p14", name: "GSA", startWeek: 3, hours: 20, rowIndex: 0, color: "bg-yellow-800" },
        { id: "p15", name: "VCT", startWeek: 3, hours: 20, rowIndex: 1, color: "bg-purple-800" },
      ],
    },
  ];
}
