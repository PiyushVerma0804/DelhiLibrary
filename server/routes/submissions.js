import express from 'express';
import { body } from 'express-validator';
import { createSubmission, getMySubmissions } from '../controllers/submissionController.js';
import { protect } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';
import upload from '../middleware/upload.js';

const router = express.Router();

const createSubmissionValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 500 })
    .withMessage('Title cannot exceed 500 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  
  body('libraryId')
    .notEmpty()
    .withMessage('Library ID is required')
    .isMongoId()
    .withMessage('Invalid Library ID'),
  
  body('type')
    .isIn(['photo', 'document', 'field_note'])
    .withMessage('Type must be photo, document, or field_note'),
  
  body('source')
    .trim()
    .notEmpty()
    .withMessage('Source is required')
    .isLength({ max: 200 })
    .withMessage('Source cannot exceed 200 characters'),
  
  body('year')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('Year must be valid'),
  
  body('language')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Language cannot exceed 50 characters'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
];

router.post('/', protect, upload, createSubmissionValidation, handleValidationErrors, createSubmission);
router.get('/my', protect, getMySubmissions);

export default router;
