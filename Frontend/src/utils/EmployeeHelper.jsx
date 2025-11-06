import axios from "axios";
import Swal from "sweetalert2";

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
