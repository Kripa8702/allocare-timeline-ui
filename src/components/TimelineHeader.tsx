import React from "react";
import { format, startOfWeek, addDays } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@/components/ui/table";
import { CalendarView } from "./TopBar";
interface TimelineHeaderProps {
  weeks: Date[][];
  view: CalendarView;
}

const TimelineHeader = ({ weeks, view }: TimelineHeaderProps) => {
  const getWeekStartDate = (date: Date) => {
    // Get Monday of the week (1 is Monday in date-fns)
    return startOfWeek(date, { weekStartsOn: 1 });
  };

  return (
    <TableRow className="border border-gray-200">
      <TableCell className="sticky left-0 z-10 bg-white p-4 border border-gray-200" />
      {weeks.map((period, index) => {
        if (view === "week") {
          // For week view, show the Monday date
          const weekStartDate = getWeekStartDate(period[0]);
          return (
            <TableCell
              key={index}
              className="p-4 text-center font-medium border border-gray-200"
            >
              {format(weekStartDate, "d MMM")}
            </TableCell>
          );
        } else if (view === "day") {
          // For day view, show each day
          return (
            <TableCell
              key={index}
              className="p-4 text-center font-medium border border-gray-200"
            >
              {format(period[0], "d MMM")}
            </TableCell>
          );
        } else {
          // For month view, show month range
          return (
            <TableCell
              key={index}
              className="p-4 text-center font-medium border border-gray-200"
            >
              {format(period[0], "MMM yyyy")}
            </TableCell>
          );
        }
      })}
    </TableRow>
  );
};

export default TimelineHeader;
