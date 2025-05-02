
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-800 mb-1">Resource Dashboard</h1>
        <p className="text-xs text-gray-500">Overview of team allocation and utilization</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="pb-2 px-5 pt-5">
            <CardTitle className="text-sm font-medium">Allocation Status</CardTitle>
            <CardDescription className="text-xs">Current resource allocation</CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-xl font-semibold text-green-500">{fullyAllocated}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Optimal</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold text-red-500">{overAllocated}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Over</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold text-yellow-500">{underAllocated}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Under</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="pb-2 px-5 pt-5">
            <CardTitle className="text-sm font-medium">Team Utilization</CardTitle>
            <CardDescription className="text-xs">Overall resource utilization</CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-2xl font-semibold text-purple-600">
                  {Math.round((fullyAllocated / totalEmployees) * 100)}%
                </p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Optimal Allocation</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="pb-2 px-5 pt-5">
            <CardTitle className="text-sm font-medium">Team Overview</CardTitle>
            <CardDescription className="text-xs">Resource allocation breakdown</CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-xl font-semibold text-purple-600">{totalEmployees}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Total Resources</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold text-blue-500">
                  {employees.reduce((acc, emp) => acc + emp.projects.length, 0)}
                </p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="pb-2 px-5 pt-5">
            <CardTitle className="text-sm font-medium">Weekly Allocation Trend</CardTitle>
            <CardDescription className="text-xs">Resource allocation over next 4 weeks</CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekData} margin={{ top: 15, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="week" 
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#e0e0e0' }}
                  />
                  <YAxis 
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#e0e0e0' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #f0f0f0',
                      borderRadius: '4px',
                      fontSize: '12px',
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      fontSize: '11px',
                    }}
                  />
                  <Bar dataKey="Optimal" stackId="a" fill="#10B981" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="Over" stackId="a" fill="#EF4444" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="Under" stackId="a" fill="#F59E0B" radius={[2, 2, 0, 0]} />
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
