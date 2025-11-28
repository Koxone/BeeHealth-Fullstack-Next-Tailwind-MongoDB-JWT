import React from 'react';

function Select({ question, required, value, options }) {
  console.log(options);
  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
      <select
        required={required}
        value={value ?? ''} // Fallback
        onChange={(e) => onChange(id, e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3"
      >
        <option value="">Seleccione</option>
        {options?.map((opt) => (
          <option key={opt?._id} value={typeof opt === 'object' ? opt.value : opt}>
            {typeof opt === 'object' ? opt.label : opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
