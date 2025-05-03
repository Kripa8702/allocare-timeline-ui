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

  // Constants for hour widths
  const HOUR_WIDTH =8; // Each hour is 5px wide
  const CELL_PADDING = 10; // 8px padding on each side
  const DAY_WIDTH = 64; // 8 hours * 8px = 64px per day

  // calcular position based on day widths

  // Calculate position and width
  const daysFromWeekStart = differenceInDays(startDate, weekStart);
  
  // Calculate position in pixels (based on days)
  const leftPosition = daysFromWeekStart *(DAY_WIDTH + CELL_PADDING);
  
  // Calculate width in pixels (based on hours)
  const width = allocation.hours_allocated * HOUR_WIDTH;

  return (
    <div 
      className="relative mb-2 group"
      style={{
        marginLeft: `${leftPosition}px`,
        width: `${width}px`
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
          backgroundColor: `${allocation.color_code}`, // 20 is hex for 12.5% opacity
          borderLeft: `4px solid ${allocation.color_code}`,
          border: `1px solid #e0e0e0`
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