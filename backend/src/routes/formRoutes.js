import express from 'express';
import { getFormSchema } from '../controllers/schemaController.js';
import { 
  createSubmission, 
  getSubmissions 
} from '../controllers/submissionController.js';
import { validateSubmission } from '../middleware/validation.js';

const router = express.Router();

// Schema endpoint
router.get('/form-schema', getFormSchema);

// Submission endpoints
router.post('/submissions', validateSubmission, createSubmission);
router.get('/submissions', getSubmissions);

export default router;