import { Outlet, useOutletContext } from "react-router-dom";
import type { DashboardDataType, UserType } from "../dashboard.types";

export interface MainLayoutContext {
  allDashboardData?: DashboardDataType;
  user?: UserType;
}

const EmployeeLayout = () => {
  const context = useOutletContext<MainLayoutContext>();

  return (
    <section className="min-h-screen bg-[#0f172a] text-gray-200">
      <main className="p-4">
        <Outlet context={context} />
      </main>
    </section>
  );
};

export default EmployeeLayout;