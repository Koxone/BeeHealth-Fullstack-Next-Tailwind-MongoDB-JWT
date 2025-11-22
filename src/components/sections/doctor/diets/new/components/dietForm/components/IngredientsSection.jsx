import React from 'react';
import { Plus, X } from 'lucide-react';

export default function IngredientsSection() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md md:p-4">
      {/* Title */}
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Ingredientes</h2>

      {/* Empty list */}
      <div className="space-y-4">
        {/* Empty item */}
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
          {/* Input */}
          <input
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
            placeholder="Ingrediente"
          />

          {/* Remove button */}
          <button className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Add button */}
        <button className="bg-medtrack-blue-solid hover:bg-medtrack-blue-hover flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors">
          <Plus className="h-4 w-4" />
          Agregar ingrediente
        </button>

        {/* Save and cancel */}
        <div className="flex items-center gap-3 pt-2">
          <button className="bg-medtrack-green-secondary-solid hover:bg-medtrack-green-secondary-hover rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity disabled:opacity-50">
            Guardar
          </button>

          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100">
            Cancelar
          </button>
        </div>
      </div>
    </section>
  );
}
