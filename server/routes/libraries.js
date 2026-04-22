import express from 'express';
import { body } from 'express-validator';
import { createLibrary, getAllLibraries, getLibraryById, deleteLibrary } from '../controllers/libraryController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

const createLibraryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Library name is required')
    .isLength({ max: 200 })
    .withMessage('Library name cannot exceed 200 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),

  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required')
    .isLength({ max: 200 })
    .withMessage('Location cannot exceed 200 characters'),

  body('openingTime')
    .trim()
    .notEmpty()
    .withMessage('Opening time is required'),

  body('closingTime')
    .trim()
    .notEmpty()
    .withMessage('Closing time is required'),

  body('introContent')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Intro content cannot exceed 2000 characters')
];

router.post("/", protect, adminOnly, upload.single("image"), createLibrary);
router.get('/', getAllLibraries);
router.get('/:id', getLibraryById);
router.delete('/:id', protect, adminOnly, deleteLibrary);

export default router;
