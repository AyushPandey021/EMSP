import Department from "../models/department.model.js";

// 🟢 Get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      departments,
    });
  } catch (error) {
    console.error("Error fetching departments:", error.message);
    return res.status(500).json({
      success: false,
      error: "Get department server error",
    });
  }
};

// 🟢 Add new department
const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    if (!dep_name || !description) {
      return res.status(400).json({
        success: false,
        error: "Please provide department name and description",
      });
    }

    const newDep = new Department({
      dep_name,
      description,
    });

    await newDep.save();

    return res.status(201).json({
      success: true,
      department: newDep,
      message: "Department added successfully!",
    });
  } catch (error) {
    console.error("Add Department Error:", error);
    return res.status(500).json({
      success: false,
      error: "Add department server error",
    });
  }
};

// 🟡 Get a single department (for Edit Page)

 const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// 🟠 Edit / Update department
const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true, runValidators: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({
        success: false,
        error: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      department: updatedDepartment,
      message: "Department updated successfully!",
    });
  } catch (error) {
    console.error("Edit Department Error:", error);
    return res.status(500).json({
      success: false,
      error: "Edit department server error",
    });
  }
};

 const deleteDepartment = async  (req,res)=>{
  const {id} = req.params 
try{

const deleteDep = await Department.findByIdAndDelete({_id:id})
return res.status(200).json({success:true,deleteDep})
}
catch(error){
  return res.status(500).json({success:false,error:"delete department server error ", })
}

}
export { addDepartment, getDepartments, editDepartment ,getDepartmentById,deleteDepartment};
