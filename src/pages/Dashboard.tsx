import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from "@/components/ui/progress";
import { mockData, mockEmployees, mockProjects } from '@/utils/mockData';
import { format, parseISO } from 'date-fns';

// Dashboard stats component
const StatCard = ({ 
  title, 
  value, 
  total, 
  percentChange, 
  icon 
}: { 
  title: string; 
  value: number | string; 
  total?: number | string; 
  percentChange: number; 
  icon: React.ReactNode;
}) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <h3 className="text-2xl font-semibold">{value}</h3>
            {total && <span className="text-gray-500">/ {total}</span>}
          </div>
        </div>
        <div className="rounded-full p-2 bg-blue-100 text-blue-600">
          {icon}
        </div>
      </div>
      <div className="mt-2">
        <span className={`text-xs flex items-center gap-1 ${percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <span className="text-xs">
            {percentChange >= 0 ? '↑' : '↓'} {Math.abs(percentChange)}%
          </span>
          Increase from Last Month
        </span>
      </div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  // Calculate insights from mockData
  const currentWeek = mockData.weeks[0];
  const nextWeek = mockData.weeks[1];

  // Calculate total hours allocated across all employees
  const totalHoursAllocated = currentWeek.data.reduce((sum, emp) => sum + emp.total_allocated_hours, 0);
  const totalPossibleHours = mockEmployees.length * 40; // 40 hours per week per employee
  const utilizationRate = (totalHoursAllocated / totalPossibleHours) * 100;

  // Calculate number of active projects
  const activeProjects = new Set(currentWeek.data.flatMap(emp => 
    emp.allocations.map(alloc => alloc.project_id)
  )).size;

  // Calculate number of fully allocated employees
  const fullyAllocatedEmployees = currentWeek.data.filter(emp => emp.percent_occupied === 100).length;

  // Calculate number of under-allocated employees
  const underAllocatedEmployees = currentWeek.data.filter(emp => emp.percent_occupied < 100).length;

  // Stats for the dashboard
  const stats = [
    { 
      title: "Active Projects", 
      value: activeProjects, 
      total: mockProjects.length, 
      percentChange: 0,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
    },
    { 
      title: "Resource Utilization", 
      value: Math.round(utilizationRate), 
      total: "100%", 
      percentChange: 0,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    },
    { 
      title: "Fully Allocated", 
      value: fullyAllocatedEmployees, 
      total: mockEmployees.length, 
      percentChange: 0,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5 22v-4a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v4"/></svg>
    },
    { 
      title: "Under Allocated", 
      value: underAllocatedEmployees, 
      total: mockEmployees.length, 
      percentChange: 0,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5 22v-4a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v4"/></svg>
    },
  ];

  // Get current week's projects with their allocations
  const currentProjects = currentWeek.data.flatMap(emp => 
    emp.allocations.map(alloc => ({
      name: alloc.project_name,
      manager: emp.employee_name,
      dueDate: format(parseISO(alloc.start_date), 'MMM d, yyyy'),
      status: alloc.percent_allocated === 100 ? "Fully Allocated" : "Partially Allocated",
      progress: alloc.percent_allocated
    }))
  );

  // Remove duplicate projects
  const uniqueProjects = Array.from(new Map(currentProjects.map(p => [p.name, p])).values());

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <div className="flex items-baseline mt-2">
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="ml-2 text-sm text-gray-500">/ {stat.total}</p>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Current Week's Projects</h3>
            <div className="space-y-4">
              {uniqueProjects.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-gray-500">Manager: {project.manager}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Due: {project.dueDate}</p>
                    <p className="text-sm font-medium text-purple-600">{project.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Resource Allocation Overview</h3>
            <div className="space-y-4">
              {currentWeek.data.map((employee) => (
                <div key={employee.employee_id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">{employee.employee_name}</p>
                    <p className="text-sm font-medium text-purple-600">
                      {employee.percent_occupied}% Allocated
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${employee.percent_occupied}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
