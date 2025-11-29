export const validateField = (field, value) => {
  const validation = field.validation || {};

  // Required validation
  if (validation.required) {
    if (value === undefined || value === null || value === '') {
      return `${field.label} is required`;
    }
    if (field.type === 'multi-select' && Array.isArray(value) && value.length === 0) {
      return `${field.label} is required`;
    }
    if (field.type === 'switch' && !value) {
      return `${field.label} is required`;
    }
  }

  // Skip other validations if empty and not required
  if (value === undefined || value === null || value === '') {
    return null;
  }

  // Text validations
  if (field.type === 'text' || field.type === 'email' || field.type === 'textarea') {
    if (validation.minLength && value.length < validation.minLength) {
      return `${field.label} must be at least ${validation.minLength} characters`;
    }
    if (validation.maxLength && value.length > validation.maxLength) {
      return `${field.label} must not exceed ${validation.maxLength} characters`;
    }
    if (validation.regex) {
      const regex = new RegExp(validation.regex);
      if (!regex.test(value)) {
        return validation.regexMessage || `${field.label} format is invalid`;
      }
    }
  }

  // Number validations
  if (field.type === 'number') {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return `${field.label} must be a valid number`;
    }
    if (validation.min !== undefined && numValue < validation.min) {
      return `${field.label} must be at least ${validation.min}`;
    }
    if (validation.max !== undefined && numValue > validation.max) {
      return `${field.label} must not exceed ${validation.max}`;
    }
  }

  // Date validations
  if (field.type === 'date' && validation.minDate) {
    const inputDate = new Date(value);
    const minDate = new Date(validation.minDate);
    if (inputDate < minDate) {
      return `${field.label} must be on or after ${validation.minDate}`;
    }
  }

  // Multi-select validations
  if (field.type === 'multi-select' && Array.isArray(value)) {
    if (validation.minSelected && value.length < validation.minSelected) {
      return `Select at least ${validation.minSelected} option(s)`;
    }
    if (validation.maxSelected && value.length > validation.maxSelected) {
      return `Select no more than ${validation.maxSelected} option(s)`;
    }
  }

  return null;
};