import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ title = 'Error', message }) => {
  return (
    <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-300">{title}</h3>
          {message && (
            <div className="mt-2 text-sm text-red-700 dark:text-red-400">
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;