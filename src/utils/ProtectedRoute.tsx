import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RiLoader2Line } from "react-icons/ri";

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-slate-900 text-aliceblue text-2xl font-bold font-sans">
        Loading...
        <RiLoader2Line className="animate-spin mr-2" size={30} />
      </div>
    );
  }

  // ✅ Allow access if authenticated
  if (isAuthenticated) {
    return <Outlet />;
  }

  // ❌ Redirect to login if not authenticated
  return <Navigate to="/auth/login" replace />;
}
