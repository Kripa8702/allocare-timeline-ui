
import { format, isThisWeek } from "date-fns";

interface TimelineHeaderProps {
  weeks: Date[][];
}

const TimelineHeader = ({ weeks }: TimelineHeaderProps) => {
  return (
    <div className="mb-2">
      {/* Duration header */}
      <div className="flex items-center justify-between mb-2 px-[200px] py-2 bg-white rounded-t-lg border border-gray-200">
        <h2 className="text-sm font-medium text-gray-500">
          {format(weeks[0][0], "d MMM yyyy")} - {format(weeks[weeks.length - 1][6], "d MMM yyyy")}
        </h2>
        <span className="text-sm font-medium text-gray-500">{weeks.length} weeks</span>
      </div>

      {/* Week columns */}
      <div className="flex">
        {/* Empty cell for employee names */}
        <div className="min-w-[200px] bg-white border-l border-t border-b border-gray-200"></div>
        
        {/* Week headers */}
        <div className="flex flex-grow">
          {weeks.map((week, index) => {
            const isCurrentWeek = isThisWeek(week[0]);
            return (
              <div 
                key={index} 
                className={`flex-1 text-center py-2 border-t border-b border-r border-gray-200 ${
                  isCurrentWeek ? "bg-blue-50" : "bg-white"
                }`}
              >
                <div className="text-sm font-medium">
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
