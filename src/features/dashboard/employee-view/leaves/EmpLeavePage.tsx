import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import type { MainLayoutContext } from "../EmployeeLayout";

// ✅ Your cleaned dataset (shortened sample, you can paste full)
function EmployeeLeavePage() {
    const {allDashboardData, user} = useOutletContext<MainLayoutContext>()

    const leavesData = allDashboardData?.leaves

  // ✅ filter + sort (latest first)
  const userLeaves = useMemo(() => {
    const leave = leavesData?.filter((leave) => Number(leave.userId) === Number(user?.id))
      .sort((a, b) => +new Date(b.fromDate) - +new Date(a.fromDate));
      return leave
  }, []);

  const getStatusStyle = (status:string | undefined) => {
    if (status === "approved") return { color: "green" };
    if (status === "rejected") return { color: "red" };
    return { color: "orange" };
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>My Leaves</h2>

      {userLeaves?.length === 0 ? (
        <p>No leaves found</p>
      ) : (
        userLeaves?.map((leave) => (
          <div
            key={leave.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "12px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ textTransform: "capitalize" }}>
                {leave.type}
              </strong>
              <span style={getStatusStyle(leave.status)}>
                {leave.status}
              </span>
            </div>

            <p style={{ margin: "5px 0" }}>
              {leave.fromDate} → {leave.toDate}
            </p>

            <p style={{ fontSize: "14px", color: "#555" }}>
              {leave.reason}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
export default EmployeeLeavePage