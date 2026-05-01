import { useState, useEffect } from 'react';
import { documentService } from '../../services/documentService';

function DocumentList({ libraryId }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const getFileType = (url) => {
    if (!url) return 'other';
    const extension = url.split('.').pop().toLowerCase();
    const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    if (imageExtensions.includes(extension)) return 'image';
    if (extension === 'pdf') return 'pdf';
    return 'other';
  };

  const handleDocumentClick = (document) => {
    const fileType = getFileType(document.fileUrl);
    
    if (fileType === 'image') {
      setSelectedFile(document.fileUrl);
      setIsModalOpen(true);
    } else if (fileType === 'pdf') {
      setSelectedFile(document.fileUrl);
      setIsModalOpen(true);
    } else {
      window.open(document.fileUrl, "_blank");
    }
  };

  useEffect(() => {
    if (!libraryId) return;

    const fetchDocuments = async () => {
      try {
        setLoading(true);

        const res = await documentService.getDocuments(`libraryId=${libraryId}`);

        const raw = res.data;

        const docs =
          raw?.data?.documents ||
          raw?.documents ||
          raw?.data ||
          raw;

        setDocuments(Array.isArray(docs) ? docs : []);

      } catch (err) {
        console.error(err);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [libraryId]);

  if (loading) {
    return (
      <p>Loading documents...</p>
    );
  }

  if (documents.length === 0) {
    return (
      <p>No documents found</p>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Documents</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((document) => (
          <div
            key={document._id || document.id}
            onClick={() => handleDocumentClick(document)}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Document Header */}
            <div className="mb-3">
              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {document.title || 'Untitled Document'}
              </h4>
              
              {/* Document Type */}
              {document.type && (
                <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                  {document.type}
                </span>
              )}
            </div>

            {/* Document Tags */}
            {document.tags && document.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {document.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {document.tags.length > 3 && (
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded">
                    +{document.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Document Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                {document.year && `Year: ${document.year}`}
              </span>
              
              <span className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                View Document
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {isModalOpen && selectedFile && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-5xl w-full mx-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>
            {getFileType(selectedFile) === 'pdf' ? (
              <iframe
                src={selectedFile}
                className="w-full h-[80vh] border rounded"
                title="PDF Viewer"
              />
            ) : (
              <img
                src={selectedFile}
                alt="Document preview"
                className="w-full h-auto max-h-[80vh] object-contain rounded"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentList;
