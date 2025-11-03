import React from 'react'
import { useAuth } from '../context/authContext'
import  { useNavigate} from "react-router-dom"
import AdminSidebar from '../Components/DashBoard.jsx/Sidebar.jsx/as/AdminSidebar'
import Navbar from '../Components/DashBoard.jsx/Sidebar.jsx/as/Navbar'
import AdminSummery from '../Components/DashBoard.jsx/Sidebar.jsx/as/AdminSummery'
const AdminDashboard = () => {
    const {user } = useAuth()
   
        }
    
  return (
   
    <div className=" flex">
      <AdminSidebar/>
      <div className=" flex-1 ml-64 bg-gray-100 h-screen">
<Navbar/>
<AdminSummery/>
      </div>
    </div>
  )


export default AdminDashboard