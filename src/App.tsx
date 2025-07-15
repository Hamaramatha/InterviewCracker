import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { ResumeUpload } from "./pages/ResumeUpload";
import { Assessment } from "./pages/Assessment";
import { Assessments } from "./pages/Assessments";
import { NotFound } from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/assessments" element={
            <ProtectedRoute>
              <Assessments />
            </ProtectedRoute>
          } />
          <Route path="/resume-upload" element={
            <ProtectedRoute>
              <ResumeUpload />
            </ProtectedRoute>
          } />
          <Route path="/assessment/:category" element={
            <ProtectedRoute>
              <Assessment />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;