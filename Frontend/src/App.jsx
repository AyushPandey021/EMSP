import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from "./pages/Login"
import AdminDashboard from './pages/AdminDashboard'
const App = () => {

  return (
<Routes>
  <Route path='/' element={<Navigate to="admin-dashboard"/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
  <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
</Routes>

  )
}

export default App