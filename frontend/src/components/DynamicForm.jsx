import { useState, useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import FormField from './FormField';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const DynamicForm = ({ schema, onSubmit, isSubmitting, error, initialValues, submitButtonText = 'Submit' }) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [lastError, setLastError] = useState(null);

  const getDefaultValue = (field) => {
    if (initialValues && initialValues[field.name] !== undefined) {
      return initialValues[field.name];
    }
    return field.type === 'multi-select' ? [] : 
           field.type === 'switch' ? false : '';
  };

  const form = useForm({
    defaultValues: schema.fields.reduce((acc, field) => {
      acc[field.name] = getDefaultValue(field);
      return acc;
    }, {}),
    onSubmit: async ({ value }) => {
      try {
        await onSubmit(value);
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
      } catch (err) {
        console.error('Submission error:', err);
        setSubmitSuccess(false);
      }
    },
  });

  useEffect(() => {
    if (error) {
      setSubmitSuccess(false);
      setLastError(error);
    } else if (lastError) {
      setLastError(null);
    }
  }, [error, lastError]);

  useEffect(() => {
    if (submitSuccess && !error && !initialValues) {
      const timer = setTimeout(() => {
        form.reset();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, error, initialValues, form]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      {schema.fields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          form={form}
        />
      ))}

      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
          <div className="flex">
            <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                Submission Failed
              </h3>
              {error.errors ? (
                <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                  <ul className="list-disc list-inside space-y-1">
                    {Object.entries(error.errors).map(([field, message]) => (
                      <li key={field}>{message}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-2 text-sm text-red-700 dark:text-red-400">
                  {error.message || 'An error occurred'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {submitSuccess && !error && (
        <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                {initialValues 
                  ? 'Submission updated successfully!'
                  : 'Form submitted successfully! Redirecting to submissions...'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4 border-t dark:border-gray-700">
        <button
          type="button"
          onClick={() => form.reset()}
          disabled={isSubmitting}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Submitting...
            </>
          ) : (
            submitButtonText
          )}
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;