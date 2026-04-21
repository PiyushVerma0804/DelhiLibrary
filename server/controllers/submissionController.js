import Submission from '../models/Submission.js';
import Library from '../models/Library.js';
import { uploadToImageKit } from '../utils/upload.js';

const createSubmission = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'File is required'
      });
    }

    const { title, description, libraryId, type, source, year, language, tags } = req.body;

    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(400).json({
        success: false,
        message: 'Library not found'
      });
    }

    const fileUrl = await uploadToImageKit(req.file);

    const submission = await Submission.create({
      title,
      description,
      libraryId,
      type,
      source,
      year,
      language,
      tags,
      fileUrl,
      contributorId: req.user._id,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Submission created successfully',
      data: { submission }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error creating submission',
      error: error.message
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
