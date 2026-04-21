import express from 'express';
import { getAllDocuments, getDocumentById } from '../controllers/documentController.js';

const router = express.Router();

router.get('/', getAllDocuments);
router.get('/:id', getDocumentById);

export default router;
