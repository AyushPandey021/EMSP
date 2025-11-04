import Department from "../models/department.model.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      departments, // 👈 match the frontend naming
    });
  } catch (error) {
    console.error("Error fetching departments:", error.message);
    return res.status(500).json({
      success: false,
      error: "Get department server error",
    });
  }
};



const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    const newDep = new Department({
      dep_name,
      description,
    });

    await newDep.save();

    return res.status(200).json({
      success: true,
      department: newDep,
    });
  } catch (error) {
    console.error("Add Department Error:", error);
    return res.status(500).json({
      success: false,
      error: "Add department server error",
    });
  }
};

export { addDepartment ,getDepartments};
