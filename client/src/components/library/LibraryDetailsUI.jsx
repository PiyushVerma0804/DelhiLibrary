import { Link, useNavigate } from 'react-router-dom';
import DocumentList from './DocumentList';

function LibraryDetailsUI({ data, loading, error, onRetry }) {
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading library details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-600">Library not found.</p>
            <Link
              to="/libraries"
              className="inline-block mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
            >
              Back to Libraries
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
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
                  onClick={() => {
                    if (!data?._id) {
                      console.error("Library ID missing");
                      return;
                    }
                    navigate(`/submit/${data._id}`);
                  }}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-full transition"
                >
                  Submit Document
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LibraryDetailsUI;
