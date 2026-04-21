import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLibraryById, getDocuments } from "../services/api";

const TYPE_LABELS = {
  photo: "Photograph",
  document: "Document",
  field_note: "Field Note",
};

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
      <span className="text-gray-400 text-sm">{TYPE_LABELS[doc.type] || doc.type}</span>
    </div>
  );
}

function LibraryPage() {
  const { id } = useParams();
  const [library, setLibrary] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getLibraryById(id), getDocuments(id)])
      .then(([libRes, docRes]) => {
        setLibrary(libRes.data.data.library);
        setDocuments(docRes.data.data.documents);
      })
      .catch((err) => setError(err.message || "Failed to load library"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!library) return <p className="p-6 text-red-500">Library not found</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Library header */}
      <h1 className="text-2xl font-bold mb-1">{library.name}</h1>
      <p className="text-gray-600 mb-5">{library.description}</p>

      {/* Intro content */}
      {library.introContent && (
        <div className="mb-8 p-5 border-l-4 border-gray-400 bg-gray-50 rounded-r text-sm text-gray-700 leading-relaxed">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
            About this Collection
          </p>
          {library.introContent}
        </div>
      )}

      {/* Documents section */}
      <h2 className="text-lg font-semibold mb-4">
        Documents
        {documents.length > 0 && (
          <span className="ml-2 text-sm font-normal text-gray-400">
            ({documents.length})
          </span>
        )}
      </h2>

      {documents.length === 0 ? (
        <p className="text-gray-500">No documents yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {documents.map((doc) => (
            <div
              key={doc._id}
              onClick={() => window.open(doc.fileUrl, "_blank")}
              className="border rounded bg-white overflow-hidden cursor-pointer hover:shadow-md transition-shadow flex flex-col"
            >
              {/* TOP: preview */}
              <DocPreview doc={doc} />

              {/* MIDDLE: title + source */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm leading-snug">{doc.title}</h3>
                    <span className="shrink-0 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                      {TYPE_LABELS[doc.type] || doc.type}
                    </span>
                  </div>

                  {doc.source && (
                    <p className="text-xs text-gray-500 mb-3">
                      <span className="font-medium text-gray-600">Source:</span> {doc.source}
                    </p>
                  )}
                </div>

                {/* BOTTOM: year, language, tags */}
                <div className="mt-auto">
                  {(doc.year || doc.language) && (
                    <div className="flex gap-3 text-xs text-gray-500 mb-2">
                      {doc.year && <span>{doc.year}</span>}
                      {doc.language && <span>{doc.language}</span>}
                    </div>
                  )}

                  {doc.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map((tag) => (
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

export default LibraryPage;
