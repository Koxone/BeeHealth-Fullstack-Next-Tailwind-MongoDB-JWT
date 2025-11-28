import React from 'react';

function Radio({ question, required, value, options }) {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
      <div className="flex flex-wrap gap-4">
        {options?.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <label key={String(val)} className="flex items-center gap-2">
              <input
                type="radio"
                name={`q-${question?.id}`}
                value={val}
                checked={value === val}
                onChange={() => onChange(question?.id, val)}
              />
              {lbl}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default Radio;
