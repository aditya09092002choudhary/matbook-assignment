import { formSchema } from '../data/formSchema.js';

export const validateSubmission = (req, res, next) => {
  const data = req.body;
  const errors = {};

  formSchema.fields.forEach(field => {
    const value = data[field.name];
    const validation = field.validation || {};

    // Required field validation
    if (validation.required) {
      if (value === undefined || value === null || value === '') {
        errors[field.name] = `${field.label} is required`;
        return;
      }
      
      // Check for empty arrays in multi-select
      if (field.type === 'multi-select' && Array.isArray(value) && value.length === 0) {
        errors[field.name] = `${field.label} is required`;
        return;
      }
    }

    // Skip other validations if field is empty and not required
    if (value === undefined || value === null || value === '') {
      return;
    }

    // Text validations
    if (field.type === 'text' || field.type === 'email' || field.type === 'textarea') {
      if (validation.minLength && value.length < validation.minLength) {
        errors[field.name] = `${field.label} must be at least ${validation.minLength} characters`;
      }
      if (validation.maxLength && value.length > validation.maxLength) {
        errors[field.name] = `${field.label} must not exceed ${validation.maxLength} characters`;
      }
      if (validation.regex) {
        const regex = new RegExp(validation.regex);
        if (!regex.test(value)) {
          errors[field.name] = validation.regexMessage || `${field.label} format is invalid`;
        }
      }
    }

    // Number validations
    if (field.type === 'number') {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        errors[field.name] = `${field.label} must be a valid number`;
      } else {
        if (validation.min !== undefined && numValue < validation.min) {
          errors[field.name] = `${field.label} must be at least ${validation.min}`;
        }
        if (validation.max !== undefined && numValue > validation.max) {
          errors[field.name] = `${field.label} must not exceed ${validation.max}`;
        }
      }
    }

    // Date validations
    if (field.type === 'date' && validation.minDate) {
      const inputDate = new Date(value);
      const minDate = new Date(validation.minDate);
      if (inputDate < minDate) {
        errors[field.name] = `${field.label} must be on or after ${validation.minDate}`;
      }
    }

    // Multi-select validations
    if (field.type === 'multi-select' && Array.isArray(value)) {
      if (validation.minSelected && value.length < validation.minSelected) {
        errors[field.name] = `Select at least ${validation.minSelected} options`;
      }
      if (validation.maxSelected && value.length > validation.maxSelected) {
        errors[field.name] = `Select no more than ${validation.maxSelected} options`;
      }
    }

    // Select validation - ensure valid option
    if (field.type === 'select' && field.options) {
      const validValues = field.options.map(opt => opt.value);
      if (!validValues.includes(value)) {
        errors[field.name] = `${field.label} has an invalid selection`;
      }
    }
  });

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};