import Document from '../models/Document.js';
import Library from '../models/Library.js';

const getAllDocuments = async (req, res) => {
  try {
    const { libraryId, type, tags, search } = req.query;
    
    const query = {};
    
    if (libraryId) {
      query.libraryId = libraryId;
    }
    
    if (type) {
      query.type = type;
    }
    
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      query.tags = { $in: tagArray };
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const documents = await Document.find(query)
      .select('title description type year source language tags fileUrl libraryId contributorId createdAt')
      .populate('libraryId', 'name')
      .populate('contributorId', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { documents }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching documents',
      error: error.message
    });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const document = await Document.findById(id)
      .populate('libraryId', 'name description')
      .populate('contributorId', 'name');

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    res.json({
      success: true,
      data: { document }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching document',
      error: error.message
    });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Document ID is required'
      });
    }

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    await Document.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting document',
      error: error.message
    });
  }
};

export {
  getAllDocuments,
  getDocumentById,
  deleteDocument
};
