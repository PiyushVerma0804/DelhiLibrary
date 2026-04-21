import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleExplore = () => {
    if (token) {
      navigate("/home"); // Home page (libraries)
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto pt-24 pb-16 px-6 text-center">
        <h1 className="font-serif text-5xl font-semibold tracking-tight text-slate-900">Archive of Archives</h1>
        <p className="font-sans text-gray-700 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
          A living repository of photographs, documents, and field notes preserving
          the historical and cultural memory of Delhi's libraries.
        </p>
        <div className="flex gap-3 justify-center mt-8">
          <button
            onClick={handleExplore}
            className="bg-slate-900 text-white rounded-sm px-6 py-2 hover:bg-slate-800 transition"
          >
            Explore Archive
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border border-gray-300 rounded-sm px-6 py-2 hover:bg-gray-100 transition"
          >
            Login
          </button>
        </div>
        
        {/* Subtle Divider */}
        <div className="w-24 h-px bg-gray-300 mx-auto mt-10 mb-10"></div>
        
        {/* Visual Anchor */}
        <div className="text-sm text-gray-600">
          Documenting libraries through structured archival evidence
        </div>
      </div>

      {/* Collections */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl font-medium text-slate-800">Collections</h2>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-white border border-stone-200 rounded-md p-6 shadow-sm hover:shadow-md transition">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-3 font-medium">Photographs</div>
          <h3 className="font-serif text-xl font-medium text-slate-900 mb-3">Photographs</h3>
          <p className="font-sans text-gray-600 text-sm leading-relaxed">Visual documentation of library spaces and collections</p>
        </div>
        <div className="bg-white border border-stone-200 rounded-md p-6 shadow-sm hover:shadow-md transition">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-3 font-medium">Documents</div>
          <h3 className="font-serif text-xl font-medium text-slate-900 mb-3">Documents</h3>
          <p className="font-sans text-gray-600 text-sm leading-relaxed">Policies, records, and archival material</p>
        </div>
        <div className="bg-white border border-stone-200 rounded-md p-6 shadow-sm hover:shadow-md transition">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-3 font-medium">Field Notes</div>
          <h3 className="font-serif text-xl font-medium text-slate-900 mb-3">Field Notes</h3>
          <p className="font-sans text-gray-600 text-sm leading-relaxed">Observations and contextual insights</p>
        </div>
      </div>

      {/* Micro Context */}
      <div className="text-center pb-16 px-6">
        <p className="font-sans text-gray-600 text-sm max-w-2xl mx-auto">
          Each entry contributes to a growing archive of cultural and spatial documentation.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
