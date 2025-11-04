import React from "react";
import { useAuth } from "../context/authContext";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../Components/DashBoard.jsx/Sidebar.jsx/as/AdminSidebar";
import Navbar from "../Components/DashBoard.jsx/Sidebar.jsx/as/Navbar";
// import AdminSummery from "../Components/DashBoard.jsx/Sidebar.jsx/as/AdminSummery";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated (optional)
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
     <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
