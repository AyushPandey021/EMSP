import mongoose from "mongoose";
const userSchemam = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    password: { type: String, enum: ["admin", "emloyee"], required: true },
    profileImage: { type: String },
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }



})
const User = mongoose.model('User', userSchemam)
export default User