import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    dob: {
      type: Date,
      required: true,
    },

gender: {
  type: String,
  enum: ["male", "female", "other"],
  required: true,
},

maritalStatus: {
  type: String,
  enum: ["single", "married"],
  default: "single",
},


    role: {
      type: String,
   
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    salary: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, 
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
