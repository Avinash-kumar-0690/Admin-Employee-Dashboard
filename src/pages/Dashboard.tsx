
import { getDashboardData } from '../features/dashboard/dahsboard.api';
import type { DashboardDataType } from '../features/dashboard/dashboard.types';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from "@tanstack/react-query";
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();


  // ✅ Fetch all data which will come from the api
const allDashboardData= useQuery<DashboardDataType>({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    enabled: !!user, // it will fetch the data when user data will available 
  });
 useEffect(() => {
  if (loading) return;

  
  if (!user) {
    navigate("/auth/login", { replace: true });
    return;
  }

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