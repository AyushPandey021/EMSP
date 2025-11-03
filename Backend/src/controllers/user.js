import User from "../models/user.model.js";  // ✅ added .js extension
import bcrypt from "bcryptjs";               // ✅ use bcryptjs (safer, common in Node.js)

const userRegister = async () => {
  try {
    
    const hashPassword = await bcrypt.hash("admin", 10);

    
    const newUser = new User({
      name: "admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });

    await newUser.save();
    console.log("✅ Admin user created successfully!");
  } catch (error) {
    console.log("❌ Error while creating admin:", error);
  }
};

// ✅ call the function
userRegister();
