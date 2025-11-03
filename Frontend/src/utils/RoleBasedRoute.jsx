import React from 'react'

const RoleBasedRoute = ({children , requiredRole}) => {
    const {user,loading} = useAuth()
    if(loading){
        <div className=""> Loading...</div>
    }
    if(!requiredRole.includes(user.role)){
        <Navigate to="unauthorized"/>
    }
    if(!user){
     return user ? children : <Navigate to="/login"/>
    }
}

export default RoleBasedRoute