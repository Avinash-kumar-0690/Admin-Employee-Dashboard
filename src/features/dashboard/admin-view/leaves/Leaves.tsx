
<<<<<<< HEAD
import { useState, memo } from "react";
=======
// interface LeavesProps {
//   viewType: "team" | "my";
// }

// const Leaves = ({ viewType }: LeavesProps) => {
//   const { allDashboardData, user } =
//     useOutletContext<AdminViewProps>();

//   const queryClient = useQueryClient();

//   // 🔹 Filter Leaves
//   const leaves =
//     allDashboardData?.leaves?.filter((l) =>
//       viewType === "team"
//         ? Number(l.teamId) === Number(user?.teamId) &&
//           Number(l.userId) !== Number(user?.id)
//         : Number(l.userId) === Number(user?.id)
//     ) || [];

//   const users = allDashboardData?.users || [];

//   // 🔹 Mutation
//   const updateLeave = async ({
//     leaveId,
//     decision,
//   }: {
//     leaveId: number | string;
//     decision: "approved" | "rejected";
//   }) => {
//     return await api.patch(`/leaves/${leaveId}`, {
//       status: decision,
//       approvedBy: Number(user?.id),
//     });
//   };

//   const leaveMutation = useMutation({
//     mutationFn: updateLeave,
//     onSuccess: () => {
//       // 🔥 THIS is what you were missing
//       queryClient.invalidateQueries({ queryKey: ["dashboard"] });
//     },
//   });

//   // 🔹 Handlers
//   const handleApproveLeave = (leaveId: number | string) => {
//     leaveMutation.mutate({ leaveId, decision: "approved" });
//   };

//   const handleRejectLeave = (leaveId: number | string) => {
//     leaveMutation.mutate({ leaveId, decision: "rejected" });
//   };

//   // 🔹 Stats
//   const approved = leaves.filter((l) => l.status === "approved").length;
//   const pending = leaves.filter((l) => l.status === "pending").length;
//   const rejected = leaves.filter((l) => l.status === "rejected").length;

//   return (
//     <div className="p-6 bg-[#0f172a] min-h-screen text-white">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold">
//           {viewType === "team" ? "Team Leaves" : "My Leaves"}
//         </h1>
//         <p className="text-gray-400 text-sm">
//           {viewType === "team"
//             ? "Manage your team leave requests"
//             : "Track your leave history"}
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <Stat label="Approved" value={approved} color="green" />
//         <Stat label="Pending" value={pending} color="yellow" />
//         <Stat label="Rejected" value={rejected} color="red" />
//       </div>

//       {/* Empty */}
//       {leaves.length === 0 && (
//         <p className="text-gray-500">No leaves found</p>
//       )}

//       {/* Cards */}
//       <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {leaves.map((l) => {
//           console.log(l.status)
//           const userName =
//             users.find(
//               (u) => Number(u.id) === Number(l.userId)
//             )?.name || "Unknown";

//           return (
//             <div
//               key={l.id}
//               className="bg-[#111827] p-5 rounded-xl border border-gray-800 flex flex-col justify-between"
//             >
//               {/* Top */}
//               <div className="flex justify-between items-start mb-3">
//                 <div>
//                   <p className="font-semibold capitalize text-lg">
//                     {l.type} Leave
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {l.fromDate} → {l.toDate}
//                   </p>
//                 </div>

//                 <span
//                   className={`text-xs px-2 py-1 rounded ${
//                     l.status === "approved"
//                       ? "bg-green-500/10 text-green-400"
//                       : l.status === "pending"
//                       ? "bg-yellow-500/10 text-yellow-400"
//                       : "bg-red-500/10 text-red-400"
//                   }`}
//                 >
//                   {l.status}
//                 </span>
//               </div>

//               {/* Info */}
//               <p className="text-sm text-gray-400 mb-2">
//                 {l.reason}
//               </p>

//               <p className="text-xs text-gray-500 mb-3">
//                 {viewType === "team"
//                   ? `By: ${userName}`
//                   : `Applied: ${l.appliedAt}`}
//               </p>

//               {/* Actions */}
//               {viewType === "team" && l.status === "pending" && (
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleApproveLeave(l.id)}
//                     disabled={leaveMutation.isPending}
//                     className="text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded disabled:opacity-50"
//                   >
//                     Approve
//                   </button>

//                   <button
//                     onClick={() => handleRejectLeave(l.id)}
//                     disabled={leaveMutation.isPending}
//                     className="text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded disabled:opacity-50"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// // 🔹 Inline stat component (still one file)
// const Stat = ({ label, value, color }) => {
//   const map = {
//     green: "text-green-400",
//     yellow: "text-yellow-400",
//     red: "text-red-400",
//   };

//   return (
//     <div className="bg-[#111827] p-4 rounded-xl border border-gray-800">
//       <p className="text-xs text-gray-400">{label}</p>
//       <p className={`text-xl font-semibold ${map[color]}`}>
//         {value}
//       </p>
//     </div>
//   );
// };

// export default Leaves;
import React, { useState, memo,  } from "react";
>>>>>>> test-first

/* ---------------- Fake Users ---------------- */
const users: Record<string, string> = {
  "1": "Admin",
  "5": "Avi",
  "10": "Rahul"
};

/* ---------------- Helpers ---------------- */
function formatTime(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString() + " • " + d.toLocaleTimeString();
}

/* ---------------- Main Component ---------------- */
export default function TaskUpdatesDemo({viewType}:{viewType:string}): React.JSX.Element {
  console.log(viewType)
  const [task, setTask] = useState({
    id: "1005",
    title: "Implement Task Filter",
    description: "Allow filtering tasks by status and team",
    status: "in-progress",

    updates: [
      {
        id: "u101",
        userId: "5",
        message: "Started working on filter logic",
        createdAt: "2026-04-10T09:30:00Z"
      },
      {
        id: "u102",
        userId: "5",
        message: "Added status filter dropdown",
        createdAt: "2026-04-11T14:15:00Z"
      },
      {
        id: "u103",
        userId: "1",
        message: "Make sure team filter is also included",
        createdAt: "2026-04-11T16:45:00Z"
      }
    ]
  });

  const [input, setInput] = useState("");

  /* -------- Add Update -------- */
  const handleAddUpdate = () => {
    if (!input.trim()) return;

    const newUpdate = {
      id: crypto.randomUUID(),
      userId: "5", // current user
      message: input,
      createdAt: new Date().toISOString()
    };

    setTask(prev => ({
      ...prev,
      updates: [...prev.updates, newUpdate]
    }));

    setInput("");
  };

  /* -------- Edit Update -------- */
  const handleEdit = (update: any) => {
    const newMessage = prompt("Edit update:", update.message);
    if (!newMessage) return;

    setTask(prev => ({
      ...prev,
      updates: prev.updates.map(u =>
        u.id === update.id ? { ...u, message: newMessage } : u
      )
    }));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        <TaskHeader task={task} />

        <AddUpdate input={input} setInput={setInput} onAdd={handleAddUpdate} />

        <UpdateList updates={task.updates} onEdit={handleEdit} />

      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

const TaskHeader = memo(({ task }: any) => (
  <div className="bg-[#111827] p-5 rounded-xl border border-gray-800">
    <h1 className="text-2xl font-bold">{task.title}</h1>
    <p className="text-gray-400 mt-1">{task.description}</p>

    <span className="inline-block mt-3 text-xs px-2 py-1 bg-yellow-600 rounded">
      {task.status}
    </span>
  </div>
));

const AddUpdate = memo(({ input, setInput, onAdd }: any) => (
  <div className="bg-[#111827] p-4 rounded-xl border border-gray-800 flex gap-2">
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Write an update..."
      className="flex-1 p-2 bg-[#1f2937] border border-gray-700 rounded outline-none"
    />
    <button
      onClick={onAdd}
      className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
    >
      Add
    </button>
  </div>
));

const UpdateList = memo(({ updates, onEdit }: any) => (
  <div className="bg-[#111827] p-5 rounded-xl border border-gray-800">
    <h2 className="text-lg font-semibold mb-4">Activity</h2>

    <div className="space-y-4">
      {updates.map((u: any) => (
        <UpdateItem key={u.id} update={u} onEdit={onEdit} />
      ))}
    </div>
  </div>
));

const UpdateItem = memo(({ update, onEdit }: any) => (
  <div className="flex gap-3 group">

    {/* Timeline dot */}
    <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>

    <div className="flex-1 bg-[#1f2937] p-3 rounded border border-gray-700">

      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-blue-400">
          {users[update.userId] || "Unknown"}
        </span>

        <span className="text-xs text-gray-400">
          {formatTime(update.createdAt)}
        </span>
      </div>

      {/* Message */}
      <p className="text-sm">{update.message}</p>

      {/* Actions */}
      <div className="mt-2 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={() => onEdit(update)}
          className="text-xs text-yellow-400 hover:underline"
        >
          Edit
        </button>
      </div>

    </div>
  </div>
));