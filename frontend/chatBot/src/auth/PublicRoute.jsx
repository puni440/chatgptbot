import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./AuthContext";


const PublicRoute = () => {
    const { isAuthenticated, loading } = useContext(Context);

    if (loading) return null ;

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
