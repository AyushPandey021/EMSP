import React from "react";
import { FaClipboardList, FaClock, FaCheckCircle, FaStar } from "react-icons/fa";

const TaskList = () => {
  const tasks = [
    {
      title: "Create Login UI",
      desc: "Design responsive login page for admin panel",
      status: "To-Do",
      priority: "High",
    },
    {
      title: "Employee CRUD API",
      desc: "Implement update & delete endpoints",
      status: "In Progress",
      priority: "Medium",
    },
    {
      title: "Department Page UI",
      desc: "Improve UI layout & table design",
      status: "Completed",
      priority: "Low",
    },
    {
      title: "Dashboard Analytics",
      desc: "Add charts for leaves & tasks",
      status: "To-Do",
      priority: "High",
    },
  ];

  const statusColors = {
    "To-Do": "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  const priorityColors = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-orange-100 text-orange-600",
    Low: "bg-gray-200 text-gray-600",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-10 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 tracking-wide flex items-center gap-3">
        <FaClipboardList className="text-blue-600" />
        Task Manager
      </h1>

      {/* Tasks Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="
              bg-white 
              rounded-3xl 
              p-7 
              shadow-lg 
              border border-gray-200 
              hover:shadow-2xl 
              hover:-translate-y-2 
              transition-all 
              duration-300 
            "
          >
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              {task.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{task.desc}</p>

            {/* Badges */}
            <div className="flex items-center justify-between mt-4">
              {/* Status */}
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${statusColors[task.status]}`}
              >
                {task.status}
              </span>

              {/* Priority */}
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${priorityColors[task.priority]}`}
              >
                Priority: {task.priority}
              </span>
            </div>

            {/* Footer Icon */}
            <div className="flex justify-end mt-5 text-gray-400">
              {task.status === "Completed" ? (
                <FaCheckCircle className="text-green-500 text-xl" />
              ) : (
                <FaClock className="text-blue-500 text-xl" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
