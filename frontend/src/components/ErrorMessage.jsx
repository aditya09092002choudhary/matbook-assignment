import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ title = 'Error', message }) => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          {message && (
            <div className="mt-2 text-sm text-red-700">
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;