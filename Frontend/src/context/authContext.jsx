import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
;

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
const [loading , setLoading]  = useState(true)
useEffect(()=>{
const varifyUser = async()=>{
  const token = localStorage.getItem('token')
   try {
  if(token){


 
    const responce = await axios.get('http://localhost:5000/api/auth/verify',{
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
    if(responce.data.success){
      setUser(responce.data.user)
    }
  }else{
  setUser(null)
  }
    
} catch (error) {

if(error.responce &&  !error.responce.data.error){
setUser(null)

}
 
}finally{
 setLoading(false) 
}


}




varifyUser()
},[])
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout ,loading}}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
