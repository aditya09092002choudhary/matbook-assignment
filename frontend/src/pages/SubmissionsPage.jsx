import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import SubmissionTable from '../components/SubmissionTable';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const SubmissionsPage = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['submissions', pagination],
    queryFn: () => api.getSubmissions(pagination),
  });

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
  };

  const handleSortChange = (sortOrder) => {
    setPagination((prev) => ({ ...prev, sortOrder, page: 1 }));
  };

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
        title="Failed to load submissions" 
        message={error.message} 
      />
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Form Submissions
          </h2>
          
          <SubmissionTable
            data={data.data}
            pagination={data.pagination}
            currentSort={pagination.sortOrder}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            onSortChange={handleSortChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;