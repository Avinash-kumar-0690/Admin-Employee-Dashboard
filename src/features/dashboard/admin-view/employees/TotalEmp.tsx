import { useOutletContext } from "react-router-dom";
import type { AdminViewProps } from "../AdminView";

const TotalEmp = () => {
  const { allDashboardData, user } =
    useOutletContext<AdminViewProps>();

  const employees =
    allDashboardData?.users?.filter(
      (e) =>
        Number(e.teamId) === Number(user?.teamId) &&
        e.role !== "admin"
    ) || [];

  return (
    <div className="p-6 bg-[#0f172a] min-h-screen text-white">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Team Employees</h1>
          <p className="text-gray-400 text-sm">
            Manage and monitor your team members
          </p>
        </div>

        <div className="bg-[#1e293b] px-4 py-2 rounded-lg border border-gray-800">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-lg font-semibold">{employees.length}</p>
        </div>
      </div>

      {/* 🔹 Empty State */}
      {employees.length === 0 && (
        <div className="text-center mt-16 text-gray-500">
          No employees found in your team
        </div>
      )}

      {/* 🔹 Grid (better than boring list) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="bg-[#1e293b] p-4 rounded-xl border border-gray-800 hover:border-gray-600 hover:shadow-lg transition-all duration-200"
          >
            {/* Top */}
            <div className="flex items-center gap-3">
              <img
                src={emp.avatar}
                className="w-11 h-11 rounded-full border border-gray-700"
              />

              <div>
                <p className="font-semibold">{emp.name}</p>
                <p className="text-xs text-gray-400">
                  {emp.email}
                </p>
              </div>
            </div>

            {/* Middle */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">
                {emp.role}
              </span>

              <span className="text-xs text-gray-500">
                ID: {emp.id}
              </span>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 flex justify-between items-center">
              <button className="text-xs text-gray-400 hover:text-white transition">
                View Details
              </button>

             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalEmp;