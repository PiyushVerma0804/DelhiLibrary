import express from 'express';
import { body } from 'express-validator';
import { createLibrary, getAllLibraries, getLibraryById } from '../controllers/libraryController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';

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
  
  body('introContent')
    .trim()
    .notEmpty()
    .withMessage('Intro content is required'),
  
  body('imageUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please provide a valid URL for image')
];

router.post('/', protect, adminOnly, createLibraryValidation, handleValidationErrors, createLibrary);
router.get('/', getAllLibraries);
router.get('/:id', getLibraryById);

export default router;
