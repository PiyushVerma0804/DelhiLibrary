import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Archive of Archives</h1>
      <p className="text-gray-500 text-base max-w-md mb-8 leading-relaxed">
        A living repository of photographs, documents, and field notes preserving
        the historical and cultural memory of Delhi's libraries.
      </p>
      <div className="flex gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 bg-gray-800 text-white text-sm rounded hover:bg-gray-700"
        >
          Explore Archive
        </Link>
        <Link
          to="/login"
          className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
