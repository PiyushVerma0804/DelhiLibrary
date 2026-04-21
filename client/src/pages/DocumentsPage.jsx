import { useState, useEffect, useCallback } from "react";
import { getDocuments, getLibraries } from "../services/api";
import { getTypeLabel, normalizeTags, TYPE_LABELS } from "../utils/dataHelpers";
import { useDebounce } from "../hooks/useDebounce";

const TYPE_OPTIONS = [
  { value: "", label: "All Types" },
  { value: "photo", label: "Photograph" },
  { value: "document", label: "Document" },
  { value: "field_note", label: "Field Note" },
];

function DocPreview({ doc }) {
  if (doc.type === "photo") {
    return (
      <img
        src={doc.fileUrl}
        alt={doc.title}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.parentElement.innerHTML =
            '<div class="w-full h-44 flex items-center justify-center bg-gray-100"><span class="text-gray-400 text-sm">Image not available</span></div>';
        }}
        className="w-full h-44 object-cover"
      />
    );
  }
  return (
    <div className="w-full h-44 flex items-center justify-center bg-gray-50 border-b">
      <span className="text-gray-400 text-sm">{getTypeLabel(doc.type) || doc.type}</span>
    </div>
  );
}

function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    libraryId: "",
  });

  // Debounce search to avoid excessive API calls
  const debouncedSearch = useDebounce(filters.search, 300);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    
    const queryParams = new URLSearchParams();
    if (debouncedSearch) queryParams.append("search", debouncedSearch);
    if (filters.type) queryParams.append("type", filters.type);
    if (filters.libraryId) queryParams.append("libraryId", filters.libraryId);
    
    getDocuments(queryParams.toString())
      .then((res) => {
        setDocuments(res.data.data.documents);
      })
      .catch(() => setError("Failed to load documents. Please try again."))
      .finally(() => setLoading(false));
  }, [debouncedSearch, filters.type, filters.libraryId]);

  const fetchLibraries = useCallback(() => {
    getLibraries()
      .then((res) => setLibraries(res.data.data.libraries))
      .catch(() => console.error("Failed to load libraries"));
  }, []);

  useEffect(() => {
    fetchLibraries();
  }, [fetchLibraries]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: "", type: "", libraryId: "" });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>Loading documents…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-md mx-auto text-center">
        <div className="border border-red-200 bg-red-50 rounded-lg p-6">
          <p className="text-red-700 font-medium mb-1">⚠ Error</p>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const hasActiveFilters = filters.search || filters.type || filters.libraryId;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Page header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Documents</h1>
        <p className="text-gray-500 text-sm">
          Browse and search through all archived documents.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              placeholder="Search by title..."
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Type filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
            >
              {TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Library filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Library
            </label>
            <select
              value={filters.libraryId}
              onChange={(e) => handleFilterChange("libraryId", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
            >
              <option value="">All Libraries</option>
              {libraries.map((lib) => (
                <option key={lib._id} value={lib._id}>
                  {lib.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear filters button */}
        {hasActiveFilters && (
          <div className="mt-3">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        {documents.length} document{documents.length !== 1 ? "s" : ""} found
      </div>

      {/* Documents grid */}
      {documents.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg">
          <p className="text-2xl mb-2">📚</p>
          <p className="text-gray-700 font-medium text-lg mb-1">
            {hasActiveFilters ? "No documents match your filters" : "No documents available yet"}
          </p>
          <p className="text-gray-400 text-sm">
            {hasActiveFilters ? "Try adjusting your search criteria" : "Check back later for new content"}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-3 px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {documents.map((doc) => (
            <div
              key={doc._id}
              onClick={() => window.open(doc.fileUrl, "_blank")}
              className="border rounded bg-white overflow-hidden cursor-pointer hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Preview */}
              <DocPreview doc={doc} />

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm leading-snug">{doc.title}</h3>
                    <span className="shrink-0 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                      {getTypeLabel(doc.type)}
                    </span>
                  </div>

                  {doc.source && (
                    <p className="text-xs text-gray-500 mb-3">
                      <span className="font-medium text-gray-600">Source:</span> {doc.source}
                    </p>
                  )}
                </div>

                {/* Metadata */}
                <div className="mt-auto">
                  {(doc.year || doc.language || doc.libraryId?.name) && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-2">
                      {doc.year && <span>{doc.year}</span>}
                      {doc.language && <span>{doc.language}</span>}
                      {doc.libraryId?.name && <span>{doc.libraryId.name}</span>}
                    </div>
                  )}

                  {doc.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {normalizeTags(doc.tags).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DocumentsPage;
