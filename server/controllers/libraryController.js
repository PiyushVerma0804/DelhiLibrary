import Library from '../models/Library.js';
import { uploadToImageKit } from '../utils/upload.js';

const createLibrary = async (req, res) => {
  try {
    const { name, description, introContent } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required"
      });
    }

    const uploaded = await uploadToImageKit(req.file);

    if (!uploaded || !uploaded.url) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed"
      });
    }

    const library = await Library.create({
      name,
      description,
      introContent,
      imageUrl: uploaded.url
    });

    return res.status(201).json({
      success: true,
      data: library
    });
  } catch (error) {
    console.error("Create library error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error creating library"
    });
  }
};

const getAllLibraries = async (req, res) => {
  try {
    const libraries = await Library.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { libraries }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching libraries',
      error: error.message
    });
  }
};

const getLibraryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const library = await Library.findById(id);

    if (!library) {
      return res.status(404).json({
        success: false,
        message: 'Library not found'
      });
    }

    res.json({
      success: true,
      data: { library }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching library',
      error: error.message
    });
  }
};

export const deleteLibrary = async (req, res) => {
  const { id } = req.params;

  const library = await Library.findById(id);

  if (!library) {
    return res.status(404).json({
      success: false,
      message: "Library not found"
    });
  }

  await library.deleteOne();

  return res.json({
    success: true,
    message: "Library deleted successfully"
  });
};

export {
  createLibrary,
  getAllLibraries,
  getLibraryById
};
