import Submission from '../models/Submission.js';
import Library from '../models/Library.js';
import { uploadToImageKit } from '../utils/upload.js';

const createSubmission = async (req, res) => {
  try {
    const {
      title,
      description,
      libraryId,
      type,
      source,
      year,
      language,
      tags
    } = req.body;

    const file = req.file;

    // REQUIRED CHECKS
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "File is required"
      });
    }

    if (!title || !description || !libraryId || !type || !source) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // CHECK LIBRARY EXISTS
    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({
        success: false,
        message: "Library not found"
      });
    }

    // UPLOAD FILE
    const uploaded = await uploadToImageKit(file);

    if (!uploaded || !uploaded.url) {
      return res.status(500).json({
        success: false,
        message: "File upload failed"
      });
    }

    // CREATE SUBMISSION
    const submission = await Submission.create({
      title,
      description,
      libraryId,
      type,
      source,
      year,
      language,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(",")) : [],
      fileUrl: uploaded.url,
      contributorId: req.user._id,
      status: "pending"
    });

    res.status(201).json({
      success: true,
      data: submission
    });

  } catch (error) {
    console.error("SUBMISSION ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error creating submission"
    });
  }
};

const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ contributorId: req.user._id })
      .populate('libraryId', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { submissions }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching submissions',
      error: error.message
    });
  }
};

export {
  createSubmission,
  getMySubmissions
};
