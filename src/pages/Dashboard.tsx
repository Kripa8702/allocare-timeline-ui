
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { generateMockEmployees } from "@/utils/mockData";

const Dashboard = () => {
  const employees = generateMockEmployees();
  
  // Calculate allocation metrics
  const totalEmployees = employees.length;
  const fullyAllocated = employees.filter(emp => 
    emp.allocations.some(a => a.percentage === 100)
  ).length;
  
  const overAllocated = employees.filter(emp => 
    emp.allocations.some(a => a.percentage > 100)
  ).length;
  
  const underAllocated = employees.filter(emp => 
    emp.allocations.some(a => a.percentage < 100 && a.percentage > 0)
  ).length;

  // Prepare chart data
  const weekData = Array.from({ length: 4 }, (_, i) => {
    const weekEmployees = employees.filter(emp => 
      emp.allocations.some(a => a.weekIndex === i)
    );
    
    const weekFullyAllocated = weekEmployees.filter(emp => 
      emp.allocations.find(a => a.weekIndex === i)?.percentage === 100
    ).length;
    
    const weekOverAllocated = weekEmployees.filter(emp => 
      emp.allocations.find(a => a.weekIndex === i)?.percentage > 100
    ).length;
    
    const weekUnderAllocated = weekEmployees.filter(emp => 
      emp.allocations.find(a => a.weekIndex === i)?.percentage < 100 && 
      emp.allocations.find(a => a.weekIndex === i)?.percentage > 0
    ).length;

    return {
      week: `Week ${i + 1}`,
      Optimal: weekFullyAllocated,
      Over: weekOverAllocated,
      Under: weekUnderAllocated
    };
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Resource Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of team allocation and utilization</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Allocation Status</CardTitle>
            <CardDescription>Current resource allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">{fullyAllocated}</p>
                <p className="text-xs text-gray-500">Optimal</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-500">{overAllocated}</p>
                <p className="text-xs text-gray-500">Over</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-500">{underAllocated}</p>
                <p className="text-xs text-gray-500">Under</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Team Utilization</CardTitle>
            <CardDescription>Overall resource utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {Math.round((fullyAllocated / totalEmployees) * 100)}%
                </p>
                <p className="text-xs text-gray-500">Optimal Allocation</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Team Overview</CardTitle>
            <CardDescription>Resource allocation breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{totalEmployees}</p>
                <p className="text-xs text-gray-500">Total Resources</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">
                  {employees.reduce((acc, emp) => acc + emp.projects.length, 0)}
                </p>
                <p className="text-xs text-gray-500">Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Weekly Allocation Trend</CardTitle>
            <CardDescription>Resource allocation over next 4 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Optimal" stackId="a" fill="#10B981" />
                  <Bar dataKey="Over" stackId="a" fill="#EF4444" />
                  <Bar dataKey="Under" stackId="a" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
