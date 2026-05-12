import { Outlet, useOutletContext,  } from "react-router-dom";
import type { DashboardDataType, UserType } from "../dashboard.types";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

export interface MainLayoutContext {
  allDashboardData?: DashboardDataType;
  user?: UserType;
  data?:DashboardDataType | undefined;
}

const AdminLayout = () => {
// change the document title
useDocumentTitle("Admin")

  // get all api data using outlet context 
  const context = useOutletContext<MainLayoutContext>();

  return (
    <section className="min-h-screen bg-[#0f172a] text-gray-200">
      <main className="p-4">
        <Outlet context={context} />
      </main>
    </section>
  );
};

export default AdminLayout;