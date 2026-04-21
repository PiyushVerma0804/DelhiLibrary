import { useState, useEffect, useRef } from "react";
import { getLibraries, createSubmission } from "../services/api";

const TYPES = [
  { value: "photo", label: "Photograph" },
  { value: "document", label: "Document" },
  { value: "field_note", label: "Field Note" },
];

const EMPTY_FORM = {
  title: "",
  description: "",
  libraryId: "",
  type: "document",
  source: "",
  year: "",
  language: "",
  tags: "",
};

function Field({ label, hint, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-800 mb-0.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      {children}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 pb-1 border-b">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function UploadPage() {
  const [libraries, setLibraries] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef();

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    getLibraries()
      .then((res) => setLibraries(res.data.data.libraries))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    if (!form.description.trim()) errs.description = "Description is required.";
    if (!form.libraryId) errs.libraryId = "Please select a library.";
    if (!form.source.trim()) errs.source = "Source is required.";
    if (!file) errs.file = "Please select a file to upload.";
    if (form.year && (isNaN(form.year) || form.year < 1000 || form.year > new Date().getFullYear())) {
      errs.year = `Year must be between 1000 and ${new Date().getFullYear()}.`;
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("title", form.title.trim());
    formData.append("description", form.description.trim());
    formData.append("libraryId", form.libraryId);
    formData.append("type", form.type);
    formData.append("source", form.source.trim());
    if (form.year) formData.append("year", form.year);
    if (form.language) formData.append("language", form.language.trim());
    form.tags.split(",").map((t) => t.trim()).filter(Boolean).forEach((t) => {
      formData.append("tags[]", t);
    });
    formData.append("file", file);

    try {
      await createSubmission(formData);
      setStatus({ type: "success", message: "Your submission has been received and is pending review. Thank you for contributing to the archive." });
      setForm(EMPTY_FORM);
      setFile(null);
      setErrors({});
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      const msg = err.response?.data?.message || "Submission failed. Please check your connection and try again.";
      setStatus({ type: "error", message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Submit a Document</h1>
        <p className="text-gray-500 text-sm">
          Contribute photographs, documents, or field notes to the archive.
          All submissions are reviewed by an administrator before publishing.
        </p>
      </div>

      {!isLoggedIn && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
          You must be logged in to submit documents.{" "}
          <a href="/login" className="font-medium underline">Sign in here →</a>
        </div>
      )}

      {status && (
        <div className={`mb-6 p-4 rounded text-sm border leading-relaxed ${
          status.type === "success"
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-700"
        }`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>

        {/* SECTION 1 — Basic Info */}
        <Section title="Basic Information">
          <Field
            label="Title"
            required
            hint='Give a clear academic title — e.g., "Reading Room Layout, 1932" or "Survey Map of Civil Lines"'
          >
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-sm ${errors.title ? "border-red-400" : "border-gray-300"}`}
              placeholder="Enter document title"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </Field>

          <Field
            label="Description"
            required
            hint="2–3 sentences explaining what this entry represents, its historical significance, or context."
          >
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className={`w-full border rounded px-3 py-2 text-sm ${errors.description ? "border-red-400" : "border-gray-300"}`}
              placeholder="Describe the document, its content, and relevance..."
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </Field>
        </Section>

        {/* SECTION 2 — Classification */}
        <Section title="Classification">
          <Field
            label="Library"
            required
            hint="Select the collection this document belongs to."
          >
            <select
              name="libraryId"
              value={form.libraryId}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-sm bg-white ${errors.libraryId ? "border-red-400" : "border-gray-300"}`}
            >
              <option value="">— Select a library —</option>
              {libraries.map((lib) => (
                <option key={lib._id} value={lib._id}>{lib.name}</option>
              ))}
            </select>
            {errors.libraryId && <p className="text-xs text-red-500 mt-1">{errors.libraryId}</p>}
          </Field>

          <Field
            label="Document Type"
            required
            hint="Photograph: image files. Document: PDFs, scanned text. Field Note: researcher observations."
          >
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </Field>
        </Section>

        {/* SECTION 3 — Metadata */}
        <Section title="Metadata">
          <Field
            label="Source"
            required
            hint='Where this material originates — e.g., "National Archives of India", "Field survey, March 2024", "Family collection"'
          >
            <input
              name="source"
              value={form.source}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-sm ${errors.source ? "border-red-400" : "border-gray-300"}`}
              placeholder="e.g. National Archives, Delhi"
            />
            {errors.source && <p className="text-xs text-red-500 mt-1">{errors.source}</p>}
          </Field>

          <div className="flex gap-4">
            <Field
              label="Year"
              hint="Year of creation or publication (optional)."
            >
              <input
                name="year"
                value={form.year}
                onChange={handleChange}
                type="number"
                min="1000"
                max={new Date().getFullYear()}
                className={`w-full border rounded px-3 py-2 text-sm ${errors.year ? "border-red-400" : "border-gray-300"}`}
                placeholder="e.g. 1947"
              />
              {errors.year && <p className="text-xs text-red-500 mt-1">{errors.year}</p>}
            </Field>

            <Field
              label="Language"
              hint="Primary language of the document (optional)."
            >
              <input
                name="language"
                value={form.language}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="e.g. Hindi, Urdu, English"
              />
            </Field>
          </div>

          <Field
            label="Tags"
            hint="Comma-separated keywords to aid discovery — e.g., colonial, maps, 1857, water-supply"
          >
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="history, maps, colonial, infrastructure"
            />
          </Field>
        </Section>

        {/* SECTION 4 — File Upload */}
        <Section title="File Upload">
          <Field
            label="File"
            required
            hint="Upload the original file — image (JPG, PNG) or document (PDF). Max size depends on server configuration."
          >
            <input
              ref={fileRef}
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0] || null);
                if (errors.file) setErrors((prev) => ({ ...prev, file: null }));
              }}
              className="w-full text-sm text-gray-600"
            />
            {file && (
              <p className="text-xs text-gray-500 mt-1">Selected: <span className="font-medium">{file.name}</span> ({(file.size / 1024).toFixed(1)} KB)</p>
            )}
            {errors.file && <p className="text-xs text-red-500 mt-1">{errors.file}</p>}
          </Field>
        </Section>

        <button
          type="submit"
          disabled={submitting || !isLoggedIn}
          className="w-full bg-gray-800 text-white py-2.5 rounded text-sm font-medium hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting for review…" : "Submit Document"}
        </button>

        <p className="text-xs text-gray-400 text-center mt-3">
          Submissions are reviewed before being published to the archive.
        </p>
      </form>
    </div>
  );
}

export default UploadPage;
