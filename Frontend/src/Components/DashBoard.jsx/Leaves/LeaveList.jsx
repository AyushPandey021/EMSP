import React from 'react'
import SummeryCard from '../Sidebar.jsx/as/SummeryCard'
import { FaUsers } from 'react-icons/fa'

const LeaveList = () => {
  return (
    <div>
           <div className="mt-10">
        <h4 className="text-center text-2xl font-bold mb-6">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummeryCard icon={<FaUsers />} text="Leaves Applied" number={5} color="bg-teal-600" />
          <SummeryCard icon={<FaUsers />} text="Leaves Approved" number={3} color="bg-green-500" />
          <SummeryCard icon={<FaUsers />} text="Leaves Rejected" number={2} color="bg-red-600" />
          <SummeryCard icon={<FaUsers />} text="Pending Leaves" number={1} color="bg-yellow-600" />
        </div>
      </div>
    </div>
  )
}

export default LeaveList