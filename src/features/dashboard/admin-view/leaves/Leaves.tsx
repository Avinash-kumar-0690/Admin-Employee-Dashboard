
import { useState, memo } from "react";

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
export default function TaskUpdatesDemo() {
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