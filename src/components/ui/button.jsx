import React from 'react';

export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100',
    ghost: 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400',
  };
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
