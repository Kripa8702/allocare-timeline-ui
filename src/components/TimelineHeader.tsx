
import { format } from "date-fns";
import { TableRow } from "./ui/table";
import { TableCell } from "./ui/table";

interface TimelineHeaderProps {
  weeks: Date[][];
}

const TimelineHeader = ({ weeks }: TimelineHeaderProps) => {
  return (
    <TableRow className="border-b border-gray-200 bg-gray-50">
      <TableCell className="sticky left-0 z-10 bg-gray-50 p-4 border border-gray-200 w-[180px]">
        <h3 className="text-sm font-bold text-gray-700">Resources</h3>
      </TableCell>
      {weeks.map((week, index) => (
        <TableCell
          key={index}
          className="text-center p-2 border border-gray-200 bg-gray-50"
        >
          <div className="text-sm font-bold text-gray-700">
            {format(week[0], "d MMM")}
          </div>
          <div className="text-xs text-gray-500">
            Week {index + 1}
          </div>
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TimelineHeader;
