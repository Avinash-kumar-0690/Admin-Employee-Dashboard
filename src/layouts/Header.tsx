import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = (): void => {
    logOut();
    navigate("/auth/login");
  };

  return (
    <section className="bg-[#0f172a] border-b border-gray-800 flex mb-5  justify-between px-6 py-4 items-center">
      {/* USER */}
      <div className="flex items-center gap-4">
        <img
          src={user?.avatar}
          loading="lazy"
          width="50"
          height="50"
          className="rounded-full border border-gray-700"
          alt="Avatar"
        />

        <div>
          <p className="text-sm text-gray-400">Welcome back</p>
          <h1 className="text-lg font-semibold text-gray-200">
            {user?.name}
          </h1>
        </div>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogOut}
        className="bg-red-600 hover:bg-red-700 transition-all text-sm px-4 py-2 rounded-xl text-white"
      >
        Logout
      </button>
    </section>
  );
};

export default Header;
