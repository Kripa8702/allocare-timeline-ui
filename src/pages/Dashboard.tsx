import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { mockEmployees, mockProjects } from '@/utils/mockData';
import { format } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useAllocation } from '@/contexts/AllocationContext';

export default function Dashboard() {
  const { allocationData, isLoading, error, refreshData } = useAllocation();

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p>Error: {error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!allocationData || !allocationData.weeks.length) {
    return (
      <div className="p-6">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <p>No allocation data available</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate insights from API data
  const currentWeek = allocationData.weeks[0];

  // Calculate total hours allocated and actual hours across all employees
  const totalHoursAllocated = currentWeek.data.reduce((sum, emp) => sum + emp.total_allocated_hours, 0);
  const totalActualHours = currentWeek.data.reduce((sum, emp) => sum + emp.total_actual_hours, 0);
  const totalPossibleHours = mockEmployees.length * 40; // 40 hours per week per employee
  const utilizationRate = (totalHoursAllocated / totalPossibleHours) * 100;
  const actualUtilizationRate = (totalActualHours / totalPossibleHours) * 100;

  // Calculate number of active projects
  const activeProjects = new Set(currentWeek.data.flatMap(emp => 
    emp.allocations.map(alloc => alloc.project_id)
  )).size;

  // Calculate allocation status distribution
  const allocationStatus = {
    fullyAllocated: currentWeek.data.filter(emp => emp.percent_occupied === 100).length,
    overAllocated: currentWeek.data.filter(emp => emp.percent_occupied > 100).length,
    underAllocated: currentWeek.data.filter(emp => emp.percent_occupied < 100 && emp.percent_occupied > 0).length,
    notAllocated: currentWeek.data.filter(emp => emp.percent_occupied === 0).length
  };

  // Prepare data for employee allocation chart
  const employeeAllocationData = currentWeek.data.map(emp => ({
    name: emp.employee_name,
    planned: emp.total_allocated_hours,
    actual: emp.total_actual_hours,
    plannedPercentage: emp.percent_occupied,
    actualPercentage: emp.total_allocated_hours > 0 
      ? Math.round((emp.total_actual_hours / emp.total_allocated_hours) * 100)
      : 0
  }));

  // Prepare data for allocation status pie chart
  const allocationStatusData = [
    { name: 'Fully Allocated', value: allocationStatus.fullyAllocated, color: '#22c55e' },
    { name: 'Over Allocated', value: allocationStatus.overAllocated, color: '#ef4444' },
    { name: 'Under Allocated', value: allocationStatus.underAllocated, color: '#eab308' },
    { name: 'Not Allocated', value: allocationStatus.notAllocated, color: '#94a3b8' }
  ];

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
      title: "Planned Utilization", 
      value: Math.round(utilizationRate), 
      total: "100%", 
      percentChange: 0,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    },
    { 
      title: "Actual Utilization", 
      value: Math.round(actualUtilizationRate), 
      total: "100%", 
      percentChange: 0,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    },
    { 
      title: "Allocation Status", 
      value: allocationStatus.fullyAllocated, 
      total: mockEmployees.length, 
      percentChange: 0,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5 22v-4a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v4"/></svg>
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={refreshData}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
            <path d="M16 21h5v-5"/>
          </svg>
          Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Allocation Chart */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Employee Allocation Overview</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={employeeAllocationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="planned" name="Planned Hours" fill="#8b5cf6" />
                  <Bar dataKey="actual" name="Actual Hours" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Allocation Status Pie Chart */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Allocation Status Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {allocationStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Allocation Status */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Resource Allocation Details</h3>
          <div className="space-y-4">
            {currentWeek.data.map((employee) => (
              <div key={employee.employee_id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">{employee.employee_name}</p>
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Planned: </span>
                      <span className="font-medium text-purple-600">{employee.total_allocated_hours}h</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Actual: </span>
                      <span className="font-medium text-green-600">{employee.total_actual_hours}h</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Allocation: </span>
                      <span className={`font-medium ${
                        employee.percent_occupied > 100 ? 'text-red-600' :
                        employee.percent_occupied === 100 ? 'text-green-600' :
                        'text-yellow-600'
                      }`}>
                        {employee.percent_occupied}%
                      </span>
                    </div>
                  </div>
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
  );
}
