import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { submissionService } from '../services/submissionService.js';
import { libraryService } from '../services/libraryService.js';

function UploadPage() {
  const { libraryId } = useParams();
  const [libraryName, setLibraryName] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'photo',
    tags: '',
    source: 'digital-archive',
    file: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (libraryId) {
      libraryService.getLibraryById(libraryId)
        .then((res) => {
          const raw = res.data;
          const libraryData = raw?.library || raw?.data?.library || raw;
          setLibraryName(libraryData?.name || 'Unknown Library');
        })
        .catch(() => setLibraryName('Unknown Library'));
    }
  }, [libraryId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!libraryId) {
      setError('Library ID is required. Please access this page from a library page.');
      return;
    }

    if (!formData.title || !formData.description) {
      setError('Title and description are required');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const submissionData = new FormData();
      submissionData.append('title', formData.title);
      submissionData.append('description', formData.description);
      submissionData.append('type', formData.type);
      submissionData.append('tags', formData.tags);
      submissionData.append('libraryId', libraryId);
      submissionData.append('source', formData.source);
      if (formData.file) {
        submissionData.append('file', formData.file);
      }

      await submissionService.createSubmission(submissionData);
      setSuccess('Submission uploaded successfully!');
      setTimeout(() => navigate('/documents'), 2000);
    } catch (err) {
      console.error("FULL ERROR:", err.response?.data || err);
      setError(err.response?.data?.message || 'Failed to upload submission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-20 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">Submit Document</h1>
        <p className="text-gray-600 mb-4">Submit your document to the digital archive</p>
        {libraryName && (
          <p className="text-sm text-gray-600 mb-6">
            Submitting to: {libraryName}
          </p>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="text-red-600">{error}</div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="text-green-600">{success}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            >
              <option value="photo">Photograph</option>
              <option value="document">Document</option>
              <option value="field_note">Field Note</option>
            </select>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Separate tags with commas"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            />
          </div>

          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
              File *
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#b8860b] text-white py-2 px-4 rounded-md hover:bg-[#d4a017] focus:outline-none focus:ring-2 focus:ring-[#b8860b] disabled:opacity-50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {loading ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default UploadPage;
