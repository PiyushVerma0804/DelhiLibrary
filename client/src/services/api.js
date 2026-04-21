import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Attach token from localStorage to every request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Simple error logging
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

// Libraries
export const getLibraries = () => API.get("/libraries");
export const getLibraryById = (id) => API.get(`/libraries/${id}`);
export const createLibrary = (data) => {
  // Check if data is FormData (file upload) or regular JSON
  if (data instanceof FormData) {
    return API.post("/libraries", data, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
  return API.post("/libraries", data);
};
export const deleteLibrary = (id) => API.delete(`/libraries/${id}`);

// Documents
export const getDocuments = (queryParams = "") => {
  const url = queryParams ? `/documents?${queryParams}` : "/documents";
  return API.get(url);
};

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
