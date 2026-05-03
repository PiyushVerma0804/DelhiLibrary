import Submission from '../models/Submission.js';
import Document from '../models/Document.js';

const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ status: 'pending' })
      .populate('libraryId', 'name')
      .populate('contributorId', 'name email')
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

const updateSubmissionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be "approved" or "rejected"'
      });
    }

    const submission = await Submission.findById(id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    if (status === 'approved') {
      const document = await Document.create({
        title: submission.title,
        description: submission.description,
        libraryId: submission.libraryId,
        type: submission.type,
        source: submission.source,
        year: submission.year,
        language: submission.language,
        tags: submission.tags,
        fileUrl: submission.fileUrl,
        contributorId: submission.contributorId
      });

      await Submission.findByIdAndDelete(id);

      res.json({
        success: true,
        message: 'Submission approved and document created',
        data: { document }
      });
    } else {
      submission.status = 'rejected';
      await submission.save();

      res.json({
        success: true,
        message: 'Submission rejected',
        data: { submission }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating submission status',
      error: error.message
    });
  }
};

export {
  getAllSubmissions,
  updateSubmissionStatus
};
