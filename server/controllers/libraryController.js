import Library from '../models/Library.js';

const createLibrary = async (req, res) => {
  try {
    const { name, description, imageUrl, introContent } = req.body;

    const library = await Library.create({
      name,
      description,
      imageUrl,
      introContent
    });

    res.status(201).json({
      success: true,
      message: 'Library created successfully',
      data: { library }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error creating library',
      error: error.message
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

export {
  createLibrary,
  getAllLibraries,
  getLibraryById
};
