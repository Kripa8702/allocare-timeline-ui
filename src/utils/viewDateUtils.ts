import { addDays, addMonths, startOfMonth, endOfMonth, isWeekend, startOfWeek } from "date-fns";
import { CalendarView } from "../components/TopBar";
import { log } from "console";

export const HOURS_PER_DAY = 8;
export const HOURS_PER_WEEK = 40; // 5 working days × 8 hours
export const HOURS_PER_MONTH = 160; // 4 weeks × 40 hours

export const getViewDates = (calendarView: CalendarView) => {
  const today = new Date();
  switch (calendarView) {
    case "day":
      // Show 5 weekdays starting from today
      const weekdays = [];
      let currentDate = today;
      while (weekdays.length < 5) {
        if (!isWeekend(currentDate)) {
          weekdays.push([currentDate]);
        }
        currentDate = addDays(currentDate, 1);
      }
      return weekdays;
    case "week":
      // Show 4 weeks starting from current week
      const currentWeek = startOfWeek(today, { weekStartsOn: 1 });
      return Array.from({ length: 4 }, (_, i) => {
        const startDate = addDays(currentWeek, i * 7);
        return Array.from({ length: 5 }, (_, j) => addDays(startDate, j));
      });
    case "month":
      // Show 4 months
      return Array.from({ length: 4 }, (_, i) => {
        const monthStart = startOfMonth(addMonths(today, i));
        const monthEnd = endOfMonth(monthStart);
        return [monthStart, monthEnd];
      });
    default:
      return [];
  }
};

export const getHoursForView = (view: CalendarView): number => {
  switch (view) {
    case "day":
      return HOURS_PER_DAY;
    case "week":
      return HOURS_PER_WEEK;
    case "month":
      return HOURS_PER_MONTH;
    default:
      return HOURS_PER_WEEK;
  }
}; 