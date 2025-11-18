import Salary from "../models/salaryModel.js";

 export const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowance = 0, deduction = 0, payDate } = req.body;

    // Validate required fields
    if (!employeeId || !basicSalary || !payDate) {
      return res.status(400).json({
        success: false,
        message: "employeeId, basicSalary, and payDate are required.",
      });
    }

    // Convert values to numbers safely
    const basic = Number(basicSalary);
    const allow = Number(allowance);
    const deduct = Number(deduction);

    if (isNaN(basic) || isNaN(allow) || isNaN(deduct)) {
      return res.status(400).json({
        success: false,
        message: "Salary fields must be numeric values.",
      });
    }

    // Calculate final amount
    const netSalary = basic + allow - deduct;

    // Create salary record
    const newSalary = await Salary.create({
      employeeId,
      basicSalary: basic,
      allowance: allow,
      deduction: deduct,
      netSalary,
      payDate,
    });

    return res.status(201).json({
      success: true,
      message: "Salary added successfully",
      salary: newSalary,
    });

  } catch (error) {
    console.error("Add Salary Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};


