
import { isThisWeek } from "date-fns";
import { Employee, WeekAllocation } from "../utils/mockData";

interface AllocationTableProps {
  employees: Employee[];
  weeks: Date[][];
}

const AllocationTable = ({ employees, weeks }: AllocationTableProps) => {
  return (
    <div className="flex flex-col">
      {employees.map((employee) => (
        <div key={employee.id} className="flex mb-4">
          {/* Employee name */}
          <div className="min-w-[200px] bg-white p-4 border-l border-t border-b border-gray-200 flex items-center">
            <div>
              <h3 className="font-medium text-gray-900">{employee.name}</h3>
              <p className="text-sm text-gray-500">{employee.role}</p>
            </div>
          </div>

          {/* Allocation cells */}
          <div className="flex flex-grow relative">
            {weeks.map((week, weekIndex) => {
              const isCurrentWeek = isThisWeek(week[0]);
              const allocation = employee.allocations.find(
                (a) => a.weekIndex === weekIndex
              );

              return (
                <div
                  key={weekIndex}
                  className={`flex-1 border-t border-b border-r border-gray-200 p-2 ${
                    isCurrentWeek ? "bg-blue-50" : "bg-white"
                  }`}
                >
                  {allocation && (
                    <div className="mb-2">
                      <div className={`text-sm font-medium ${allocation.percentage >= 100 ? "text-red-600" : "text-gray-900"}`}>
                        {allocation.percentage}% [{allocation.hours}h]
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Project boxes */}
            {employee.projects.map((project) => (
              <div
                key={project.id}
                className="absolute"
                style={{
                  left: `${(project.startWeek / weeks.length) * 100}%`,
                  width: `${((project.endWeek - project.startWeek + 1) / weeks.length) * 100}%`,
                  top: `${42 + project.rowIndex * 32}px`,
                  height: "28px",
                }}
              >
                <div
                  className={`h-full rounded-md px-2 py-1 text-xs font-medium border border-opacity-20 ${getProjectColor(project.name)}`}
                  title={`${project.name}: ${project.percentage}%`}
                >
                  {project.name}: {project.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper function to get color based on project name
function getProjectColor(projectName: string): string {
  const colors = {
    "TD": "bg-blue-100 border-blue-300 text-blue-800",
    "HMS": "bg-green-100 border-green-300 text-green-800",
    "GSA": "bg-yellow-100 border-yellow-300 text-yellow-800",
    "VCT": "bg-purple-100 border-purple-300 text-purple-800",
    "BRT": "bg-pink-100 border-pink-300 text-pink-800",
    "LMS": "bg-orange-100 border-orange-300 text-orange-800",
  };
  
  return colors[projectName as keyof typeof colors] || "bg-gray-100 border-gray-300 text-gray-800";
}

export default AllocationTable;
