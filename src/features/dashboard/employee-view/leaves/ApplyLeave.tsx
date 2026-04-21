import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { MainLayoutContext } from "../EmployeeLayout";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../services/BaseApi";

// 1. Define a complete interface for the data you are actually sending
interface LeavePayload {
  id: number;
  userId?: string | number;
  teamId?: string | number;
  type: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: string;
  appliedAt: string;
}

export default function ApplyLeave() {
  const { user } = useOutletContext<MainLayoutContext>();

  const [form, setForm] = useState({
    type: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  // 2. Fix: The parameter here must match what you pass to .mutate()
  const handleApplyLeave = async (newLeave: LeavePayload) => {
    const response = await api.post("/leaves", newLeave);
    return response.data;
  };

  const applyLeave = useMutation({
    mutationFn: handleApplyLeave,
    onSuccess: () => {
      alert("Your application is submitted Successfully!");
      setForm({ type: "", fromDate: "", toDate: "", reason: "" });
    },
    onError: (error) => {
      alert("Failed to submit leave request.");
      console.error(error);
    }
  });

  // 3. Fix: Added HTMLTextAreaElement to the union so the textarea doesn't error
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 4. Fix: Changed type to React.FormEvent<HTMLFormElement>
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.type || !form.fromDate || !form.toDate || !form.reason) {
      alert("All fields required");
      return;
    }

    if (new Date(form.fromDate) > new Date(form.toDate)) {
      alert("Invalid date range");
      return;
    }

    // 5. Logical consistency: Ensure this object matches LeavePayload
    const newLeave: LeavePayload = {
      id: Date.now(),
      userId: user?.id,
      teamId: user?.teamId,
      type: form.type,
      fromDate: form.fromDate,
      toDate: form.toDate,
      reason: form.reason,
      status: "pending",
      appliedAt: new Date().toISOString().split("T")[0],
    };

    applyLeave.mutate(newLeave);
  };

  return (
    <div className="bg-[#0f172a] flex justify-center px-4">
      <div className="w-full max-w-xl bg-[#111827] border border-gray-800 rounded-2xl shadow-xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">Apply Leave</h2>
          <p className="text-gray-400 text-sm">Submit your leave request here</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-400">Leave Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="mt-1 w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="">Select type</option>
              <option value="casual">Casual</option>
              <option value="sick">Sick</option>
              <option value="vacation">Vacation</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={form.fromDate}
                onChange={handleChange}
                className="mt-1 w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">To Date</label>
              <input
                type="date"
                name="toDate"
                value={form.toDate}
                onChange={handleChange}
                className="mt-1 w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400">Reason</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full bg-[#0f172a] border border-gray-700 text-white rounded-lg px-3 py-2 outline-none focus:border-blue-500 resize-none"
              placeholder="Enter your reason..."
            />
          </div>

          <button
            type="submit"
            disabled={applyLeave.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 transition text-white py-2 rounded-lg font-medium"
          >
            {applyLeave.isPending ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}