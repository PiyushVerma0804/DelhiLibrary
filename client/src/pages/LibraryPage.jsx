import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getLibraryById, getDocuments } from "../services/api";
import { getTypeLabel, normalizeTags } from "../utils/dataHelpers";

function DocPreview({ doc }) {
  return (
    <a 
      href={doc.fileUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block w-full h-44"
    >
      {doc.type === "photo" ? (
        <img
          src={doc.fileUrl}
          alt={doc.title}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div className="w-full h-44 flex items-center justify-center bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors">
          <div className="text-center">
            <div className="text-2xl mb-2">
              {doc.type === "document" && "📄"}
              {doc.type === "field_note" && "📝"}
            </div>
            <div className="text-gray-600 text-sm font-medium">
              {doc.type === "document" && "PDF Document"}
              {doc.type === "field_note" && "Field Note"}
            </div>
          </div>
        </div>
      )}
    </a>
  );
}

function LibraryPage() {
  const { id } = useParams();
  const [library, setLibrary] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    Promise.all([getLibraryById(id), getDocuments(`libraryId=${id}`)])
      .then(([libRes, docRes]) => {
        setLibrary(libRes.data.data.library);
        setDocuments(docRes.data.data.documents);
      })
      .catch(() => setError("Failed to load library. Please try again."))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return (
    <div className="p-8 text-center text-gray-500">
      <p>Loading archive entries...</p>
    </div>
  );
  if (error) return (
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
  if (!library) return (
    <div className="p-8 max-w-md mx-auto text-center">
      <div className="border border-gray-200 bg-gray-50 rounded-lg p-6">
        <p className="text-gray-600 text-sm">Library not found.</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Context text */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          This archive presents curated materials including photographs, documents, and field notes related to this library.
        </p>
      </div>

      {/* INTRO SECTION */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900">About this Library</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">{library.name}</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">{library.description}</p>
          
          {library.introContent && (
            <div className="mt-4 p-4 bg-gray-50 rounded border-l-4 border-blue-500">
              <p className="text-sm font-medium text-gray-800 mb-2">Context & Background</p>
              <p className="text-sm text-gray-700 leading-relaxed">{library.introContent}</p>
            </div>
          )}
        </div>
      </div>

      {/* ARCHIVE SECTION */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Archive Entries</h2>
        
        {documents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-medium">No archival entries available for this library yet</p>
            <p className="text-gray-500 text-sm mt-2">Materials will appear here once they are submitted and approved.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {documents.map((doc) => (
            <div
              key={doc._id}
              className="border rounded bg-white overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-200 flex flex-col"
            >
              {/* TOP: preview */}
              <DocPreview doc={doc} />

              {/* MIDDLE: title + source */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm leading-snug">{doc.title}</h3>
                    <span className="shrink-0 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                      {doc.type === 'photo' && '📸 Photograph'}
                      {doc.type === 'document' && '📄 Document'}
                      {doc.type === 'field_note' && '📝 Field Note'}
                    </span>
                  </div>

                  {doc.source && (
                    <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded">
                      <p className="text-xs font-semibold text-amber-800 mb-1">Source / Reference</p>
                      <p className="text-xs text-amber-700">{doc.source}</p>
                    </div>
                  )}
                </div>

                {/* METADATA: year, language */}
                <div className="mt-auto">
                  {(doc.year || doc.language) && (
                    <div className="flex gap-3 text-xs text-gray-600 mb-2">
                      {doc.year && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          📅 {doc.year}
                        </span>
                      )}
                      {doc.language && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          🌐 {doc.language}
                        </span>
                      )}
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
    </div>
  );
}

export default LibraryPage;
