import { useState, useEffect } from "react";
import { getAllSubmissions, updateSubmissionStatus } from "../services/api";

const TYPE_LABELS = {
  photo: "Photograph",
  document: "Document",
  field_note: "Field Note",
};

function AdminPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // id of submission being actioned

  const fetchSubmissions = () => {
    setLoading(true);
    getAllSubmissions()
      .then((res) => setSubmissions(res.data.data.submissions))
      .catch((err) => {
        const msg = err.response?.data?.message || err.message || "Failed to load submissions";
        setError(msg);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleAction = async (id, status) => {
    setActionLoading(id);
    try {
      await updateSubmissionStatus(id, status);
      // Remove from list after action
      setSubmissions((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const isLoggedIn = !!localStorage.getItem("token");

  if (!isLoggedIn) {
    return (
      <div className="p-6">
        <p className="text-gray-600">
          You must be logged in as admin to view this page.{" "}
          <a href="/login" className="underline text-gray-800">Login</a>
        </p>
      </div>
    );
  }

  if (loading) return <p className="p-6 text-gray-500">Loading submissions...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Admin Panel</h1>
      <p className="text-gray-500 text-sm mb-6">Review and approve pending submissions.</p>

      {submissions.length === 0 ? (
        <p className="text-gray-500">No pending submissions.</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub._id} className="border rounded bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-sm">{sub.title}</h2>
                  <p className="text-xs text-gray-500 mt-0.5 mb-2">{sub.description}</p>

                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    <span>
                      <span className="font-medium text-gray-600">Library:</span>{" "}
                      {sub.libraryId?.name || "—"}
                    </span>
                    <span>
                      <span className="font-medium text-gray-600">Type:</span>{" "}
                      {TYPE_LABELS[sub.type] || sub.type}
                    </span>
                    <span>
                      <span className="font-medium text-gray-600">Source:</span> {sub.source}
                    </span>
                    {sub.year && <span><span className="font-medium text-gray-600">Year:</span> {sub.year}</span>}
                    {sub.language && <span><span className="font-medium text-gray-600">Lang:</span> {sub.language}</span>}
                    {sub.contributorId && (
                      <span>
                        <span className="font-medium text-gray-600">By:</span>{" "}
                        {sub.contributorId.name} ({sub.contributorId.email})
                      </span>
                    )}
                  </div>

                  {sub.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {sub.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {sub.fileUrl && (
                    <a
                      href={sub.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-2 text-xs text-blue-600 underline"
                    >
                      View File
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => handleAction(sub._id, "approved")}
                    disabled={actionLoading === sub._id}
                    className="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(sub._id, "rejected")}
                    disabled={actionLoading === sub._id}
                    className="px-3 py-1.5 bg-red-500 text-white text-xs rounded hover:bg-red-600 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
