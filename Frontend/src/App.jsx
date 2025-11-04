import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoute from './utils/PrivateRoute';
import RoleBasedRoute from './utils/RoleBasedRoute';
import DepartmentList from './Components/DashBoard.jsx/Sidebar.jsx/as/Departments/DepartmentList';
import AdminSummery from './Components/DashBoard.jsx/Sidebar.jsx/as/AdminSummery';
import LeaveList from './Components/DashBoard.jsx/Leaves/LeaveList';
import TaskList from './Components/Task/TaskList';
import AddDepartment from './Components/DashBoard.jsx/Sidebar.jsx/as/Departments/AddDepartment';

const App = () => {
  return (
    <Routes>
      {/* Redirect to Admin Dashboard by default */}
      <Route path="/" element={<Navigate to="/admin-dashboard"/>} />

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
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
        <Route index element={<AdminSummery/>} ></Route>
        {/* Nested routes under AdminDashboard */}
        <Route path="/admin-dashboard/department" element={<DepartmentList />} />
        <Route path="/admin-dashboard/add-new-departments" element={<AddDepartment />} />
        <Route path="leaves" element={<LeaveList />} />
        <Route path="tasks" element={<TaskList />} />
      </Route>

      {/* Employee Routes */}
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
