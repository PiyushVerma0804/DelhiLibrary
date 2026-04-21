import React from 'react';

export const EmptyState = ({ 
  icon, 
  title, 
  description, 
  action, 
  actionText 
}) => {
  return (
    <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg">
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <button
          onClick={action}
          className="px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 ${sizeClasses[size]}`}></div>
  );
};

export const Card = ({ children, className = '', hoverable = false, onClick }) => {
  const baseClasses = "border rounded-lg bg-white overflow-hidden";
  const hoverClasses = hoverable ? "cursor-pointer hover:shadow-md transition-shadow" : "";
  const combinedClasses = `${baseClasses} ${hoverClasses} ${className}`;

  if (onClick) {
    return (
      <div className={combinedClasses} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};
