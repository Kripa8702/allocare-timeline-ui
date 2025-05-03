import React from "react";
import { Employee } from "../utils/mockData";

interface EmployeeInfoProps {
  employee: Employee;
}

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({ employee }) => {
  return (
    <div className="flex flex-col">
      <span className="font-medium">{employee.name}</span>
      <span className="text-sm text-gray-500">{employee.role}</span>
    </div>
  );
};

export default EmployeeInfo; 