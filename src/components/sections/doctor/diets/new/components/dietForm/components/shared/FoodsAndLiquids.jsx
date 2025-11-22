import { Plus, X } from 'lucide-react';
import React from 'react';

function FoodsAndLiquids({ title, Icon, variant = 'success', placeholder }) {
  // Styles map
  const variantStyles = {
    success: {
      background: 'bg-green-100',
      text: 'text-green-600',
      buttons: 'bg-green-600',
    },
    warning: {
      background: 'bg-red-100',
      text: 'text-red-600',
      buttons: 'bg-red-600',
    },
  };

  const styles = variantStyles[variant];
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className={`rounded-lg ${styles.background} p-2`}>
          <Icon className={`h-5 w-5 ${styles.text}`} />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>

      {/* Items list empty */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">{/* empty at start */}</div>

      {/* Add item input */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 p-2 text-sm"
        />
        <button
          type="button"
          className={`flex items-center justify-center rounded-lg ${styles.buttons} px-3 py-2 text-sm font-medium text-white opacity-50`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Note */}
      <label className="mb-1 block text-sm font-medium text-gray-700">Nota opcional</label>
      <textarea
        placeholder="Escribe una nota para esta sección"
        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm"
        rows={3}
      />

      {/* Save button */}
      <div className="mt-3 flex items-center gap-3">
        <button className={`rounded-lg ${styles.buttons} px-4 py-2 text-white opacity-50`}>
          Guardar
        </button>
      </div>
    </section>
  );
}

export default FoodsAndLiquids;
