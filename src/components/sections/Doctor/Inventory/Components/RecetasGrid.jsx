'use client';

/* grid recetas */
import { FileText, Edit2, Trash2 } from 'lucide-react';

export default function RecetasGrid({ items, getStockStatus, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((receta) => {
        const stockStatus = getStockStatus(receta.stock, receta.minimo);
        return (
          <div
            key={receta.id}
            className="rounded-lg border-2 border-gray-200 p-4 transition hover:border-green-300"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="rounded-lg bg-green-50 p-2">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(receta)}
                  className="rounded p-1.5 transition hover:bg-blue-50 active:scale-95"
                >
                  <Edit2 className="h-4 w-4 text-blue-600" />
                </button>
                <button
                  onClick={() => onDelete(receta)}
                  className="rounded p-1.5 transition hover:bg-red-50 active:scale-95"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">{receta.tipo}</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Stock:</span>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}
              >
                {receta.stock} / {receta.minimo}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
