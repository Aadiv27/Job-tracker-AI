import React from 'react';

export function Input({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  disabled = false,
  className = '',
  ...props
}) {
  const baseStyles = 'w-full px-4 py-2 border border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400';

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`${baseStyles} ${className}`}
      {...props}
    />
  );
}
