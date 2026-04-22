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

// Raw API calls for services to use
export const login = (data) => API.post("/api/auth/login", data);
export const register = (data) => API.post("/api/auth/register", data);
export const getLibraries = () => API.get("/api/libraries");
export const getLibraryById = (id) => API.get(`/api/libraries/${id}`);
export const createLibrary = (data) => {
  if (data instanceof FormData) {
    return API.post("/api/libraries", data, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
  return API.post("/api/libraries", data);
};
export const deleteLibrary = (id) => API.delete(`/api/libraries/${id}`);
export const getDocuments = (queryParams = "") => {
  const url = queryParams ? `/api/documents?${queryParams}` : "/api/documents";
  return API.get(url);
};
export const createSubmission = (formData) =>
  API.post("/api/submissions", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
export const getMySubmissions = () => API.get("/api/submissions/my");
export const getAllSubmissions = () => API.get("/api/admin/submissions");
export const updateSubmissionStatus = (id, status) =>
  API.patch(`/api/admin/submissions/${id}`, { status });

export default API;
