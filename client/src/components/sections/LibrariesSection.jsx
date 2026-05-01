import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { libraryService } from '../../services/libraryService';

function LibrariesSection() {
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await libraryService.getAllLibraries();
        
        const raw = res.data;

        const librariesData =
          raw?.data?.libraries ||
          raw?.libraries ||
          raw?.data ||
          raw;

        setLibraries(librariesData);
        
      } catch (err) {
        console.error('Error fetching libraries:', err);
        setError('Failed to load libraries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLibraries();
  }, []);

  // Fallback data - only used when API returns empty
  const fallbackLibraries = [
    {
      _id: "fallback-1",
      name: "Delhi Public Library",
      description: "Major public library with extensive archives",
      location: "Delhi",
      items: "2M+ books",
      established: "1951"
    },
    {
      _id: "fallback-2",
      name: "National Archives of India",
      description: "Preservation of historical documents and records",
      location: "New Delhi",
      items: "10M+ records",
      established: "1891"
    },
    {
      _id: "fallback-3",
      name: "Delhi University Library",
      description: "Academic library with research collections",
      location: "Delhi University",
      items: "1.5M+ books",
      established: "1922"
    }
  ];

  // Use real API data if available, otherwise use fallback
  const displayLibraries = libraries.length > 0 ? libraries : fallbackLibraries;

  return (
    <section id="libraries-section" className="py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary-600 text-sm font-semibold uppercase mb-3">
            Featured Libraries
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
            Explore Delhi's Knowledge Treasures
          </h2>
        </div>

        {/* States */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {displayLibraries.map((library) => {
              // Use proper ID from backend
              const libraryId = library._id || library.id;
              
              return (
              <article
                key={libraryId}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
              >

                {/* Image + Badge */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={library.imageUrl || ""}
                    alt={library.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                    onError={(e) => e.target.style.display = "none"}
                  />

                  <span className="absolute top-4 left-4 bg-primary-600 text-white text-xs px-3 py-1 rounded-full">
                    Est. {library.established}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display mb-2">
                    {library.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    {library.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm mb-4">
                    <span className="w-4 h-4 text-primary-600">📍</span>
                    <span>{library.location}</span>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center border-t pt-4">
                    <span className="text-xs text-gray-500">
                      {library.items}
                    </span>

                    <Link
                      to={`/library/${libraryId}`}
                      className="text-primary-600 text-sm flex items-center gap-1"
                    >
                      Explore
                      <span className="w-4 h-4">→</span>
                    </Link>
                  </div>

                </div>
              </article>
              );
            })}
          </div>
        )}
      </section>
  );
}

export default LibrariesSection;