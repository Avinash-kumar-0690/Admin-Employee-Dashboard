import type { iconMap } from "./StateCard";

export interface UserType {
  id?: number;
  name?: string;
  email?: string;
  password?:string;
  role?: "admin" | "employee";
  department?: string;
  avatar?: string;
  createdAt?: string;
  teamId:number;
  status:string;
}

export interface TaskType {
    id?:string | number;
    title?:string;
    description?:string;
    assignedTo?:number;
    priority?:"low" | "medium" | "high" | string;
    createdBy?:number;
    status?:"pending" | "in-progress" | "completed" | string;
    dueDate?:string;
    createdAt?:string;
    completedAt?:string | null
    teamId:number;
    tags?:string;
}

export interface LeaveType {
    id?:number;
    userId?:number;
    type?:string;
    reason?:string;
    startDate?:string;
    endDate?:string;
    status?:"pending" | "approved" | "rejected";
    approvedBy?:null | number;
    createdAt?:string;
    teamId:number;
    assignedTo:number | string;
    fromDate:string;
    toDate:string;
}



export interface attendanceType {
    id?:number;
    userId?:number;
    date?:string;
    status?:"Present" | "absent";
    checkIn?:string | null;
    checkOut?:string | null;
}


export interface activitiesType {
    id?:number;
    userId?:number;
    action?:string;
    message?:string; 
    createdAt?:string;
    type:string
}

export interface eventType {
    id?:number;
    title?:string;
    date?:string | number ;
    createBy?:number;
}


export interface DashboardDataType {
    users?:UserType[];
    tasks?:TaskType[];
    leaves?:LeaveType[];
    attendance?:attendanceType[];
    activities?:activitiesType[];
    events?:eventType[];
}


export interface transformDashboardDataType {
    title: string;
  value: number | string;
  type: keyof typeof iconMap; 
  action: string
}

export interface getTransformDataType {
    totalEmployees?:UserType[] | undefined;
    leaveRequests?:LeaveType[] | undefined;
    EmpLeaves?:LeaveType[] | undefined;
      filterActivities?: activitiesType[] | undefined;
      EmpTasks?:TaskType[] | undefined;
}