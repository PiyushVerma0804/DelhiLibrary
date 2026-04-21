import express from 'express';
import { body } from 'express-validator';
import { getAllSubmissions, updateSubmissionStatus } from '../controllers/adminSubmissionController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

const updateStatusValidation = [
  body('status')
    .isIn(['approved', 'rejected'])
    .withMessage('Status must be approved or rejected')
];

router.get('/', protect, adminOnly, getAllSubmissions);
router.patch('/:id', protect, adminOnly, updateStatusValidation, handleValidationErrors, updateSubmissionStatus);

export default router;
