import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLibraries } from "../services/api";

function HomePage() {
    const [libraries, setLibraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getLibraries()
            .then((res) => setLibraries(res.data.data.libraries))
            .catch((err) => setError(err.message || "Failed to fetch libraries"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="p-6 text-gray-500">Loading...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Libraries</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {libraries.map((lib) => (
                    <div key={lib._id} className="border rounded overflow-hidden bg-white">
                        {lib.imageUrl && (
                            <img
                                src={lib.imageUrl}
                                alt={lib.name}
                                className="w-full h-40 object-cover"
                            />
                        )}
                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-1">{lib.name}</h2>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {lib.description}
                            </p>
                            <button
                                onClick={() => navigate(`/library/${lib._id}`)}
                                className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700"
                            >
                                Explore
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {libraries.length === 0 && (
                <p className="text-gray-500">No libraries found.</p>
            )}
        </div>
    );
}

export default HomePage;
