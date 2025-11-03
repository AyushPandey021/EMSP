import React from 'react' 
import {useAuth} from "../context/authContext"
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {user,loading}=  useAuth()

    if(loading){
     return    <div className="">Loading...</div>
    }
    return user ? children : <Navigate to="/login"/>

}

export default PrivateRoute