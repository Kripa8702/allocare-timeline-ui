import React, { createContext, useContext, useEffect, useState } from 'react';
import { AllocationData, fetchAllocations } from '@/services/allocationService';

interface AllocationContextType {
  allocationData: AllocationData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const AllocationContext = createContext<AllocationContextType | undefined>(undefined);

export const AllocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allocationData, setAllocationData] = useState<AllocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchAllocations();
      setAllocationData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const value = {
    allocationData,
    isLoading,
    error,
    refreshData: fetchData
  };

  return (
    <AllocationContext.Provider value={value}>
      {children}
    </AllocationContext.Provider>
  );
};

export const useAllocation = () => {
  const context = useContext(AllocationContext);
  if (context === undefined) {
    throw new Error('useAllocation must be used within an AllocationProvider');
  }
  return context;
}; 