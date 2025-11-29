import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import FormField from './FormField';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const DynamicForm = ({ schema, onSubmit, isSubmitting, error }) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm({
    defaultValues: schema.fields.reduce((acc, field) => {
      acc[field.name] = field.type === 'multi-select' ? [] : 
                        field.type === 'switch' ? false : '';
      return acc;
    }, {}),
    onSubmit: async ({ value }) => {
      try {
        await onSubmit(value);
        setSubmitSuccess(true);
        form.reset();
        setTimeout(() => setSubmitSuccess(false), 3000);
      } catch (err) {
        console.error('Submission error:', err);
      }
    },
  });

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
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <XCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Submission Failed
              </h3>
              {error.errors ? (
                <div className="mt-2 text-sm text-red-700">
                  <ul className="list-disc list-inside space-y-1">
                    {Object.entries(error.errors).map(([field, message]) => (
                      <li key={field}>{message}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-2 text-sm text-red-700">
                  {error.message || 'An error occurred'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {submitSuccess && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Form submitted successfully! Redirecting to submissions...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={() => form.reset()}
          disabled={isSubmitting}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;