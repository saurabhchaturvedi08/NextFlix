import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Finding great movies for you...', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <Loader2 className={`${sizeClasses[size]} text-purple-500 animate-spin`} />
      {message && (
        <p className="text-gray-400 text-center max-w-md">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;