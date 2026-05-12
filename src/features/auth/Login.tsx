import Input from "../../components/ui/Input";
import { useState } from "react";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { useAuth } from "../../hooks/useAuth";
import type { UserType } from "../dashboard/dashboard.types";
import { getUsers } from "../dashboard/admin-view/employees/employees.api";
import { toast } from "sonner";
import type { AxiosError } from "axios";

type ErrorResponse = {
  message: string;
};

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  // login mutation
  const loginMutation = useMutation({
    mutationFn: async () => {
      const users: UserType[] = await getUsers();

      const user = users.find(
        (u) =>
          (u.name === usernameOrEmail ||
            u.email === usernameOrEmail) &&
          u.password === password
      );

      if (!user) {
        throw new Error("Invalid credentials");
      }

      return user;
    },

    onSuccess: (user) => {
      login(user);
      navigate("/dashboard");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      console.log("tioastr is not working")
  toast.error(
    error.response?.data?.message || "Something went wrong"
  );
},
  });

  const handleLogIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (!usernameOrEmail || !password) return;

    loginMutation.mutate();
  };

  return (
    <section className="login-section relative flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogIn}
        className="flex flex-col items-center p-20 gap-5 border-emerald-600 border-2 rounded-2xl"
      >
        {/* Username or Email */}
        <Input
          type="text"
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          value={usernameOrEmail}
          name="Username or Email"
          isFocused={true}
        />

        {/* Password */}
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
        />

        {/* Login Button */}
        <Button
          name="loginbtn"
          disabled={loginMutation.isPending}
          className={`bg-emerald-600 rounded-2xl w-40 disabled:opacity-50 disabled:cursor-not-allowed`}
          label={
            loginMutation.isPending ? (
              <span className="flex justify-center items-center">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              </span>
            ) : (
              "Log In"
            )
          }
        />
      </form>
       <div className="absolute top-6 right-6 p-5 bg-slate-800/40 border border-slate-700/50 rounded-xl backdrop-blur-sm shadow-xl max-w-md">
        <h4 className="mb-4 text-sky-400 font-semibold flex items-center gap-2 text-xl">
          <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse"></span>
          Demo Credentials
        </h4>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <p className="text-slate-100 font-medium text-sm">Admin View</p>
            <div className="text-[16px] text-slate-400 flex flex-col gap-1">
              <p>Email: <code className="text-sky-300 bg-slate-900/50 px-1 py-0.5 rounded">hr.admin@mail.com</code></p>
              <p>Pass: <code className="text-sky-300 bg-slate-900/50 px-1 py-0.5 rounded">123</code></p>
            </div>
          </div>

          <div className="space-y-1 border-t border-slate-700/50 pt-3">
            <p className="text-slate-100 font-medium text-xl">Employee View</p>
            <div className="text-[16px] text-slate-400 flex flex-col gap-1">
              <p>Email: <code className="text-sky-300 bg-slate-900/50 px-1 py-0.5 rounded">sneha@mail.com</code></p>
              <p>Pass: <code className="text-sky-300 bg-slate-900/50 px-1 py-0.5 rounded">123</code></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login; 