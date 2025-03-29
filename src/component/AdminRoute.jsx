import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const user = JSON.parse(localStorage.getItem("userData"));

    if (!user || user.role !== "ADMIN") {
        return <Navigate to="/unauthorized" />; 
    }

    return <Outlet />;
};

export default AdminRoute;
