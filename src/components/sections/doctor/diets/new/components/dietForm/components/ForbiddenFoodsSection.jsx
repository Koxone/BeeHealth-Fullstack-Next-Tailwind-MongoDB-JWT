import { CheckCircle, Plus, X } from 'lucide-react';
import React from 'react';

function ForbiddenFoodsSection() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      {/* header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-red-100 p-2">
          <X className="h-5 w-5 text-red-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Alimentos Prohibidos</h2>
      </div>

      {/* items list empty */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">{/* empty at start */}</div>

      {/* add item input */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Ej. Chocolate"
          className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          disabled
        />
        <button
          type="button"
          className="flex items-center justify-center rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white opacity-50"
          disabled
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* note */}
      <label className="mb-1 block text-sm font-medium text-gray-700">Nota opcional</label>
      <textarea
        placeholder="Escribe una nota para esta sección"
        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm"
        rows={3}
        disabled
      />

      {/* save button */}
      <div className="mt-3 flex items-center gap-3">
        <button className="rounded-lg bg-red-600 px-4 py-2 text-white opacity-50" disabled>
          Guardar
        </button>
      </div>
    </section>
  );
}

export default ForbiddenFoodsSection;
