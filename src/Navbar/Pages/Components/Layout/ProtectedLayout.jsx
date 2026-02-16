import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedLayout() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}