// import React, { useState } from "react";

// type Role = "admin" | "employee";

// type User = {
//   id: number;
//   name: string;
//   role: Role;
// };

// type Task = {
//   id: number;
//   title: string;
//   completed: boolean;
//   assignedTo: number;
//   createdBy: number;
// };

// export default function App() {
//   const [role, setRole] = useState<Role | null>(null);

//   // USERS (fake DB)
//   const users: User[] = [
//     { id: 1, name: "Admin", role: "admin" },
//     { id: 2, name: "John", role: "employee" },
//     { id: 3, name: "Sara", role: "employee" },
//   ];

//   const [currentUser, setCurrentUser] = useState<User | null>(null);

//   // TASKS
//   const [tasks, setTasks] = useState<Task[]>([
//     {
//       id: 1,
//       title: "Finish report",
//       completed: false,
//       assignedTo: 2,
//       createdBy: 1,
//     },
//     {
//       id: 2,
//       title: "Fix bugs",
//       completed: true,
//       assignedTo: 3,
//       createdBy: 1,
//     },
//   ]);

//   const [newTask, setNewTask] = useState("");
//   const [assignedUserId, setAssignedUserId] = useState(2);
//   const [editId, setEditId] = useState<number | null>(null);
//   const [editText, setEditText] = useState("");

//   // LOGIN
//   const login = (selectedRole: Role) => {
//     setRole(selectedRole);

//     if (selectedRole === "admin") {
//       setCurrentUser(users.find(u => u.role === "admin")!);
//     } else {
//       setCurrentUser(users.find(u => u.id === 2)!); // simulate employee
//     }
//   };

//   // CREATE TASK (ADMIN ONLY)
//   const addTask = () => {
//     if (!newTask.trim() || !currentUser) return;

//     const task: Task = {
//       id: Date.now(),
//       title: newTask,
//       completed: false,
//       assignedTo: assignedUserId,
//       createdBy: currentUser.id,
//     };

//     setTasks([task, ...tasks]);
//     setNewTask("");
//   };

//   // DELETE
//   const deleteTask = (id: number) => {
//     setTasks(tasks.filter(t => t.id !== id));
//   };

//   // TOGGLE COMPLETE
//   const toggleTask = (id: number) => {
//     setTasks(tasks.map(t =>
//       t.id === id ? { ...t, completed: !t.completed } : t
//     ));
//   };

//   // EDIT
//   const startEdit = (task: Task) => {
//     setEditId(task.id);
//     setEditText(task.title);
//   };

//   const updateTask = () => {
//     setTasks(tasks.map(t =>
//       t.id === editId ? { ...t, title: editText } : t
//     ));
//     setEditId(null);
//     setEditText("");
//   };

//   // ROLE FILTER
//   const visibleTasks =
//     role === "admin"
//       ? tasks
//       : tasks.filter(t => t.assignedTo === currentUser?.id);

//   // LOGIN SCREEN
//   if (!role) {
//     return (
//       <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white gap-4">
//         <h1 className="text-3xl font-bold">Login</h1>
//         <div className="flex gap-4">
//           <button
//             onClick={() => login("admin")}
//             className="px-6 py-2 bg-blue-600 rounded"
//           >
//             Admin
//           </button>
//           <button
//             onClick={() => login("employee")}
//             className="px-6 py-2 bg-green-600 rounded"
//           >
//             Employee
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
      
//       {/* NAVBAR */}
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">
//           {role} Dashboard ({currentUser?.name})
//         </h1>
//         <button
//           onClick={() => {
//             setRole(null);
//             setCurrentUser(null);
//           }}
//           className="bg-red-500 text-white px-4 py-1 rounded"
//         >
//           Logout
//         </button>
//       </div>

//       {/* ADMIN: CREATE TASK */}
//       {role === "admin" && (
//         <div className="flex gap-2 mb-4">
//           <input
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="Task title..."
//             className="p-2 border rounded"
//           />

//           {/* ASSIGN USER */}
//           <select
//             onChange={(e) => setAssignedUserId(Number(e.target.value))}
//             className="border p-2 rounded"
//           >
//             {users
//               .filter(u => u.role === "employee")
//               .map(u => (
//                 <option key={u.id} value={u.id}>
//                   {u.name}
//                 </option>
//               ))}
//           </select>

//           <button
//             onClick={addTask}
//             className="bg-blue-600 text-white px-4 rounded"
//           >
//             Add
//           </button>
//         </div>
//       )}

//       {/* TASK LIST */}
//       <div className="bg-white rounded-xl shadow p-4">
//         {visibleTasks.map(task => {
//           const assignedUser = users.find(u => u.id === task.assignedTo);
//           const creator = users.find(u => u.id === task.createdBy);

//           return (
//             <div
//               key={task.id}
//               className="border-b py-3 flex flex-col gap-1"
//             >
//               {editId === task.id ? (
//                 <div className="flex gap-2">
//                   <input
//                     value={editText}
//                     onChange={(e) => setEditText(e.target.value)}
//                     className="border p-1"
//                   />
//                   <button
//                     onClick={updateTask}
//                     className="text-green-600"
//                   >
//                     Save
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <div className="flex justify-between">
//                     <span
//                       onClick={() => toggleTask(task.id)}
//                       className={`cursor-pointer ${
//                         task.completed
//                           ? "line-through text-gray-400"
//                           : ""
//                       }`}
//                     >
//                       {task.title}
//                     </span>

//                     <div className="flex gap-3">
//                       {role === "admin" && (
//                         <>
//                           <button
//                             onClick={() => startEdit(task)}
//                             className="text-blue-500"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => deleteTask(task.id)}
//                             className="text-red-500"
//                           >
//                             Delete
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </div>

//                   {/* THIS SOLVES YOUR CONFUSION */}
//                   <small className="text-gray-500">
//                     Assigned to: {assignedUser?.name} | Created by:{" "}
//                     {creator?.name}
//                   </small>
//                 </>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

// Register chart components
ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // ✅ STATIC DATA (same file)
  const tasks = [
    { id: 1, title: "Task 1", status: "completed" },
    { id: 2, title: "Task 2", status: "pending" },
    { id: 3, title: "Task 3", status: "completed" },
    { id: 4, title: "Task 4", status: "pending" },
    { id: 5, title: "Task 5", status: "completed" }
  ];

  // ✅ PROCESS DATA (this is where most people fail)
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status === "pending").length;

  // ✅ BAR CHART DATA
  const barData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks Overview",
        data: [completed, pending],
        backgroundColor: ["green", "red"]
      }
    ]
  };

  // ✅ PIE CHART DATA
  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ["green", "red"]
      }
    ]
  };

  return (
    <div style={{ width: "600px", margin: "50px auto" }}>
      <h2>Task Dashboard</h2>

      <div style={{ marginBottom: "40px" }}>
        <h3>Bar Chart</h3>
        <Bar data={barData} />
      </div>

      <div>
        <h3>Pie Chart</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default Dashboard;