
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Garden from "./pages/Garden";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import Community from "./pages/Community";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } 
          />
          <Route 
            path="/goals" 
            element={
              <AppLayout>
                <Goals />
              </AppLayout>
            } 
          />
          <Route 
            path="/garden" 
            element={
              <AppLayout>
                <Garden />
              </AppLayout>
            } 
          />
          <Route 
            path="/rewards" 
            element={
              <AppLayout>
                <Rewards />
              </AppLayout>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <AppLayout>
                <Profile />
              </AppLayout>
            } 
          />
          <Route 
            path="/help" 
            element={
              <AppLayout>
                <Help />
              </AppLayout>
            } 
          />
          <Route 
            path="/community" 
            element={
              <AppLayout>
                <Community />
              </AppLayout>
            } 
          />
          <Route 
            path="/calendar" 
            element={
              <AppLayout>
                <Calendar />
              </AppLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
