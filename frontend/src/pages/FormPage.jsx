import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import DynamicForm from '../components/DynamicForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const FormPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: schema, isLoading, error } = useQuery({
    queryKey: ['formSchema'],
    queryFn: api.getFormSchema,
  });

  const submitMutation = useMutation({
    mutationFn: api.submitForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      navigate('/submissions');
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage 
        title="Failed to load form" 
        message={error.message} 
      />
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {schema.title}
          </h2>
          <p className="text-gray-600 mb-6">{schema.description}</p>
          
          <DynamicForm 
            schema={schema} 
            onSubmit={submitMutation.mutate}
            isSubmitting={submitMutation.isPending}
            error={submitMutation.error}
          />
        </div>
      </div>
    </div>
  );
};

export default FormPage;