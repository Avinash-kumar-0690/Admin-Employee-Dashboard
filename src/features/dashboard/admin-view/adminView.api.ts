import type { AdminViewProps } from "./AdminView";
import type {
  LeaveType,
  TaskType,
  UserType,
} from "../dashboard.types";

export interface adminStateType {
  totalEmployees: UserType[] | undefined;
  onLeaveEmployees?: UserType[];
  pendingTasks: TaskType[] | undefined;
  leaveRequests: LeaveType[] | undefined;
  activeTasks?: TaskType[];
  recentActivity?: any[]; // you can type this later properly
}
export const adminStat = ({ allDashboardData, user }: AdminViewProps) => {
  const teamId = user?.teamId;

  const totalEmployees = allDashboardData?.users?.filter(
    (u) => u.role === "employee" && u.teamId === teamId,
  );

  const totalAdminTasks = allDashboardData?.tasks?.filter((t) => t.teamId === teamId);

  
  const leaveRequests = allDashboardData?.leaves?.filter(
    (l) =>  Number(l.teamId) === Number(teamId)
  );




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
