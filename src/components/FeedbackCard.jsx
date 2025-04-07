export default function FeedbackCard({ feedback }) {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-white dark:bg-zinc-900">
      <h4 className="font-bold text-lg">
        {feedback.name}{" "}
        <span className="text-sm text-gray-500">({feedback.email})</span>
      </h4>
      <p className="text-sm mt-2">{feedback.message}</p>
      <p className="text-xs text-right text-gray-400 mt-2">
        {new Date(feedback.timestamp).toLocaleString()}
      </p>
    </div>
  );
}
