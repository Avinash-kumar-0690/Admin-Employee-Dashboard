import { useMemo, useState } from "react";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import type { activitiesType, LeaveType, TaskType, UserType } from "./dashboard.types";


interface ActiveUserTaskType {
    filterActivities?: activitiesType[];
    EmpTasks?: TaskType[] | undefined | [];
    totalEmployees?: UserType[] | undefined;
    EmpLeaves?: LeaveType[] | undefined;
    totalAdminTasks?: TaskType[] | undefined;
}

interface TaskSetionType {
    data: ActiveUserTaskType | undefined;
    user: UserType | undefined;
}

const TaskSection = ({ data, user }: TaskSetionType) => {
    console.log(data)
    const [activeStatus, setActiveStatus] = useState<string>("pending");

    const statuses = ["pending", "in-progress", "completed"];

    const handleActiveStatus = (s: string) => {
        setActiveStatus(s);
    };
const activeTasks = useMemo(() => {
    if (user?.role === "admin") {
        return data?.totalAdminTasks?.filter((e: any) => e.status === activeStatus) ?? [];
    }
    if (user?.role === "employee") {
        return data?.EmpTasks?.filter((e: any) => e.status === activeStatus) ?? [];
    }
    return []; // The "Else" case that satisfies TypeScript
}, [data, user, activeStatus]);

    return (
        <>
            {/* TASKS */}
            <div className="bg-[#1e293b] rounded-2xl mb-5 p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Tasks</h2>
                    <span className="text-sm text-gray-400">

                        {activeTasks?.length || 0} items
                    </span>
                </div>

                {/* FILTER */}
                <div className="flex gap-2 mb-4 flex-wrap">
                    {statuses.map((status) => (
                        <Button
                            key={status}
                            name={status}
                            onClick={() => handleActiveStatus(status)}
                            label={status}
                            className={`px-3 py-1 rounded-lg capitalize transition-all ${activeStatus === status
                                ? "bg-blue-600 text-white"
                                : "bg-[#334155] text-gray-300 hover:bg-[#475569]"
                                }`}
                        />
                    ))}
                    <Link
                        to="tasks"
                        className="ml-auto px-6 py-1.5 text-shadow-2xs font-mono rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-1"
                    >
                        View all
                        <span>→</span>
                    </Link>
                </div>

                {/* TABLE */}
                <div className="max-h-75 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-[#1e293b] z-10">
                            <tr className="text-left border-b border-gray-700 text-gray-400">
                                <th className="py-2">Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeTasks?.length ? (
                                activeTasks.map((t: TaskType) => (
                                    <tr

                                        key={t.id}
                                        className="border-b border-gray-800 hover:bg-[#334155] transition"
                                    >
                                        <td className="py-2 font-medium">
                                            {t.title}

                                        </td>

                                        {/* ✅ FIXED DESCRIPTION */}
                                        <td
                                            className="text-gray-400 max-w-62.5 line-clamp-2"
                                            title={t.description}
                                        >
                                            {t.description}
                                        </td>

                                        <td>
                                            <span
                                                className={`px-2 py-1 rounded-md text-xs capitalize ${t.status === "pending"
                                                    ? "bg-yellow-500/20 text-yellow-400"
                                                    : t.status === "in-progress"
                                                        ? "bg-blue-500/20 text-blue-400"
                                                        : "bg-green-500/20 text-green-400"
                                                    }`}
                                            >
                                                {t.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="text-center py-6 text-gray-500"
                                    >
                                        No tasks found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default TaskSection;