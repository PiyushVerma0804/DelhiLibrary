import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DocumentList from './DocumentList';
import { deleteLibrary } from '../../services/api-base.js';
import { DetailSkeleton } from '../skeleton/SkeletonComponents';

function LibraryDetailsUI({ data, loading, error, onRetry }) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  useEffect(() => {
    if (!loading && data) {
      setTimeout(() => setShowContent(true), 300);
    } else {
      setShowContent(false);
    }
  }, [loading, data]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this library? This action cannot be undone.");
    if (!confirmed) return;

    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteLibrary(data._id);
      navigate("/");
    } catch (err) {
      setDeleteError("Failed to delete library. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };
  if (loading) {
    return <DetailSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold mb-2">Error</h3>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-600">Library not found.</p>
            <Link
              to="/libraries"
              className="inline-block mt-4 px-4 py-2 bg-[#b8860b] text-white rounded hover:bg-[#d4a017] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Back to Libraries
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <div className="bg-primary-900 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <button
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document.getElementById("libraries-section")?.scrollIntoView({
                    behavior: "smooth"
                  });
                }, 100);
              }}
              className="inline-flex items-center text-primary-200 hover:text-white mb-6 transition-colors"
            >
              <span className="mr-2">-</span>
              Back to Libraries
            </button>

            <h1 className="text-2xl md:text-3xl font-display font-semibold mb-4">{data.name}</h1>
            <p className="text-xl text-gray-700">{data.description}</p>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Library Image */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">
                <img
                  src={data.imageUrl || ""}
                  alt={data.name}
                  className="w-full h-80 object-cover"
                  onError={(e) => e.target.style.display = "none"}
                />
              </div>

              {/* Documents Section */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">
                <DocumentList libraryId={data._id || data.id} />
              </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Library Info */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">
                <h3 className="text-lg font-semibold mb-4">Library Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{data.location || data.address || 'Not specified'}</p>
                  </div>
                  {data.established && (
                    <div>
                      <p className="text-sm text-gray-500">Established</p>
                      <p className="font-medium">{data.established}</p>
                    </div>
                  )}
                  {data.items && (
                    <div>
                      <p className="text-sm text-gray-500">Items</p>
                      <p className="font-medium">{data.items}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">
                <button
                  onClick={() => navigate(`/submit/${data._id}`)}
                  className="w-full bg-[#b8860b] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#d4a017] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="text-white">Submit Document</span>
                </button>
              </div>

              {isAdmin && (
                <>
                  {deleteError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-600 text-sm">{deleteError}</p>
                    </div>
                  )}
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDeleting ? "Deleting..." : "Delete Library"}
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LibraryDetailsUI;
