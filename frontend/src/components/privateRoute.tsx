import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({children}: PrivateRouteProps) {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default PrivateRoute;