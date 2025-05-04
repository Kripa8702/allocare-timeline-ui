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
    if (percent > 100) return 'text-red-600';
    if (percent >= 95) return 'text-green-600';
    if (percent < 95) return 'text-yellow-600';
  };

  const getActualStatusColor = (planned: number, actual: number) => {
    const difference = planned - actual;
    if (difference <= 5 && difference >= -5) return 'text-green-600';
    if (difference > 5) return 'text-blue-600';
    if (difference < -5) return 'text-red-600';
    return 'text-gray-600';
  };

  const getLineColor = (percent: number) => {
    if (percent > 100) return 'bg-red-500';
    if (percent >= 95) return 'bg-green-500';
    if (percent < 95) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getActualLineColor = (planned: number, actual: number) => {
    const difference = planned - actual;
    if (difference <= 5 && difference >= -5) return 'bg-green-500';
    if (difference > 5) return 'bg-blue-500';
    if (difference < -5) return 'bg-red-500';
    return 'bg-gray-500';
  };

  return (
    <div className="space-y-0.5">
      {/* Planned allocation row */}
      <div className="flex items-center">
        <div className="flex items-center space-x-1 min-w-[50px]">
          <span className="text-gray-500 text-[12px]">P:</span>
          <span className={`text-[12px] font-bold ${getStatusColor(percentage)}`}>
            {percentage}%
          </span>
        </div>
        <div className="flex-1 relative h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`absolute h-full ${getLineColor(percentage)}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-gray-400 text-[12px] ml-2">({totalHours}h)</span>
      </div>

      {/* Actual allocation row */}
      {actualPercentage !== undefined && actualHours !== undefined && (
        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-1 min-w-[50px]">
            <span className="text-gray-500 text-[12px]">A:</span>
            <span className={`text-[12px] font-bold ${getActualStatusColor(percentage, actualPercentage)}`}>
              {actualPercentage}%
            </span>
          </div>
          <div className="flex-1 relative h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`absolute h-full ${getActualLineColor(percentage, actualPercentage)}`}
              style={{ width: `${actualPercentage}%` }}
            />
            {/* Over-allocation indicator */}
            {actualPercentage > percentage && (
              <div
                className="absolute h-full w-0.5 bg-white"
                style={{ left: `${percentage}%` }}
              />
            )}
          </div>
          <span className="text-gray-400 text-[12px] ml-2">({actualHours}h)</span>
        </div>
      )}
    </div>
  );
};

export default AllocationStatus; 