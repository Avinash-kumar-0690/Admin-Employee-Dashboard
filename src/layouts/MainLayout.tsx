
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { Toaster } from 'sonner';


const MainLayout = () => {
 const { user, loading } = useAuth();
 const navigate = useNavigate()
 useEffect(() => {
 if (loading) return;

  
  if (!user) {
    navigate("/auth/login", { replace: true });
    return;
  }
 }, [user])
 console.log("Main Layout is working....")

  return (
   <>
   <Toaster />
   <Header />
   <main>
   <Outlet ></Outlet>
   </main>
   </>
  )
}

export default MainLayout
