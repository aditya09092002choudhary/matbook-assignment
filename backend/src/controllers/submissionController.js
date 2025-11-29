import { submissionStore } from '../store/submissionStore.js';

export const createSubmission = (req, res) => {
  try {
    const submissionData = req.body;
    
    // Create submission with ID and timestamp
    const submission = submissionStore.create(submissionData);
    
    res.status(201).json({
      success: true,
      id: submission.id,
      createdAt: submission.createdAt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create submission',
      error: error.message
    });
  }
};

export const getSubmissions = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';
    const search = req.query.search || '';

    // Validate parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid pagination parameters'
      });
    }

    if (!['asc', 'desc'].includes(sortOrder)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid sort order. Use "asc" or "desc"'
      });
    }

    const result = submissionStore.getAll({
      page,
      limit,
      sortBy,
      sortOrder,
      search
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submissions',
      error: error.message
    });
  }
};

export const getSubmissionById = (req, res) => {
  try {
    const { id } = req.params;
    const submission = submissionStore.getById(id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: submission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submission',
      error: error.message
    });
  }
};

export const updateSubmission = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedSubmission = submissionStore.update(id, updateData);
    
    if (!updatedSubmission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: updatedSubmission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update submission',
      error: error.message
    });
  }
};

export const deleteSubmission = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = submissionStore.deleteById(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Submission deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete submission',
      error: error.message
    });
  }
};