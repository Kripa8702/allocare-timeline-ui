import React from 'react';

interface AllocationStatusProps {
  percentage: number;
  totalHours: number;
  actualPercentage?: number;
  actualHours?: number;
}

const AllocationStatus: React.FC<AllocationStatusProps> = ({ 
  percentage, 
  totalHours,
  actualPercentage,
  actualHours 
}) => {
  const getStatusColor = (percent: number) => {
    if (percent >= 90) return 'bg-green-100 text-green-800';
    if (percent >= 70) return 'bg-blue-100 text-blue-800';
    if (percent >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getActualStatusColor = (planned: number, actual: number) => {
    const difference = actual - planned;
    if (Math.abs(difference) <= 5) return 'bg-green-100 text-green-800';
    if (difference > 5) return 'bg-blue-100 text-blue-800';
    if (difference < -5) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center space-x-2">
        <span className="text-gray-500">P:</span>
        <div className={`px-1.5 py-0.5 rounded font-medium ${getStatusColor(percentage)}`}>
          {percentage}%
        </div>
        <span className="text-gray-400">({totalHours}h)</span>
      </div>
      {actualPercentage !== undefined && actualHours !== undefined && (
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">A:</span>
          <div className={`px-1.5 py-0.5 rounded font-medium ${getActualStatusColor(percentage, actualPercentage)}`}>
            {actualPercentage}%
          </div>
          <span className="text-gray-400">({actualHours}h)</span>
        </div>
      )}
    </div>
  );
};

export default AllocationStatus; 