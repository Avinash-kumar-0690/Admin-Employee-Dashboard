import {createBrowserRouter} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Login from "./features/auth/Login";
import SignUp from "./features/auth/SignUp";
import Dashboard from "./pages/Dashboard"
import AdminView from "./features/dashboard/admin-view/AdminView";
import EmployeeView from "./features/dashboard/employee-view/EmployeeView";
import TotalEmp from "./features/dashboard/admin-view/employees/TotalEmp";
import AdminLayout from "./features/dashboard/admin-view/AdminLayout";
import Tasks from "./features/dashboard/admin-view/tasks/AddTask";
import Leaves from "./features/dashboard/admin-view/leaves/Leaves";
import AdminTasksPage from "./features/dashboard/admin-view/tasks/adminTask";
import EmpTasksPage from "./features/dashboard/employee-view/emp-tasks/EmpTasks";
import EmployeeLayout from "./features/dashboard/employee-view/EmployeeLayout";

import EmployeeLeavePage from "./features/dashboard/employee-view/leaves/EmpLeavePage";
import ApplyLeave from "./features/dashboard/employee-view/leaves/ApplyLeave";


export const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children:[
            {
                path:"admin",
                element:<AdminLayout />,
                children:[
                  {
                    index:true,
                    element:<AdminView />
                  },
                  {
                    path:"totalEmp",
                    element:<TotalEmp />
                  },
                  {
                    path:"my-leaves",
                    element:<Leaves viewType="my" />
                  },
                  {
                    path:"team-leaves",
                    element:<Leaves viewType="team"  />
                  },
                  {
                    path:"add-tasks",
                    element:<Tasks />
                  },
                  {
                    path:"tasks",
                    element:<AdminTasksPage />
                  },


                ],

            },
          {
            path:"employee",
            element:<EmployeeLayout />,
            children:[
              {
                index:true,
                element:<EmployeeView />
              },
              {
                path:"tasks",
                element:<EmpTasksPage />
              },
              {
                path:"leaves",
                element:<EmployeeLeavePage />
              },
              {
                path:"apply-leave",
                element:<ApplyLeave />
              }
            ]
          },
        ],
      },
    ],
  },
]);