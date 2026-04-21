import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getLibraries, deleteLibrary } from "../services/api";
import { EmptyState } from "../components/UI/EmptyState";

function HomePage() {
    const [libraries, setLibraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this library?");
        if (!confirmDelete) return;

        try {
            await deleteLibrary(id);

            // remove from UI instantly
            setLibraries((prev) => prev.filter((lib) => lib._id !== id));

        } catch (error) {
            console.error("Delete failed:", error);
            if (error.response?.status === 404) {
                // Library doesn't exist - remove from UI
                setLibraries((prev) => prev.filter((lib) => lib._id !== id));
                alert("Library was not found and removed from view.");
            } else {
                alert("Failed to delete library");
            }
        }
    };

    const fetchLibraries = useCallback(() => {
        setLoading(true);
        setError(null);
        getLibraries()
            .then((res) => setLibraries(res.data.data.libraries))
            .catch(() => setError("Failed to load libraries. Please try again."))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        // Clear any stale data immediately
        setLibraries([]);
        // Fetch fresh data
        fetchLibraries();
    }, [fetchLibraries]);

    if (loading) return (
        <div className="p-8 text-center text-gray-500">
            <p>Loading libraries…</p>
        </div>
    );
    if (error) return (
        <div className="p-8 max-w-md mx-auto text-center">
            <div className="border border-red-200 bg-red-50 rounded-lg p-6">
                <p className="text-red-700 font-medium mb-1">⚠ Error</p>
                <p className="text-red-600 text-sm mb-4">{error}</p>
                <button
                    onClick={fetchLibraries}
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                    Try Again
                </button>
            </div>
        </div>
    );

    return (
        <div className="p-6">
            {/* Context section */}
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-900 mb-2">Digital Humanities Archive</h2>
                <p className="text-sm text-blue-800">
                    Welcome to the Digital Humanities Archive. This platform preserves and provides access to curated materials 
                    including photographs, documents, and field notes from various libraries and collections.
                </p>
            </div>

            <h1 className="text-2xl font-bold mb-6">Library Collections</h1>

            {libraries.length === 0 ? (
                <EmptyState
                    icon="📚"
                    title="No libraries available yet"
                    description="Libraries will appear here once they are created by administrators."
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {libraries.map((lib) => (
                        <div key={lib._id} className="border rounded overflow-hidden bg-white hover:shadow-lg hover:border-blue-200 transition-all duration-200">
                            {lib.imageUrl && (
                                <img
                                    src={lib.imageUrl}
                                    alt={lib.name}
                                    className="w-full h-40 object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://via.placeholder.com/300x200";
                                    }}
                                />
                            )}
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-1">{lib.name}</h2>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {lib.description}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigate(`/library/${lib._id}`)}
                                        className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                                    >
                                        Explore
                                    </button>
                                    {role === "admin" && (
                                        <button
                                            className="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors"
                                            onClick={() => handleDelete(lib._id)}
                                        >
                                            Delete
                                        </button>
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

export default HomePage;
