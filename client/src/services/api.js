import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Attach token from localStorage to every request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Libraries
export const getLibraries = () => API.get("/libraries");
export const getLibraryById = (id) => API.get(`/libraries/${id}`);

// Documents
export const getDocuments = (libraryId) => API.get("/documents", { params: { libraryId } });

// Auth
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

// Submissions (requires auth)
export const createSubmission = (formData) =>
  API.post("/submissions", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
export const getMySubmissions = () => API.get("/submissions/my");

// Admin (requires admin role)
export const getAllSubmissions = () => API.get("/admin/submissions");
export const updateSubmissionStatus = (id, status) =>
  API.patch(`/admin/submissions/${id}`, { status });

export default API;
