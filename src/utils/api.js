const BASE_URL = "/.netlify/functions";

export const submitFeedback = async (data) => {
  const res = await fetch(`${BASE_URL}/submit-feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getFeedbacks = async () => {
  const token = localStorage.getItem("admin_token");
  const res = await fetch(`${BASE_URL}/get-feedbacks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const loginAdmin = async (data) => {
  const res = await fetch(`${BASE_URL}/admin-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: data.email, password: data.password }),
  });
  return res.json();
};
