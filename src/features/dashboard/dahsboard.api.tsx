
import { api } from "../../services/BaseApi";
import type { activitiesType,  DashboardDataType, eventType, LeaveType, TaskType, transformDashboardDataType, UserType } from "./dashboard.types";
import type { StateListType } from "./Statelist";

// get all user Data 
export const getUsersData = async (): Promise<UserType[]> => {
    const res = await api.get("/users");
    return res?.data
}

// get all Tasks Data 
export const getTasksData = async (): Promise<TaskType[]> => {
    const res = await api.get("/tasks");
    return res.data
}

// get All Leaves Data 
export const getLeavesData = async (): Promise<LeaveType[]> => {
    const res = await api.get("/leaves");
    return res.data
}

// get ALl Activities Data 
export const getActivitiesData = async (): Promise<activitiesType[]> => {
    const res = await api.get("/activities");
    return res.data
}

// get All events data 
export const getEventsData = async (): Promise<eventType[]> => {
    const res = await api.get("/events");
    return res.data
}

// get data for dashboard at once
export const getDashboardData = async (): Promise<DashboardDataType> => {
    const users = await getUsersData();
    const tasks = await getTasksData();
    const leaves = await getLeavesData();
    const activities = await getActivitiesData();
    const events = await getEventsData();
    return {
        users,
        tasks,
        leaves,
        activities,
        events,
    }
}


// Transform data for   State Card
export const transformDashboardData = ({data, user}:StateListType): transformDashboardDataType[] | undefined => {
   
    // transformed state data for admin 
    if (user?.role === "admin") {
        return [
            {
                title: "Total Employees",
                value: data?.totalEmployees?.length ?? 0,
                type: "employees",
                action: "/dashboard/admin/totalEmp",
            },
            {
                title: "My Leave",
                value:
                    data?.leaveRequests?.filter((l:any) => Number(l.userId) === Number(user.id)).length ??
                    0,
                type: "leaves",
                action: "/dashboard/admin/my-leaves",
            },
            {
                title: "All Leaves",
                value: data?.leaveRequests?.filter((l:any) => Number(l.teamId) === Number(user.teamId) && Number(l.userId) !== Number(user?.id)).length ??
                    0,
                type: "leaves",
                action: "/dashboard/admin/team-leaves",
            },
            {
                title: "Add Tasks",
                value: "",
                type: "addtasks",
                action: "/dashboard/admin/add-tasks",
            },
        ];
    }

    // transformed state data for employee 

    if (user?.role == "employee") {
        return [
            {
                title: "Leaves",
                value: data?.EmpLeaves?.length ?? 0,
                type: "leaves",
                action: "/dashboard/employee/leaves",
            },

            {
                title: "Request Leave",
                value: "",
                type: "requestLeave",
                action: "/dashboard/employee/apply-leave",
            },
        ]
    };
    return []
};
