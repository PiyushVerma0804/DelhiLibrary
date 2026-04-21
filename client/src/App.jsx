import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LibraryPage from "./pages/LibraryPage";
import UploadPage from "./pages/UploadPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages that should NOT show the navbar
const NO_NAV_ROUTES = ["/landing", "/login"];

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  if (NO_NAV_ROUTES.includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/landing");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link to="/" className="font-semibold text-sm tracking-wide hover:text-gray-300">
          Archive of Archives
        </Link>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/upload" className="hover:text-gray-300">Submit</Link>
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
        {/* Public routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/library/:id" element={<LibraryPage />} />

        {/* Protected routes */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
