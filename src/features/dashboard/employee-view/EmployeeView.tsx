import { useOutletContext } from "react-router-dom";
import type {  DashboardDataType,  UserType } from "../dashboard.types"
import { empDashboardData } from "./employeeView.api";
import { useQuery } from "@tanstack/react-query";
import { getEventsData } from "../dahsboard.api";
import Statelist from "../Statelist";
import TaskSection from "../TaskSection";
import RecentActivity from "../RecentActivity";
import TaskChart from "../TaskChart";




export interface EmployeeViewProps {
  allDashboardData?: DashboardDataType | undefined;
  user?: UserType;

}
const EmployeeView = () => {
  const { allDashboardData, user } = useOutletContext<EmployeeViewProps>()
  const employeeDashboardData = empDashboardData({ allDashboardData, user });

  const tasks = employeeDashboardData?.EmpTasks
 

  const events = useQuery({
    queryKey: ["events"],
    queryFn: () => getEventsData(),
  });

  
  return (
    <>
      <section className="bg-[#0f172a] min-h-screen  text-gray-200">
        <Statelist data={employeeDashboardData} user={user} />

        <section className="grid grid-cols-[65%_30%] gap-6 px-4 py-4 ">
          <div>
            {/* Tasks Section  */}
            <TaskSection data={employeeDashboardData} user={user} />



            {/* ACTIVITIES */}
            <RecentActivity data={employeeDashboardData} />
          </div>

          <aside className=" flex flex-col gap-6 p-4 border-l border-gray-800">

            {/* EVENTS SECTION */}
            <div className="bg-[#1e293b] rounded-xl p-5 shadow-sm border border-gray-800">
              <h2 className="text-md font-bold text-white mb-4 uppercase tracking-wider">
                Upcoming Events
              </h2>

              <div className="flex flex-col gap-3">
                {events?.data?.length ? (
                  events.data.map((e) => (
                    <div
                      key={e.id}
                      className="flex items-center gap-4 p-3 rounded-lg bg-[#0f172a] hover:bg-[#334155] transition-colors border border-gray-800"
                    >
                      {/* COMPACT DATE BOX */}
                      <div className="flex flex-col items-center justify-center min-w-11.25 py-1 bg-[#1e293b] rounded border border-gray-700">
                        <span className="text-[10px] font-bold text-blue-400 uppercase">
                          {new Date(e.date ? e.date : "").toLocaleString('en-US', { month: 'short' })}
                        </span>
                        <span className="text-lg font-bold text-white">
                          {new Date(e.date ? e.date : "").getDate()}
                        </span>
                      </div>

                      {/* EVENT INFO */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-200 truncate">
                          {e.title}
                        </h3>
                        <p className="text-[11px] text-gray-500 font-medium">
                          {e.date}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-600 text-center py-4">No events scheduled</p>
                )}
              </div>
            </div>

            {/* LEAVE CHART SECTION */}
            <div className="bg-[#1e293b] rounded-xl p-5 shadow-sm border border-gray-800">
              <h2 className="text-md font-bold text-white mb-4 uppercase tracking-wider">
                Leave Analytics
              </h2>





              <div className="h-48 w-full bg-[#0f172a] rounded-lg p-3 border border-gray-800">
                {tasks?
               <TaskChart tasks={tasks} />: null
              }
              </div>
              
            </div>

          </aside>
        </section>
      </section>
    </>
  )
}

export default EmployeeView
