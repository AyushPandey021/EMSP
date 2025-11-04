import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ============================
// 🔹 AUTO ADMIN CREATION
// ============================
const userRegister = async () => {
  try {
    // check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("⚙️ Admin user already exists.");
      return;
    }

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
    console.log("❌ Error while creating admin:", error.message);
  }
};

// ✅ call the function once on startup
userRegister();

// ============================
// 🔹 LOGIN CONTROLLER
// ============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Ayush not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    // generate JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    // success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Server error, please try again later",
    });
  }
};

// ============================
// 🔹 VERIFY CONTROLLER
// ============================
export const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
