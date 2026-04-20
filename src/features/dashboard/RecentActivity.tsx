import type { AdminViewProps } from "./admin-view/AdminView";

const RecentActivity = ({data}:AdminViewProps) => {
  return (
    <>
    <div className="bg-[#1e293b] rounded-2xl p-5 shadow-lg border border-gray-700">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
    <button className="text-xs text-blue-400 hover:underline">
      View All
    </button>
  </div>

  <div className="space-y-3">
    {data?.filterActivities?.map((a, index) => {
      return (
        <div
          key={index}
          className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#334155] transition"
        >
          {/* ICON */}
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-sm">
            {a.type?.[0] || "A"}
          </div>

          {/* CONTENT */}
          <div className="flex-1">
            <p className="text-sm text-white leading-tight">
              {a.type || "No activity message"}
            </p>

            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-400">
               {data?.totalEmployees?.find((e) => Number(e.id) === Number(a.userId))?.name || "Unknown"}
              </span>

              <span className="text-xs text-gray-500">
                {a.createdAt || "Just now"}
              </span>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>
    </>
  )
}

export default RecentActivity
