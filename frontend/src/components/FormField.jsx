import React from 'react';
import { validateField } from '../utils/validation';

const FormField = ({ field, form }) => {
  const fieldValue = form.useStore((state) => state.values[field.name]);
  const fieldMeta = form.useStore((state) => state.fieldMeta[field.name]);
  
  const handleChange = (value) => {
    form.setFieldValue(field.name, value);
    // Validate on change
    const error = validateField(field, value);
    form.setFieldMeta(field.name, { errors: error ? [error] : [] });
  };

  const handleBlur = () => {
    const error = validateField(field, fieldValue);
    form.setFieldMeta(field.name, { 
      errors: error ? [error] : [],
      isTouched: true 
    });
  };

  const errors = fieldMeta?.errors || [];
  const isTouched = fieldMeta?.isTouched;
  const showError = isTouched && errors.length > 0;

  const baseInputClass = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white";
  const errorClass = showError ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600";

  const renderInput = () => {
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={fieldValue || ''}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            className={`${baseInputClass} ${errorClass}`}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            placeholder={field.placeholder}
            value={fieldValue || ''}
            onChange={(e) => handleChange(e.target.value ? Number(e.target.value) : '')}
            onBlur={handleBlur}
            className={`${baseInputClass} ${errorClass}`}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={fieldValue || ''}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            className={`${baseInputClass} ${errorClass}`}
          />
        );

      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder}
            value={fieldValue || ''}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            rows={4}
            className={`${baseInputClass} ${errorClass} resize-none`}
          />
        );

      case 'select':
        return (
          <select
            value={fieldValue || ''}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            className={`${baseInputClass} ${errorClass}`}
          >
            <option value="">Select an option</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'multi-select':
        return (
          <div className="space-y-2">
            {field.options?.map((opt) => (
              <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(fieldValue || []).includes(opt.value)}
                  onChange={(e) => {
                    const currentValues = fieldValue || [];
                    const newValues = e.target.checked
                      ? [...currentValues, opt.value]
                      : currentValues.filter(v => v !== opt.value);
                    handleChange(newValues);
                  }}
                  onBlur={handleBlur}
                  className="w-4 h-4 text-amber-600 border-gray-300 dark:border-gray-600 rounded focus:ring-amber-500 dark:bg-gray-700"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case 'switch':
        return (
          <label className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={fieldValue || false}
                onChange={(e) => handleChange(e.target.checked)}
                onBlur={handleBlur}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${
                fieldValue ? 'bg-amber-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  fieldValue ? 'transform translate-x-5' : ''
                }`} />
              </div>
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">{field.label}</span>
          </label>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      {field.type !== 'switch' && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {field.label}
          {field.validation?.required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}
      
      {renderInput()}
      
      {showError && (
        <p className="text-sm text-red-600 dark:text-red-400">{errors[0]}</p>
      )}
    </div>
  );
};

export default FormField;