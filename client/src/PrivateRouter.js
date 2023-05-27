import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";





const PrivateRouter = ({ isAuthenticated }) => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    if (userInfo) {
        isAuthenticated = true
    } else {
        isAuthenticated = false
    }



    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter