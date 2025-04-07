import { Outlet } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import Watermark from "./components/Watermark";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4">
      <div className="w-full max-w-2xl">
        <ThemeToggle />
        <Outlet />
        <Watermark />
      </div>
    </div>
  );
}
