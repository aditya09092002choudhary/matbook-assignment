import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { api } from '../services/api';
import DynamicForm from './DynamicForm';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const EditSubmissionModal = ({ submission, onClose }) => {
  const queryClient = useQueryClient();

  const { data: schema, isLoading } = useQuery({
    queryKey: ['formSchema'],
    queryFn: api.getFormSchema,
  });

  const updateMutation = useMutation({
    mutationFn: (data) => api.updateSubmission(submission.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      onClose();
    },
  });

  // Extract form data from submission (remove id, createdAt, updatedAt)
  const getFormData = () => {
    const { id, createdAt, updatedAt, ...formData } = submission;
    return formData;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative inline-block w-full max-w-3xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white dark:bg-gray-800 rounded-lg shadow-xl sm:my-8 sm:align-middle sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="w-full mt-3 sm:mt-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
              Edit Submission: {submission.id}
            </h3>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="max-h-[70vh] overflow-y-auto">
                <DynamicForm
                  schema={{
                    ...schema,
                    fields: schema.fields.map(field => ({
                      ...field,
                      defaultValue: getFormData()[field.name]
                    }))
                  }}
                  onSubmit={updateMutation.mutate}
                  isSubmitting={updateMutation.isPending}
                  error={updateMutation.error}
                  initialValues={getFormData()}
                  submitButtonText="Update Submission"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubmissionModal;