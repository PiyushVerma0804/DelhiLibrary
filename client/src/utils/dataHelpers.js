// Centralized data normalization helpers

const TYPE_LABELS = {
  photo: "Photograph",
  document: "Document",
  field_note: "Field Note",
};

// Helper function to normalize type labels
export const getTypeLabel = (type) => TYPE_LABELS[type] || type;

// Helper function to ensure tags are always arrays
export const normalizeTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.filter(Boolean);
  if (typeof tags === 'string') {
    return tags.split(',').map(tag => tag.trim()).filter(Boolean);
  }
  return [];
};

// Export TYPE_LABELS for use in components
export { TYPE_LABELS };
