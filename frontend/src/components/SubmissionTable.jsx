import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye, ChevronLeft, ChevronRight, ArrowUpDown, Download, Edit, Trash2 } from 'lucide-react';
import SubmissionModal from './SubmissionModal';
import EditSubmissionModal from './EditSubmissionModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { api } from '../services/api';

const columnHelper = createColumnHelper();

const SubmissionsTable = ({ 
  data, 
  pagination, 
  currentSort,
  onPageChange, 
  onLimitChange,
  onSortChange 
}) => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [deletingSubmission, setDeletingSubmission] = useState(null);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: api.deleteSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      setDeletingSubmission(null);
    },
  });

  const exportToCSV = () => {
    if (data.length === 0) return;

    // Get all keys from first submission
    const keys = Object.keys(data[0]);
    
    // Create CSV header
    const header = keys.join(',');
    
    // Create CSV rows
    const rows = data.map(submission => {
      return keys.map(key => {
        let value = submission[key];
        
        // Handle arrays
        if (Array.isArray(value)) {
          value = value.join('; ');
        }
        
        // Handle strings with commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          value = `"${value.replace(/"/g, '""')}"`;
        }
        
        return value;
      }).join(',');
    });
    
    // Combine header and rows
    const csv = [header, ...rows].join('\n');
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `submissions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    columnHelper.accessor('id', {
      header: 'Submission ID',
      cell: (info) => (
        <span className="font-mono text-sm">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created Date',
      cell: (info) => (
        <span className="text-sm text-gray-600">
          {new Date(info.getValue()).toLocaleString()}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (props) => (
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedSubmission(props.row.original)}
            className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setEditingSubmission(props.row.original)}
            className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-amber-700 bg-white hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeletingSubmission(props.row.original)}
            className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No submissions found</p>
        <p className="text-gray-400 text-sm mt-2">
          {pagination.totalItems === 0 
            ? 'Submit the form to see submissions here'
            : 'Try adjusting your search terms'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">Show:</label>
            <select
              value={pagination.itemsPerPage}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-700 dark:text-gray-300">entries</span>
          </div>

          <button
            onClick={() => onSortChange(currentSort === 'asc' ? 'desc' : 'asc')}
            className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <ArrowUpDown className="w-4 h-4 mr-1" />
            Sort: {currentSort === 'asc' ? 'Oldest First' : 'Newest First'}
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Total: {pagination.totalItems} submission{pagination.totalItems !== 1 ? 's' : ''}
          </div>
          
          <button
            onClick={exportToCSV}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:focus:ring-offset-gray-900"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap dark:text-gray-300"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Page {pagination.currentPage} of {pagination.totalPages}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>
          <button
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Modals */}
      {selectedSubmission && (
        <SubmissionModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
      
      {editingSubmission && (
        <EditSubmissionModal
          submission={editingSubmission}
          onClose={() => setEditingSubmission(null)}
        />
      )}
      
      {deletingSubmission && (
        <DeleteConfirmModal
          submission={deletingSubmission}
          onClose={() => setDeletingSubmission(null)}
          onConfirm={() => deleteMutation.mutate(deletingSubmission.id)}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
};

export default SubmissionsTable;