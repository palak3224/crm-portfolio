import { Outlet } from "react-router-dom";
import ScrollToTop from "../component/ScrollToTop";
import AuthGuard from "./AuthGuard";

const DashboardApp = () => {
  return (
    <AuthGuard>
      <div>
        <ScrollToTop />
        <Outlet />
      </div>
    </AuthGuard>
  );
};

export default DashboardApp;
