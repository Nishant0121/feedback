import { Outlet, useNavigate } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import Watermark from "./components/Watermark";
import { Clipboard, ClipboardList, Home } from "lucide-react";

export default function App() {
  const navigate = useNavigate();

  const handleViewAssignments = () => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      navigate("/admin");
    } else {
      navigate("/admin-login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between w-full items-center">
          <ThemeToggle />
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition md:hidden"
          >
            <Home className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/")}
            className="hidden md:flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <button
            onClick={handleViewAssignments}
            className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            <Clipboard className="w-5 h-5" />
            View Feedbacks
          </button>
        </div>

        <Outlet />
        <Watermark />
      </div>
    </div>
  );
}
