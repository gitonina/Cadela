import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import loginService from "../services/login";
import rolesService from "../services/roles";
import { useAuthStore } from "../stores/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[]; // ejemplo: ["admin"]
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user, role } = useAuthStore();

  if (!user) return <Navigate to="/" replace />;
  if (!role) return <Navigate to="/" replace />;
  if (roles && !roles.includes(role.name!)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
