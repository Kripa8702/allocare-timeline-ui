import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import ResourceManagement from "./pages/ResourceManagement";
import Allocation from "./pages/Allocation";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { AllocationProvider } from '@/contexts/AllocationContext';
import Layout from '@/components/Layout';

const queryClient = new QueryClient();

// Simple auth check - replace with your actual auth logic
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AllocationProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                localStorage.getItem('isAuthenticated') === 'true' ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/allocation" element={<Allocation />} />
              <Route path="/resource-management" element={<ResourceManagement />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AllocationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
