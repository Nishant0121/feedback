import FeedbackForm from "../components/FeedbackForm";
export default function Home() {
  return (
    <div className="mt-10">
      <div>
        <h1 className="text-3xl font-bold mb-4">Submit Feedback</h1>
      </div>

      <FeedbackForm />
    </div>
  );
}
