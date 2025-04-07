import { useEffect, useState } from "react";
import { getFeedbacks } from "../utils/api";
import FeedbackCard from "../components/FeedbackCard";

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFeedbacks();
      setFeedbacks(data);
    };
    fetchData();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">All Feedbacks</h2>
      <div className="space-y-4">
        {feedbacks.map((f) => (
          <FeedbackCard key={f._id} feedback={f} />
        ))}
      </div>
    </div>
  );
}
