import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

// Route Guards
import PrivateRoute from "./utils/PrivateRoute";
import RoleBasedRoute from "./utils/RoleBasedRoute";

// Admin Components
import AdminSummery from "./Components/DashBoard.jsx/Sidebar.jsx/as/AdminSummery";
import DepartmentList from "./Components/DashBoard.jsx/Sidebar.jsx/as/Departments/DepartmentList";
import AddDepartment from "./Components/DashBoard.jsx/Sidebar.jsx/as/Departments/AddDepartment";
import LeaveList from "./Components/DashBoard.jsx/Leaves/LeaveList";
import TaskList from "./Components/Task/TaskList";

const App = () => {
  return (
    <Routes>
      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/admin-dashboard" />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* ------------------ ADMIN ROUTES ------------------ */}
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute>
            <RoleBasedRoute requiredRole="admin">
              <AdminDashboard />
            </RoleBasedRoute>
          </PrivateRoute>
        }
      >
        {/* Default route inside AdminDashboard */}
        <Route index element={<AdminSummery />} />

        {/* Department Management */}
        <Route path="departments" element={<DepartmentList />} />
        <Route path="add-new-departments" element={<AddDepartment />} />

        {/* Leaves and Tasks */}
        <Route path="leaves" element={<LeaveList />} />
        <Route path="tasks" element={<TaskList />} />
      </Route>

      {/* ------------------ EMPLOYEE ROUTES ------------------ */}
      <Route
        path="/employee-dashboard"
        element={
          <PrivateRoute>
            <RoleBasedRoute requiredRole="employee">
              <EmployeeDashboard />
            </RoleBasedRoute>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
