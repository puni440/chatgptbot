import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./AuthContext";
import { Loader } from "lucide-react";

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useContext(Context);
    console.log(loading);

    if (loading) return null;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;

