import express from 'express';
import { getFormSchema } from '../controllers/schemaController.js';
import { 
  createSubmission, 
  getSubmissions,
  updateSubmission,
  deleteSubmission,
  getSubmissionById
} from '../controllers/submissionController.js';
import { validateSubmission } from '../middleware/validation.js';

const router = express.Router();

// Schema endpoint
router.get('/form-schema', getFormSchema);

// Submission endpoints
router.post('/submissions', validateSubmission, createSubmission);
router.get('/submissions', getSubmissions);
router.get('/submissions/:id', getSubmissionById);
router.put('/submissions/:id', validateSubmission, updateSubmission);
router.delete('/submissions/:id', deleteSubmission);

export default router;