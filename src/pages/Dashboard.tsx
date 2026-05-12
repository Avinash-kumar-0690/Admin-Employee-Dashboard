
import { getDashboardData } from '../features/dashboard/dahsboard.api';
import type { DashboardDataType } from '../features/dashboard/dashboard.types';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from "@tanstack/react-query";
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();


  // ✅ Fetch all data which will come from the api
const allDashboardData= useQuery<DashboardDataType>({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });
 useEffect(() => {
  if (loading) return;

  
  if (!user) {
    navigate("/auth/login", { replace: true });
    return;
  }
  console.log(allDashboardData)


  if (user.role === "admin") {
    navigate("/dashboard/admin", { replace: true });
  } else if (user.role === "employee") {
    navigate("/dashboard/employee", { replace: true });
  }
}, [user, loading, navigate]);
return (
  <>
  <Outlet context={{allDashboardData:allDashboardData.data, user}} />
  </>
)
};

export default Dashboard;