import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import loginService from "../services/login";
import rolesService from "../services/roles";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[]; // ejemplo: ["admin"]
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [roleName, setRoleName] = useState<string | null>(null);

  useEffect(() => {
    const check = async () => {
      const u = await loginService.restoreLogin();
      setUser(u);

      if (u?.rolId) {
        const role = await rolesService.getRoleById(u.rolId);
        setRoleName(role.name);
      }

      setLoading(false);
    };

    check();
  }, []);
   console.log(roleName)
  
  if (loading) return null;

  if (!user) return <Navigate to="/" replace />;
  if (roles && !roles.includes(roleName!)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
