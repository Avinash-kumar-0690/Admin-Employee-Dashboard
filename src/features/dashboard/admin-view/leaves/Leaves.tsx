import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import type { MainLayoutContext } from "../AdminLayout";

interface LeavesProps {
  viewType: "my" | "team";
}

function Leaves({ viewType }: LeavesProps) {
  const { allDashboardData, user } = useOutletContext<MainLayoutContext>();
  const leavesData = allDashboardData?.leaves || [];
console.log(viewType)
  const filteredLeaves = useMemo(() => {
    let list = [...leavesData];

  if (viewType === "my") {
  // Filter for the logged-in user's leaves only
  list = list.filter((leave) => Number(leave.userId) === Number(user?.id));
} else if (viewType === "team") { // Fixed: added ===
  // Show all leaves EXCEPT the logged-in user
  list = list.filter((leave) => Number(leave.teamId)  === Number(user?.teamId) && Number(leave.userId) !== Number(user?.id));
}
    // Sort by date (newest first)
    return list.sort((a, b) => +new Date(b.fromDate) - +new Date(a.fromDate));
  }, [leavesData, user?.id, viewType]); // Fixed dependency array

  // Helper for Tailwind status colors
  const getStatusClass = (status: string | undefined) => {
    if (status === "approved") return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    if (status === "rejected") return "text-rose-400 bg-rose-400/10 border-rose-400/20";
    return "text-amber-400 bg-amber-400/10 border-amber-400/20";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#0f172a] min-h-screen text-slate-200">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white capitalize">
          {viewType === "my" ? "My Leave Applications" : "Team Leave Requests"}
        </h2>
        <span className="text-sm text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
          Total: {filteredLeaves.length}
        </span>
      </div>

      <div className="space-y-4">
        {filteredLeaves.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-2xl">
            <p className="text-slate-500">No leave records found for this view.</p>
          </div>
        ) : (
          filteredLeaves.map((leave) => (
            <div
              key={leave.id}
              className="group bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-emerald-600/50 transition-all duration-300 shadow-lg"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 capitalize">
                    {leave.type} Leave
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
                    <span className="text-emerald-500">📅</span>
                    {leave.fromDate} <span className="text-slate-600">→</span> {leave.toDate}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusClass(leave.status)} capitalize`}>
                  {leave.status}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700/30">
                <p className="text-sm text-slate-400 italic">
                  <span className="text-slate-500 not-italic font-medium mr-2">Reason:</span>
                  "{leave.reason}"
                </p>
              </div>
              
              {leave.status == "pending" && (
                <div className="mt-4 flex gap-3 justify-end">
                   <button className="text-xs px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors">Approve</button>
                   <button className="text-xs px-4 py-2 bg-slate-700 hover:bg-rose-600 text-white rounded-lg transition-colors">Reject</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Leaves;