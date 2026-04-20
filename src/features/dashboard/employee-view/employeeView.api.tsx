import type { EmployeeViewProps } from "./EmployeeView";

export const empDashboardData = ({ allDashboardData, user }: EmployeeViewProps) => {
  const teamId = user?.teamId;


  const totalEmployees = allDashboardData?.users?.filter(
    (u) => u.role === "employee" && u.teamId === teamId,
  );
    // get leaves data belong to user 
    const EmpLeaves = allDashboardData?.leaves?.filter((l) => Number(l.userId) === Number(user?.id));
    // get Tasks which belong to user 
    const EmpTasks = allDashboardData?.tasks?.filter((t) => Number(t.assignedTo) === Number(user?.id));

    
const idSet = new Set(totalEmployees?.map((e) => Number(e.id)));

 const filterActivities = allDashboardData?.activities?.filter(record => {
  return idSet.has(Number(record.userId));
}) || []; 
return {
    EmpLeaves,
    EmpTasks,
    filterActivities,
    totalEmployees,
}
    

};



