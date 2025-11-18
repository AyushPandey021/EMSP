import Employee from "../models/employee.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// ✅ Add Employee Controller
export const addEmployee = async (req, res) => {
  try {
    const {
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      name,
      email,
      password,
      role,
    } = req.body;

    // Validation
    if (
      !name ||
      !email ||
      !employeeId ||
      !dob ||
      !gender ||
      !designation ||
      !department ||
      !salary ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "employee",
      profileImage: req.file ? req.file.filename : "",
    });

    await newUser.save();

    // Create new employee
    const newEmployee = new Employee({
      userId: newUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();

    return res.status(201).json({
      success: true,
      message: "Employee added successfully.",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding employee.",
      error: error.message,
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", "name email ProfileImage")   // GOOD
      .populate("department", "dep_name");

    res.status(200).json({
      success: true,
      data: employees,
    });

  } catch (error) {
    console.log("Get Employee Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id)
      .populate("userId", "-password")    // exclude password
      .populate("department", "dep_name"); // only dep name

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });

  } catch (error) {
    console.error("Get Employee Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};


export const updateEmployeeById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    // Check employee exists
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Update User details if sent in request
    if (data.name || data.email) {
      await User.findByIdAndUpdate(
        employee.userId,
        {
          ...(data.name && { name: data.name }),
          ...(data.email && { email: data.email }),
        },
        { new: true }
      );
    }

    // Prepare valid employee fields only
    const updateEmployeeFields = {
      ...(data.salary && { salary: data.salary }),
      ...(data.designation && { designation: data.designation }),
      ...(data.maritalStatus && { maritalStatus: data.maritalStatus }),
      ...(data.department && { department: data.department }),
      ...(data.dob && { dob: data.dob }),
    };

    // Update employee
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updateEmployeeFields,
      { new: true }
    )
      .populate("userId", "-password")
      .populate("department", "dep_name");

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Update Employee Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};


export const fetchemloyeebydepid=async(req,res)=>{
  const { id } = req.params;
  try { 
    const employees = await Employee.find({ department: id })
      .populate("userId", "name email profileImage")
      .populate("department", "dep_name");    
    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error("Fetch Employees by Department Error:", error);
    res.status(500).json({  
      success: false,
      message: error.message || "Server error",
    });
  } }