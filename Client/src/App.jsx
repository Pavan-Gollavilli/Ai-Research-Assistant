import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Loader from "./components/common/Loader";

// Error Pages
import NotFound from "./pages/error/NotFound";

// Lazy Loaded Pages
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const CreateResearch = lazy(() => import("./pages/research/CreateResearch"));
const ResearchDetails = lazy(() => import("./pages/research/ResearchDetails"));
const ResearchHistory = lazy(() => import("./pages/research/ResearchHistory"));
const Profile = lazy(() => import("./pages/profile/Profile"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: 'text-sm font-medium',
            duration: 4000,
            style: {
              background: '#fff',
              color: '#334155',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
              borderRadius: '1rem',
            },
          }}
        />

        <Suspense fallback={<Loader fullScreen text="Loading application..." />}>
          <Routes>
            {/* Redirect Root */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/research/create" element={<CreateResearch />} />
              <Route path="/research/history" element={<ResearchHistory />} />
              <Route path="/research/:id" element={<ResearchDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;