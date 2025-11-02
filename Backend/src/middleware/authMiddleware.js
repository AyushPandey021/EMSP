import jwt from "jsonwebtoken"
import User from "../models/user.model"
const verifyUser = async()=>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(404).json({success:false,error:"token not found"})
        }
        const decoded = jwt.varify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(404).json({success:false,error:"tOken not valid  "})
        }
        const user = await User.findById({_id:decoded._id}).select(`-password`)
        if(!user){
            return res.status(404).json({success:false ,error: "user not found"})
        }
        req.user = user 
        next()
    } catch (error) {
        return res.status(500).json({success:false,error: "server  error"})
    }
}
export default verifyUser 