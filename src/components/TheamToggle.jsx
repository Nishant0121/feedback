import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="text-right">
      <Button variant="ghost" onClick={() => setDark(!dark)}>
        {dark ? "🌙 Dark" : "☀️ Light"}
      </Button>
    </div>
  );
}
