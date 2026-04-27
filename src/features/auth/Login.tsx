import Input from "../../components/ui/Input";
import { useState } from "react";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../../hooks/useAuth";
import type { UserType } from "../dashboard/dashboard.types";
import { getUsers } from "../dashboard/admin-view/employees/employees.api";


const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const { data: users } = useQuery<UserType[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const handleLogIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (!usernameOrEmail || !password) {
      alert("Enter credentials");
      return;
    }

    if (!users) {
      alert("Users not loaded yet");
      return;
    }

    const user = users.find(
      (u) =>
        (u.name === usernameOrEmail || u.email === usernameOrEmail) &&
        u.password === password
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }
    if(user) {
      login(user);
      navigate("/dashboard");
    }
  };


  return (
    <section className="login-section flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogIn}
        className="flex flex-col items-center p-20 gap-5 border-emerald-600 border-2 rounded-2xl"
      >
        <Input
          type="text"
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          value={usernameOrEmail}
          name="Username or Email"
          isFocused={true}
        />

        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
        />

        <Button
          name="loginbtn"
          label="Log In"
          className="bg-emerald-600 rounded-2xl w-40"
        />
      </form>
    </section>
  );
};

export default Login;