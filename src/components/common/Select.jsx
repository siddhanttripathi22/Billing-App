// src/components/common/Select.js
import React from 'react';

function Select({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select an option',
  disabled = false,
  className = ''
}) {
  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`
        block w-full rounded-md border-gray-300 shadow-sm 
        focus:border-blue-500 focus:ring-blue-500 
        disabled:bg-gray-100 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;