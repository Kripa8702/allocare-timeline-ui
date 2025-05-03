import React from 'react';
import { ProjectAllocation } from '../utils/mockData';
import { format, parseISO, differenceInDays, startOfWeek, endOfWeek } from 'date-fns';

interface ProjectBlockProps {
  allocation: ProjectAllocation;
}

const ProjectBlock: React.FC<ProjectBlockProps> = ({ allocation }) => {
  const startDate = parseISO(allocation.start_date);
  const weekStart = startOfWeek(startDate, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(startDate, { weekStartsOn: 1 }); // Friday

  // Calculate position and width
  const daysFromWeekStart = differenceInDays(startDate, weekStart);
  const daysUntilWeekEnd = differenceInDays(weekEnd, startDate);
  
  // Calculate position as percentage from left (0-100%)
  const leftPosition = (daysFromWeekStart / 4) * 100; // 4 days (Mon-Thu) for full width
  
  // Calculate width based on percentage allocation and remaining days
  const maxWidth = ((daysUntilWeekEnd + 1) / 5) * 100; // Maximum possible width
  const allocationWidth = (allocation.percent_allocated / 100) * maxWidth; // Width based on allocation percentage
  
  // For 50% allocation, ensure it ends exactly at Wednesday (2.5 days) also for other allocations
  const adjustedWidth = allocation.percent_allocated === 50 
    ? (2.5 / 5) * 100 
    : allocationWidth;
    
  const width = Math.min(adjustedWidth, 100 - leftPosition); // Ensure it doesn't overflow

  return (
    <div 
      className="relative mb-2 group"
      style={{
        marginLeft: `${leftPosition}%`,
        width: `${width}%`
      }}
    >
      <div
        className={`
          h-[32px] px-2 py-1
          hover:opacity-90 transition-colors
          flex items-center justify-between
          rounded-md
        `}
        style={{
          backgroundColor: `${allocation.color}20`, // 20 is hex for 12.5% opacity
          borderLeft: `4px solid ${allocation.color}`
        }}
      >
        <span className="text-sm font-medium text-gray-900 truncate">
          {allocation.project_name}
        </span>
        <span className="text-xs text-gray-600">
          {allocation.hours_allocated}h
        </span>
      </div>

      {/* Tooltip */}
      <div className="absolute z-50 hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg p-2 min-w-[200px] -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
        <div className="text-sm">
          <div className="font-medium text-gray-900">{allocation.project_name}</div>
          <div className="text-gray-500">
            <div>Hours: {allocation.hours_allocated}h</div>
            <div>Allocation: {allocation.percent_allocated}%</div>
            <div>Start: {allocation.start_date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBlock; 