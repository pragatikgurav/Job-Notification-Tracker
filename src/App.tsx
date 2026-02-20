import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/jt/Welcome";
import Preferences from "./pages/jt/Preferences";
import Matching from "./pages/jt/Matching";
import SavedJobs from "./pages/jt/SavedJobs";
import StatusTracking from "./pages/jt/StatusTracking";
import Digest from "./pages/jt/Digest";
import TestChecklist from "./pages/jt/TestChecklist";
import Ship from "./pages/jt/Ship";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/jt/01-welcome" replace />} />
          <Route path="/jt/01-welcome" element={<Welcome />} />
          <Route path="/jt/02-preferences" element={<Preferences />} />
          <Route path="/jt/03-matching" element={<Matching />} />
          <Route path="/jt/04-saved" element={<SavedJobs />} />
          <Route path="/jt/05-status" element={<StatusTracking />} />
          <Route path="/jt/06-digest" element={<Digest />} />
          <Route path="/jt/07-test" element={<TestChecklist />} />
          <Route path="/jt/08-ship" element={<Ship />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
