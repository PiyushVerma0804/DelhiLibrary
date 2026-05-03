import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService.js';
import { libraryService } from '../services/libraryService.js';
import { getTypeLabel, normalizeTags, TYPE_LABELS } from "../utils/dataHelpers";

const TYPE_BADGE_STYLES = {
  photo: "bg-blue-100 text-blue-700",
  document: "bg-purple-100 text-purple-700",
  field_note: "bg-amber-100 text-amber-700",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** A single labelled metadata row */
function MetaRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 text-sm">
      <span className="w-24 flex-shrink-0 text-gray-400 font-medium">{label}</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}

// ─── Create Library Form ─────────────────────────────────────────────────────

const EMPTY_LIBRARY_FORM = { name: "", description: "", location: "", openingTime: "", closingTime: "", introContent: "" };

function CreateLibraryForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_LIBRARY_FORM);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { type: "success"|"error", message }
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, image: 'Please upload an image file' }));
        return;
      }
      setFile(selectedFile);
      if (errors.image) setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.description.trim()) errs.description = "Description is required.";
    if (!form.location.trim()) errs.location = "Location is required.";
    if (!form.openingTime.trim()) errs.openingTime = "Opening time is required.";
    if (!form.closingTime.trim()) errs.closingTime = "Closing time is required.";
    if (!file) errs.image = "Image is required.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    setStatus(null);
    try {
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("description", form.description.trim());
      formData.append("location", form.location.trim());
      formData.append("openingTime", form.openingTime.trim());
      formData.append("closingTime", form.closingTime.trim());
      formData.append("introContent", form.introContent.trim());
      formData.append("image", file);

      // Debug logging
      console.log("FORM DATA KEYS:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await libraryService.createLibrary(formData);
      setStatus({ type: "success", message: `Library "${form.name.trim()}" created successfully.` });
      setForm(EMPTY_LIBRARY_FORM);
      setFile(null);
      setErrors({});
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Failed to create library. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mb-8 border border-gray-200 rounded-lg bg-white overflow-hidden">
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => { setOpen((v) => !v); setStatus(null); }}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50"
      >
        <div>
          <span className="font-semibold text-gray-800 text-base">＋ Create New Library</span>
          <span className="ml-3 text-sm text-gray-400">Add a new collection to the archive</span>
        </div>
        <span className="text-gray-400 text-sm">{open ? "▲ Hide" : "▼ Show"}</span>
      </button>

      {open && (
        <form onSubmit={handleSubmit} noValidate className="border-t border-gray-200 px-5 py-5 space-y-4">

          {/* Success / Error banner */}
          {status && (
            <div className={`px-4 py-3 rounded text-sm border ${
              status.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-700"
            }`}>
              {status.message}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Library Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Delhi Public Library"
              className={`w-full border rounded px-3 py-2 text-sm ${
                errors.name ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Brief description of the library and its collection…"
              className={`w-full border rounded px-3 py-2 text-sm ${
                errors.description ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g., New Delhi, Connaught Place"
              className={`w-full border rounded px-3 py-2 text-sm ${
                errors.location ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
          </div>

          {/* Opening Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opening Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="openingTime"
              value={form.openingTime}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-sm ${
                errors.openingTime ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.openingTime && <p className="text-xs text-red-500 mt-1">{errors.openingTime}</p>}
          </div>

          {/* Closing Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Closing Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="closingTime"
              value={form.closingTime}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-sm ${
                errors.closingTime ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.closingTime && <p className="text-xs text-red-500 mt-1">{errors.closingTime}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Library Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`w-full border rounded px-3 py-2 text-sm ${
                errors.image ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
            {file && (
              <div className="mt-2">
                <p className="text-xs text-gray-600 mb-1">Selected: {file.name}</p>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Intro Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Intro Content <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea
              name="introContent"
              value={form.introContent}
              onChange={handleChange}
              rows={3}
              placeholder="Extended introduction or historical context for the library page…"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-[#b8860b] text-white text-sm rounded hover:bg-[#d4a017] disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {submitting ? "Creating…" : "Create Library"}
            </button>
            <button
              type="button"
              onClick={() => { setForm(EMPTY_LIBRARY_FORM); setFile(null); setErrors({}); setStatus(null); }}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/** File preview area at the top of each card */
function FilePreview({ sub }) {
  const [imgError, setImgError] = useState(false);

  if (sub.type === "photo") {
    if (sub.fileUrl && !imgError) {
      return (
        <img
          src={sub.fileUrl}
          alt={sub.title}
          onError={() => setImgError(true)}
          className="w-full h-44 object-cover border-b border-gray-200"
        />
      );
    }
    return (
      <div className="w-full h-44 flex flex-col items-center justify-center bg-gray-100 border-b border-gray-200 gap-1">
        <span className="text-2xl">🖼️</span>
        <span className="text-xs text-gray-400">Image not available</span>
      </div>
    );
  }

  if (sub.type === "document") {
    return (
      <div className="w-full h-44 flex flex-col items-center justify-center bg-red-50 border-b border-gray-200 gap-2">
        <span className="text-3xl">📄</span>
        <span className="text-sm font-medium text-red-700">PDF Document</span>
        {sub.fileUrl && (
          <a
            href={sub.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-red-600 underline"
          >
            Open file →
          </a>
        )}
      </div>
    );
  }

  if (sub.type === "field_note") {
    return (
      <div className="w-full h-44 flex flex-col items-center justify-center bg-amber-50 border-b border-gray-200 gap-2">
        <span className="text-3xl">📝</span>
        <span className="text-sm font-medium text-amber-700">Field Note</span>
        {sub.fileUrl && (
          <a
            href={sub.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-amber-600 underline"
          >
            Open file →
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-44 flex items-center justify-center bg-gray-50 border-b border-gray-200">
      <span className="text-xs text-gray-400">No preview</span>
    </div>
  );
}

/** Approve / Reject action buttons with confirmation + loading state */
function ActionButtons({ sub, onAction }) {
  const [acting, setActing] = useState(null); // "approved" | "rejected"
  const [actionError, setActionError] = useState(null);

  const handleAction = async (status) => {
    const label = status === "approved" ? "approve" : "reject";
    const confirmed = window.confirm(
      `Are you sure you want to ${label} this submission?\n\n"${sub.title}"`
    );
    if (!confirmed) return;

    setActing(status);
    setActionError(null);
    try {
      await adminService.updateSubmissionStatus(sub._id, status);
      onAction(sub._id);
    } catch (err) {
      setActionError(err.response?.data?.message || "Action failed. Please try again.");
      setActing(null);
    }
  };

  return (
    <div className="pt-3 border-t border-gray-100">
      {actionError && (
        <p className="text-xs text-red-600 mb-2 text-center">{actionError}</p>
      )}
      <div className="flex gap-2">
        <button
          onClick={() => handleAction("approved")}
          disabled={!!acting}
          className="flex-1 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {acting === "approved" ? "Approving…" : "✓ Approve"}
        </button>
        <button
          onClick={() => handleAction("rejected")}
          disabled={!!acting}
          className="flex-1 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {acting === "rejected" ? "Rejecting…" : "✕ Reject"}
        </button>
      </div>
    </div>
  );
}

/** Full submission card */
function SubmissionCard({ sub, onAction }) {
  const badgeStyle =
    TYPE_BADGE_STYLES[sub.type] || "bg-gray-100 text-gray-600";

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden flex flex-col">
      {/* File preview */}
      <FilePreview sub={sub} />

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Title + type badge */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-bold text-gray-900 text-base leading-snug">
            {sub.title}
          </h2>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${badgeStyle}`}
          >
            {getTypeLabel(sub.type)}
          </span>
        </div>

        {/* Description */}
        {sub.description && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {sub.description}
          </p>
        )}

        {/* Metadata rows */}
        <div className="flex flex-col gap-1.5 py-2 border-t border-b border-gray-100">
          <MetaRow label="Source" value={sub.source} />
          <MetaRow label="Library" value={sub.libraryId?.name} />
          <MetaRow label="Submitted by" value={sub.contributorId?.name} />
          <MetaRow label="Year" value={sub.year ? String(sub.year) : null} />
          <MetaRow label="Language" value={sub.language} />
          <MetaRow label="Uploaded on" value={formatDate(sub.createdAt)} />
        </div>

        {/* Tags */}
        {sub.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {normalizeTags(sub.tags).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Spacer pushes buttons to bottom */}
        <div className="flex-1" />

        {/* Approve / Reject */}
        <ActionButtons sub={sub} onAction={onAction} />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function AdminPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchSubmissions = useCallback(() => {
    setLoading(true);
    setError(null);
    adminService.getAllSubmissions()
      .then((res) => {
        const raw = res.data;
        const submissionsData = raw?.submissions || raw?.data?.submissions || raw || [];
        setSubmissions(submissionsData);
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleAction = (id) => {
    setSubmissions((prev) => prev.filter((s) => s._id !== id));
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="pt-20 p-8 text-center text-gray-500">
        <p className="text-base">Loading submissions…</p>
        <p className="text-sm mt-1">Please wait.</p>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="pt-20 p-8 max-w-md mx-auto text-center">
        <div className="border border-red-200 bg-red-50 rounded-lg p-6">
          <p className="text-red-700 font-medium mb-1">⚠ Error</p>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={fetchSubmissions}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <section className="pt-20 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">Admin Panel</h1>
        <p className="text-gray-600 mb-6">
          Review each submission carefully before approving or rejecting.
          Approved submissions are published to the archive immediately.
        </p>

        {/* Create Library */}
        <div className="mb-6">
          <CreateLibraryForm />
        </div>

        {/* Empty state */}
        {submissions.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg">
                <p className="text-2xl mb-2">✅</p>
                <p className="text-gray-700 font-medium text-lg mb-1">
                  No pending submissions
                </p>
                <p className="text-gray-400 text-sm">
                  All submissions have been reviewed. Check back later.
                </p>
              </div>
            ) : (
              <>
                {/* Count banner */}
                <div className="mb-5 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
                  <strong>{submissions.length}</strong>{" "}
                  submission{submissions.length !== 1 ? "s" : ""} pending review
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {submissions.map((sub) => (
                    <SubmissionCard key={sub._id} sub={sub} onAction={handleAction} />
                  ))}
                </div>
              </>
            )}
      </div>
    </section>
  );
}

export default AdminPage;
