import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LibraryPage from "./pages/LibraryPage";
import DocumentsPage from "./pages/DocumentsPage";
import UploadPage from "./pages/UploadPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Pages that should NOT show the navbar
const NO_NAV_ROUTES = ["/landing", "/login"];

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token;
  const isAdmin = role === "admin";

  if (NO_NAV_ROUTES.includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/landing");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link to="/home" className="font-semibold text-sm tracking-wide hover:text-gray-300">
          Archive of Archives
        </Link>
      </div>

      <div className="flex items-center gap-4 text-sm">
        {isLoggedIn ? (
          <>
            <Link to="/home" className="hover:text-gray-300">Home</Link>
            <Link to="/documents" className="hover:text-gray-300">Documents</Link>
            <Link to="/upload" className="hover:text-gray-300">Submit</Link>
            {isAdmin && (
              <Link to="/admin" className="hover:text-gray-300">Admin</Link>
            )}
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-gray-300">Login</Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        {/* Default redirect to landing */}
        <Route path="/" element={<Navigate to="/landing" />} />
        
        {/* Public routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/documents" element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />
        <Route path="/library/:id" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />

        {/* Admin-only route */}
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
