// Allocation status enums
export enum AllocationStatus {
  OPTIMAL = "Optimal",
  UNDER_ALLOCATED = "Under Allocated",
  OVER_ALLOCATED = "Over Allocated"
}

// Helper function to get allocation status
export const getAllocationStatus = (percentage: number): AllocationStatus => {
  if (percentage === 100) return AllocationStatus.OPTIMAL;
  if (percentage > 100) return AllocationStatus.OVER_ALLOCATED;
  return AllocationStatus.UNDER_ALLOCATED;
};

// Helper function to get dot color based on allocation percentage
export const getAllocationDotClass = (percentage: number): string => {
  if (percentage === 100) return "bg-green-500";
  if (percentage > 100) return "bg-red-500";
  return "bg-yellow-500";
};

// Helper function to get progress bar color based on allocation percentage
export const getAllocationBarClass = (percentage: number): string => {
  if (percentage === 100) return "bg-green-500";
  if (percentage > 100) return "bg-red-500";
  return "bg-yellow-500";
};

// Helper function to get text color based on allocation percentage
export const getAllocationTextClass = (percentage: number): string => {
  if (percentage === 100) return "text-green-700";
  if (percentage > 100) return "text-red-700";
  return "text-yellow-700";
};

// Helper function to get badge color based on allocation percentage
export const getAllocationBadgeClass = (percentage: number): string => {
  if (percentage === 100) return "bg-green-100 text-green-700";
  if (percentage > 100) return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
}; 