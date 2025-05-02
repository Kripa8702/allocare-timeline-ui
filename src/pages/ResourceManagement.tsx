
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, addDays } from 'date-fns';

const AVAILABILITY_STATES = {
  AVAILABLE: 'available',
  BOOKED: 'booked',
  OVERLOADED: 'overloaded',
  VACATION: 'vacation'
};

// Mock data for resource availability
const resources = [
  { id: 1, name: 'prashantkhunt1999', availability: Array(30).fill(AVAILABILITY_STATES.AVAILABLE) },
  { id: 2, name: 'William', availability: Array(30).fill(AVAILABILITY_STATES.AVAILABLE) },
  { id: 3, name: 'Alex', 
    availability: [
      AVAILABILITY_STATES.OVERLOADED, 
      AVAILABILITY_STATES.OVERLOADED, 
      ...Array(28).fill(AVAILABILITY_STATES.AVAILABLE)
    ] 
  },
  { id: 4, name: 'John', 
    availability: [
      AVAILABILITY_STATES.BOOKED, 
      AVAILABILITY_STATES.AVAILABLE, 
      AVAILABILITY_STATES.BOOKED,
      AVAILABILITY_STATES.BOOKED,
      AVAILABILITY_STATES.BOOKED,
      AVAILABILITY_STATES.AVAILABLE,
      AVAILABILITY_STATES.BOOKED,
      AVAILABILITY_STATES.BOOKED,
      ...Array(22).fill(AVAILABILITY_STATES.AVAILABLE)
    ] 
  }
];

const ResourceCell = ({ status }: { status: string }) => {
  const getBackgroundColor = () => {
    switch (status) {
      case AVAILABILITY_STATES.AVAILABLE:
        return 'bg-green-500';
      case AVAILABILITY_STATES.BOOKED:
        return 'bg-red-500';
      case AVAILABILITY_STATES.OVERLOADED:
        return 'bg-purple-500';
      case AVAILABILITY_STATES.VACATION:
        return 'bg-blue-500';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className={`w-full h-12 ${getBackgroundColor()}`}></div>
  );
};

export default function ResourceManagement() {
  const [activeTab, setActiveTab] = useState('resource-availability');
  const today = new Date();
  const endDate = addDays(today, 29); // Show 30 days

  // Generate date headers
  const dateHeaders = [];
  for (let i = 0; i < 30; i++) {
    const date = addDays(today, i);
    dateHeaders.push(date);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resource Management</h1>
      </div>

      <Card className="mb-6">
        <Tabs defaultValue="resource-availability" className="w-full">
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <TabsList>
              <TabsTrigger value="resource-utilization">Resource Utilization</TabsTrigger>
              <TabsTrigger value="resource-availability">Resource Availability</TabsTrigger>
              <TabsTrigger value="resource-allocation">Resource Allocation</TabsTrigger>
              <TabsTrigger value="team-utilization">Team Utilization</TabsTrigger>
            </TabsList>
            
            <button className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
            </button>
          </div>
        </Tabs>

        <CardContent className="p-0">
          <div className="p-4 pb-0 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Resource Availability</h2>
            <div className="flex items-center gap-3">
              <button className="p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <span className="text-sm">
                {format(today, 'MMM dd, yyyy')} to {format(endDate, 'MMM dd, yyyy')}
              </span>
              <button className="p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center mb-2 text-xs">
              <div className="w-[200px]"></div>
              <div className="flex-1 grid grid-cols-30">
                {dateHeaders.map((date, index) => (
                  <div key={index} className="text-center">
                    <div className="font-bold">
                      {format(date, 'dd')}
                    </div>
                    <div className="text-gray-500">
                      {format(date, 'MMM')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200">
              {resources.map(resource => (
                <div key={resource.id} className="flex border-b border-gray-200">
                  <div className="w-[200px] p-3 flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span>{resource.name}</span>
                  </div>
                  <div className="flex-1 grid grid-cols-30 gap-px bg-gray-100">
                    {resource.availability.map((status, dayIndex) => (
                      <ResourceCell key={dayIndex} status={status} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500"></div>
                <span className="text-sm">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500"></div>
                <span className="text-sm">Overloaded</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500"></div>
                <span className="text-sm">Vacation</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
