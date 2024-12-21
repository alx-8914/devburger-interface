import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ isAdminRoute }) {
  const userData = JSON.parse(localStorage.getItem("devburger:userData"));
  const isAuthenticated = Boolean(userData);
  const isAdmin = userData?.admin || false;

  console.log("Rota protegida verificada", { isAuthenticated, isAdmin });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (!isAdminRoute && isAdmin) {
    return <Navigate to="/admin/pedidos" replace />;
  }

  return <Outlet />;
}

