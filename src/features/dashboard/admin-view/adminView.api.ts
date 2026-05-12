import type { AdminViewProps } from "./AdminView";
import type {
  LeaveType,
  TaskType,
  UserType,
} from "../dashboard.types";

// admin State type 

export interface adminStateType {
  totalEmployees: UserType[] | undefined;
  onLeaveEmployees?: UserType[];
  pendingTasks: TaskType[] | undefined;
  leaveRequests: LeaveType[] | undefined;
  activeTasks?: TaskType[];
  recentActivity?: any[]; 
}

// function return state card data for admin 
export const adminStat = ({ allDashboardData, user }: AdminViewProps) => {
  const teamId = user?.teamId;

  const totalEmployees = allDashboardData?.users?.filter(
    (u) => u.role === "employee" && u.teamId === teamId,
  );

  const totalAdminTasks = allDashboardData?.tasks?.filter((t) => Number(t.teamId) === Number(user?.id));

  const leaveRequests = allDashboardData?.leaves?.filter(
    (l) =>  Number(l.teamId) === Number(user?.id)
  );
  console.log(leaveRequests )




const idSet = new Set(totalEmployees?.map((e) => Number(e.id)));

 const filterActivities = allDashboardData?.activities?.filter(record => {
  return idSet.has(Number(record.userId));
}) || []; 

  return {
    totalEmployees,
    totalAdminTasks,
    leaveRequests,
    filterActivities,
  };
  
};
