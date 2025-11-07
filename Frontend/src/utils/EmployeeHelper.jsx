import axios from "axios";
import Swal from "sweetalert2";



export const columns = [
  {
    name: "S No.",
    selector: (row, index) => index + 1,
    sortable: true,
    width: "100px",
  },
  {
    name: "Name ",
    selector: (row) => row.name,
    sortable: true,
    grow: 2,
  },
    {
    name: "Image ",
    selector: (row) => row.dep_name,
    sortable: true,
    grow: 2,
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    grow: 3,
  },
  {
    name: "Action",
    cell: (row) => (
      <DepartmentButtons
        _id={row._id}
        onDepartmentDelete={row.onDepartmentDelete}
      />
    ),
    center: true,
  },
];
export const fetchDepartments = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/departments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      return response.data.departments; // ✅ directly return on success
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: response.data.message || "Unable to fetch departments.",
      });
      return [];
    }

  } catch (error) {
    console.error("Fetch error:", error);

    Swal.fire({
      icon: "error",
      title: "Error!",
      text:
        error.response?.data?.error ||
        "Failed to fetch departments. Please try again later.",
    });

    return []; 
  }
};



export const EmployeeButton =({Id})=>{
  return (
    <>
    <div className="flex space-x-3">
    <button className="px-3 py-1 bg-amber-200" onCanPlay={
()=>Navigate("/admin")


    }>View</button>
    <button className="px-3 py-1 bg-amber-200" onCanPlay={
()=>Navigate("/admin")


    }>edit</button>
    <button className="px-3 py-1 bg-amber-200" onCanPlay={
()=>Navigate("/admin")


    }>salary</button>
    <button className="px-3 py-1 bg-amber-200" onCanPlay={
()=>Navigate("/admin")


    }>leave</button>
    
    </div>
    </>
  )
}