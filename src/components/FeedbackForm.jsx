import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { submitFeedback } from "../utils/api";

export default function FeedbackForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await submitFeedback(form);
    setLoading(false);
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="space-y-4">
      <Input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
      />
      <Input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <Textarea
        name="message"
        placeholder="Your feedback..."
        value={form.message}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
      {success && <p className="text-green-500">Thanks for your feedback!</p>}
    </div>
  );
}
