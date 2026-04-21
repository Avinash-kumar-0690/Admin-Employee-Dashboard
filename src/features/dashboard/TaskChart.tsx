
const TaskChart = ({ tasks }) => {
  const pending = tasks?.filter(t => t.status === "pending").length;
  const inProgress = tasks?.filter(t => t.status === "in-progress").length;
  const completed = tasks?.filter(t => t.status === "completed").length;

  const total = pending + inProgress + completed;

  const pendingPercent = (pending / total) * 100;
  const progressPercent = (inProgress / total) * 100;
  const completedPercent = (completed / total) * 100;

  return (
    <div className="w-full bg-[#0f172a] rounded-lg p-5 border border-gray-800">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm text-gray-400">Task Overview</h3>
        <span className="text-sm text-gray-500">{total} Tasks</span>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full h-4 flex rounded-full overflow-hidden mb-6">
        <div
          className="bg-yellow-500"
          style={{ width: `${pendingPercent}%` }}
        />
        <div
          className="bg-blue-500"
          style={{ width: `${progressPercent}%` }}
        />
        <div
          className="bg-green-500"
          style={{ width: `${completedPercent}%` }}
        />
      </div>

      {/* LEGEND */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        
        <div className="flex flex-col items-center">
          <span className="text-yellow-400 font-semibold">{pending}</span>
          <span className="text-gray-500 text-xs">Pending</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-blue-400 font-semibold">{inProgress}</span>
          <span className="text-gray-500 text-xs">In Progress</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-green-400 font-semibold">{completed}</span>
          <span className="text-gray-500 text-xs">Completed</span>
        </div>

      </div>
    </div>
  );
};

export default TaskChart;