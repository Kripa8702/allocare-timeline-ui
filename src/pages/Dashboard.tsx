
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from "@/components/ui/progress";

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
  // Mock data for the dashboard
  const stats = [
    { title: "Projects", value: 0, total: 1, percentChange: 0, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
    { title: "Tasks", value: 1, total: 11, percentChange: 0, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg> },
    { title: "Resources", value: 1, total: 4, percentChange: 100, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5 22v-4a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v4"/></svg> },
    { title: "Time Spent", value: 32, total: "142 hours", percentChange: 100, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  ];

  // Mock data for projects
  const projects = [
    { name: "Demo Website Design", manager: "N/A", dueDate: "May 10, 2025", status: "On Track", progress: 10 },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm">Switch To</span>
          <button className="text-orange-500 font-medium">Classic Dashboard</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            total={stat.total}
            percentChange={stat.percentChange}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Project Summary and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Project</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Project Manager</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Project Manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Project Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Project Status</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project Name
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project Manager
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((project, index) => (
                      <tr key={index}>
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {project.name}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.manager}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.dueDate}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-blue-400 mr-2"></span>
                            <span>{project.status}</span>
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Progress value={project.progress} className="w-24 h-2" />
                            <span className="ml-2 text-xs">{project.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative inline-flex items-center justify-center my-6">
                <svg className="w-40 h-40">
                  <circle 
                    className="text-gray-200" 
                    strokeWidth="10" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="70" 
                    cx="80" 
                    cy="80" 
                  />
                  <circle 
                    className="text-blue-500" 
                    strokeWidth="10" 
                    strokeDasharray="440" 
                    strokeDashoffset={440} 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="70" 
                    cx="80" 
                    cy="80" 
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-bold">0%</span>
                  <span className="text-gray-500 text-sm">Completed</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 w-full mt-4 text-center">
                <div>
                  <div className="text-xl font-bold text-blue-500">1</div>
                  <div className="text-xs text-gray-500">Total Projects</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-500">0</div>
                  <div className="text-xs text-gray-500">Completed</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-500">1</div>
                  <div className="text-xs text-gray-500">On Track</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold text-orange-500">0</div>
                  <div className="text-xs text-gray-500">At Risk</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
