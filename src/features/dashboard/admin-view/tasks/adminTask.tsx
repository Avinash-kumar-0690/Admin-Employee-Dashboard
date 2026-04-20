import React from "react";
import { useOutletContext } from "react-router-dom";
import type { AdminViewProps } from "../AdminView";


 function AdminTasksPage() {
    const {allDashboardData, user} = useOutletContext<AdminViewProps>()

    console.log(allDashboardData, user)
    const tasks = allDashboardData?.tasks?.filter((t) => {
        const data = Number(t.teamId) === Number(user?.teamId)
return data
    })



console.log(tasks)
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">All Tasks</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-800">
          <thead className="bg-[#020617] text-gray-400 uppercase text-xs">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Description</th>
              <th className="text-left p-3">Priority</th>
              <th className="text-left p-3">Assigned To</th>
              <th className="text-left p-3">Due Date</th>
              <th className="text-left p-3">Tags</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Team</th>
              <th className="text-left p-3">Created By</th>
              <th className="text-left p-3">Created At</th>
            </tr>
          </thead>

          <tbody>
            {tasks?.map((task) => (
              <tr key={task.id} className="border-t border-gray-800">
                <td className="p-3">{task.title}</td>
                <td className="p-3">{task.description}</td>
                <td className="p-3">{task.priority}</td>
                <td className="p-3">{task.assignedTo}</td>
                <td className="p-3">{task.dueDate}</td>
                <td className="p-3">{task.tags}</td>
                <td className="p-3">{task.status}</td>
                <td className="p-3">{task.teamId}</td>
                <td className="p-3">{task.createdBy}</td>
                <td className="p-3">{task.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminTasksPage