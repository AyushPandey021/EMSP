import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from "./pages/Login"
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoute from './utils/PrivateRoute'
import RoleBasedRoute from './utils/RoleBasedRoute'
const App = () => {

  return (
<Routes>
  <Route path='/' element={<Navigate to="admin-dashboard"/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
  <Route path='/admin-dashboard' element={
    <PrivateRoute>
      <RoleBasedRoute requiredRole={"admin"}>
    <AdminDashboard/>
    </RoleBasedRoute>
    </PrivateRoute>
    
    }>

  
  </Route>
  <Route path='/employee-dashboard' element={<EmployeeDashboard/>}></Route>
</Routes>

  )
}

export default App