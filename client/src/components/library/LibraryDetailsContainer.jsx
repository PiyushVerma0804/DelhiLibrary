import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { libraryService } from '../../services/libraryService';
import LibraryDetailsUI from './LibraryDetailsUI';

function LibraryDetailsContainer() {
  const { id } = useParams();
  const [library, setLibrary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLibrary = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await libraryService.getLibraryById(id);
      
      const raw = data.data || data;

      const libraryData =
        raw?.data?.library ||
        raw?.library ||
        raw?.data ||
        raw;

      setLibrary(libraryData);
    } catch (err) {
      console.error('Error fetching library:', err);
      setError('Failed to load library. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLibrary();
  }, [fetchLibrary]);

  return (
    <LibraryDetailsUI
      data={library}
      loading={loading}
      error={error}
      onRetry={fetchLibrary}
    />
  );
}

export default LibraryDetailsContainer;
