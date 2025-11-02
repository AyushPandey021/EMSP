import User from "../models/user.model";
import bcrypt from 'bcrypt'
const userRegister = async()=>{
    try {
      

        const hashPassword = await  bcrypt.hash("admin",10)
              const newUser = new User({
            name: "admin",
            email: "admin@gmail.com",
            password : hashPassword,
            role: "admin"
            
        })
        await newUser.save() 
    } catch (error) {
        console.log("error is : ",error);
        
    }
}
userRegister()