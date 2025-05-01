import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthWrapper = (props: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");
    const publicRoutes = ["/login", "/signup"];

    if (!token && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  return <div>{props?.children}</div>;
};

export default AuthWrapper;
