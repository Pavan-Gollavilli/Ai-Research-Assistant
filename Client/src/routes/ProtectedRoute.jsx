import {
  Navigate,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
  children,
}) => {
  const {
    currentUser,
    loading,
  } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <p className="mt-5 text-slate-500">
            Loading...
          </p>

        </div>

      </div>
    );
  }

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;