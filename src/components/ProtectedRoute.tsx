import { useAuth } from "../context/AuthContext";
import { FunctionComponent } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    roles?: string[];
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ roles }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/dashboard" />;
    }

    return <Outlet />;
};
export default ProtectedRoute;