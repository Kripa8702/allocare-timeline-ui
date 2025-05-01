import React from "react";
import { Project } from "../utils/mockData";
import { Badge } from "@/components/ui/badge";
import { theme } from "../utils/theme";

interface ProjectBlockProps {
  project: Project;
  totalWeeks: number;
  weekIndex: number;
}

const ProjectBlock = ({ project, totalWeeks, weekIndex }: ProjectBlockProps) => {
  const HOURS_PER_WEEK = 40;
  const HOURS_PER_DAY = 8;
  
  // Calculate end week and remaining hours
  const totalWeeksNeeded = project.hours / HOURS_PER_WEEK;
  const endWeek = project.startWeek + Math.ceil(totalWeeksNeeded) - 1;
  const isLastWeek = weekIndex === endWeek;
  const isPartialWeek = totalWeeksNeeded % 1 !== 0;
  
  // Calculate hours for the last week if it's partial
  const lastWeekHours = isPartialWeek ? project.hours % HOURS_PER_WEEK : HOURS_PER_WEEK;
  const lastWeekPercentage = (lastWeekHours / HOURS_PER_WEEK) * 100;
  
  // Calculate width for partial week
  const width = isLastWeek && isPartialWeek ? `${lastWeekPercentage}%` : '100%';

  // Determine corner rounding
  const getCornerClasses = () => {
    if (totalWeeksNeeded <= 1) {
      return 'rounded-md'; // Single week: rounded on all corners
    } else if (weekIndex === project.startWeek) {
      return 'rounded-l-md'; // Start week: rounded on left, sharp on right
    } else if (weekIndex === endWeek) {
      return 'rounded-r-md'; // End week: sharp on left, rounded on right
    }
    return ''; // Middle weeks: no rounding
  };

  return (
    <div 
      className={`${getProjectColor(project)} ${getCornerClasses()} p-2 h-[80px] flex flex-col justify-between`}
      style={{ width }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium">{project.name}</h3>
          <p className="text-xs text-gray-600 mt-1">
            {project.hours}h total
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          {isLastWeek && isPartialWeek ? `${lastWeekHours}h` : `${HOURS_PER_WEEK}h`}
        </Badge>
      </div>
      <div className="mt-2">
        <div className="text-xs text-gray-600">
          {isLastWeek && isPartialWeek ? `${lastWeekPercentage.toFixed(0)}%` : '100%'} of week
        </div>
      </div>
    </div>
  );
};

// Get project color based on project color in class 
function getProjectColor(project: Project): string {
  const style = project.color.split("-");
  const color = style[1]; // Extract the color name (e.g., "blue", "green", etc.)
  const shade = style[2]; // Extract the shade (e.g., "800", "600", etc.)

  // Light backgreound color with dark text color and shadow
  const colorClass = `bg-${color}-100 border border-${color}-${shade} text-${color}-800`;

  return colorClass || "bg-gray-100 border border-gray-300 text-gray-800"; // Default color if not found
}

export default ProjectBlock; 