
import { format, addDays } from "date-fns";
import { TableRow } from "./ui/table";
import { TableCell } from "./ui/table";

interface TimelineHeaderProps {
  weeks: Date[][];
  viewType?: "day" | "week" | "month";
}

const TimelineHeader = ({ weeks, viewType = "week" }: TimelineHeaderProps) => {
  return (
    <TableRow className="border-b border-gray-200 bg-gray-50">
      <TableCell className="sticky left-0 z-10 bg-gray-50 p-4 border border-gray-200 w-[180px]">
        <h3 className="text-sm font-bold text-gray-700">Resources</h3>
      </TableCell>
      {weeks.map((week, index) => {
        // Format date display based on view type
        let dateLabel;
        let secondaryLabel;
        
        if (viewType === "day") {
          // For day view, show the specific day
          dateLabel = format(week[0], "d MMM");
          secondaryLabel = `Day ${index + 1}`;
        } else if (viewType === "month") {
          // For month view, show the month
          dateLabel = format(week[0], "MMM yyyy");
          secondaryLabel = `Month ${Math.floor(index / 4) + 1}`;
        } else {
          // Default week view
          dateLabel = format(week[0], "d MMM");
          secondaryLabel = `Week ${index + 1}`;
        }

        return (
          <TableCell
            key={index}
            className="text-center p-2 border border-gray-200 bg-gray-50"
          >
            <div className="text-sm font-bold text-gray-700">
              {dateLabel}
            </div>
            <div className="text-xs text-gray-500">
              {secondaryLabel}
            </div>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default TimelineHeader;
