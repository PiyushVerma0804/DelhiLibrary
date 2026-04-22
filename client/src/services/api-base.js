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
  // Log final API URL to verify no duplication
  console.log("FINAL API URL:", config.baseURL + config.url);
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
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
export const getLibraries = () => API.get("/libraries");
export const getLibraryById = (id) => API.get(`/libraries/${id}`);
export const createLibrary = (data) => {
  if (data instanceof FormData) {
    return API.post("/libraries", data, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
  return API.post("/libraries", data);
};
export const deleteLibrary = (id) => API.delete(`/libraries/${id}`);
export const getDocuments = (queryParams = "") => {
  const url = queryParams ? `/documents?${queryParams}` : "/documents";
  return API.get(url);
};
export const createSubmission = (formData) =>
  API.post("/submissions", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
export const getMySubmissions = () => API.get("/submissions/my");
export const getAllSubmissions = () => API.get("/admin/submissions");
export const updateSubmissionStatus = (id, status) =>
  API.patch(`/admin/submissions/${id}`, { status });

export default API;
