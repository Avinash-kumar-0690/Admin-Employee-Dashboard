
import { getDashboardData } from '../features/dashboard/dahsboard.api';
import type { DashboardDataType } from '../features/dashboard/dashboard.types';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from "@tanstack/react-query";
import { getLocalStorage } from '../utilities/useLocalStorage';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const localStorageData = getLocalStorage("authUser");
  const { user } = useAuth();

  // 🔴 Auth check
  useEffect(() => {
    if (!localStorageData) {
      navigate("/auth/login");
    }
  }, [localStorageData, navigate]);

  // ✅ Fetch all data which will come from the api
const allDashboardData= useQuery<DashboardDataType>({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    enabled: !!localStorageData, // it will fetch the data when user data will available in localstorage
  });
  useEffect(() => {

    if(user?.role === "admin") {
      navigate("/admin")
    }
    else if(user?.role === "employee"){
      navigate("/employee");
    }
    else return;
  }, [user, localStorageData])
return (
  <>
  <Outlet context={{allDashboardData:allDashboardData.data, user}} />
  </>
)
};

export default Dashboard;