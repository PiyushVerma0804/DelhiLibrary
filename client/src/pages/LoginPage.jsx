import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await login(form);
      const { token, user } = res.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-1">Sign In</h1>
        <p className="text-gray-500 text-sm mb-6">Access your contributor account.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="your-email@domain.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-gray-800 text-white py-2 rounded text-sm hover:bg-gray-700 disabled:opacity-50">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          <Link to="/landing" className="underline">← Back to homepage</Link>
        </p>
        
        <p className="text-sm mt-3">
          Don't have an account?{' '}
          <a href="/register" className="text-slate-600 hover:text-slate-800 underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
