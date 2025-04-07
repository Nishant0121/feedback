import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { loginAdmin } from "../utils/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginAdmin({ email, password });
      if (res?.token) {
        localStorage.setItem("admin_token", res.token);
        navigate("/admin");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="mt-10 space-y-4">
      <h2 className="text-xl font-semibold">Admin Login</h2>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
