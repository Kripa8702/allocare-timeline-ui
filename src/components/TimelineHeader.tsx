
import { format, isThisWeek } from "date-fns";
import { Separator } from "@/components/ui/separator";

interface TimelineHeaderProps {
  weeks: Date[][];
}

const TimelineHeader = ({ weeks }: TimelineHeaderProps) => {
  return (
    <div className="mb-2">
      {/* Week columns */}
      <div className="flex">
        {/* Empty cell for employee names */}
        <div className="min-w-[200px] bg-white border-l border-t border-b border-gray-200 p-2">
          <h3 className="text-sm font-medium text-gray-700">Team Members</h3>
        </div>
        
        {/* Week headers */}
        <div className="flex flex-grow">
          {weeks.map((week, index) => {
            const isCurrentWeek = isThisWeek(week[0]);
            return (
              <div 
                key={index} 
                className={`flex-1 text-center p-2 border-t border-b border-r border-gray-200 ${
                  isCurrentWeek ? "bg-blue-50" : "bg-white"
                }`}
              >
                <div className="text-xs font-medium text-gray-700">
                  Week {index + 1}
                </div>
                <div className="text-xs text-gray-500">
                  {format(week[0], "d MMM")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineHeader;
