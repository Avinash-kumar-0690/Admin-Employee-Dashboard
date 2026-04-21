import { useOutletContext } from "react-router-dom";
import type { AdminViewProps } from "../AdminView";
import { useMutation,  useQueryClient } from "@tanstack/react-query";
import Input from "../../../../components/ui/Input";
import { createTask } from "./AddTask.api";
import type { TaskType } from "../../dashboard.types";

//  API CAL


function AddTaskUI() {
  const { allDashboardData, user } =
    useOutletContext<AdminViewProps>();
    

  //  Filter employees (team-based)
  const AdminTotalEmp = allDashboardData?.users?.filter(
    (e) =>
      Number(e.teamId) === Number(user?.teamId) &&
      e.role === "employee"
  );
const queryClient = useQueryClient()
  //  postMutation
  const postMutation = useMutation({
    mutationKey:["add-tasks",],
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["dashboard"]});
    }
  })
 
  // ✅ Submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const taskData :TaskType = {
      title: String(formData.get("title")),
      description: String(formData.get("description")),
      priority: String(formData.get("priority")),
      assignedTo: Number(formData.get("assignedTo")),
      dueDate: String(formData.get("dueDate")),
      tags: String(formData.get("tags")),
      status: String(formData.get("status")),
      teamId: Number(user?.teamId), 
      createdBy: Number(user?.id),
      createdAt: new Date().toISOString().split("T")[0],
    };

    // 🔴 Basic validation
    if (!taskData.title) {
      return alert("Title is required");
    }

    if (!taskData.assignedTo) {
      return alert("Assign someone");
    }

    postMutation.mutate(taskData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6"
    >
      <div className="w-full max-w-3xl bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl p-8 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Create New Task
          </h1>
          <p className="text-gray-400 text-sm">
            Assign tasks to your team
          </p>
        </div>

        {/* Title */}
        <div>
          <label className="text-sm text-gray-300">
            Task Title
          </label>

          <Input type="text" name="title" />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 rounded-lg text-white"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6">

          {/* Priority */}
          <div>
            <label className="text-sm text-gray-300">
              Priority
            </label>
            <select
              name="priority"
              className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 rounded-lg text-white"
            >
              <option value="">Select</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* assignedTo */}
          <div>
            <label className="text-sm text-gray-300">
              Assign To
            </label>
            <select
              name="assignedTo"
              className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 rounded-lg text-white"
            >
              <option value="">Select user</option>
              {AdminTotalEmp?.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="text-sm text-gray-300">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 rounded-lg text-white"
          />
        </div>

        {/* Tags + Status */}
        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="text-sm text-gray-300">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              placeholder="frontend, urgent"
              className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">
              Status
            </label>
            <select
              name="status"
              className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 rounded-lg text-white"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="reset"
            className="px-5 py-2 border border-gray-700 text-gray-300"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={postMutation.isPending}
            className="px-6 py-2 bg-indigo-600 text-white"
          >
            {postMutation.isPending ? "Creating..." : "Create Task"}
          </button>
        </div>

        {/* Feedback */}
        {postMutation.isError && (
          <p className="text-red-400">
            Failed to create task
          </p>
        )}

        {postMutation.isSuccess && (
          <p className="text-green-400">
            Task created successfully
          </p>
        )}
      </div>
    </form>
  );
}

export default AddTaskUI;