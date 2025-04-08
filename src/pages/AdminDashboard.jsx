import { useEffect, useState } from "react";
import { getFeedbacks } from "../utils/api";
import FeedbackCard from "../components/FeedbackCard";
import { useTheme } from "../lib/theme-provider";

export default function AdminDashboard() {
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [sortedFeedbacks, setSortedFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbacksPerPage, setFeedbacksPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("newest");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFeedbacks(); // Fetch all feedbacks once
      setAllFeedbacks(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let sorted = [...allFeedbacks];
    switch (sortBy) {
      case "oldest":
        sorted.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default: // "newest"
        sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
    }
    setSortedFeedbacks(sorted);
    setCurrentPage(1); // reset to first page when sorting changes
  }, [allFeedbacks, sortBy]);

  // Pagination logic
  const indexOfLast = currentPage * feedbacksPerPage;
  const indexOfFirst = indexOfLast - feedbacksPerPage;
  const currentFeedbacks = sortedFeedbacks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedFeedbacks.length / feedbacksPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFeedbacksPerPageChange = (e) => {
    setFeedbacksPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen mt-10">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold mb-4">All Feedbacks</h2>

        {/* Sorting + Per-page Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div>
            <label htmlFor="sortBy">Sort by:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={handleSortChange}
              className={`ml-2 border rounded px-2 py-1 ${
                theme == "dark" ? " bg-black text-white" : ""
              }`}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name-asc">Name (A–Z)</option>
              <option value="name-desc">Name (Z–A)</option>
            </select>
          </div>

          <div>
            <label htmlFor="feedbacksPerPage">Feedbacks per page:</label>
            <select
              id="feedbacksPerPage"
              value={feedbacksPerPage}
              onChange={handleFeedbacksPerPageChange}
              className={`ml-2 border rounded px-2 py-1 ${
                theme == "dark" ? "bg-black text-white" : ""
              }`}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>

        {/* Feedback Cards */}
        <div className="space-y-4">
          {currentFeedbacks.map((f) => (
            <FeedbackCard key={f._id} feedback={f} />
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 border-t pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "hover:bg-gray-100 dark:hover:bg-zinc-800"
              }`}
            >
              Prev
            </button>
            <span className="px-2">
              Page <strong>{currentPage}</strong> of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "hover:bg-gray-100 dark:hover:bg-zinc-800"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
