'use client';

/* table medicamentos */
import { Edit2, Trash2 } from 'lucide-react';

export default function MedicamentosTable({
  items,
  getStockStatus,
  getCaducidadStatus,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-2 py-3 text-left text-sm font-semibold text-gray-700">Medicamento</th>
            <th className="hidden px-2 py-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
              Categoría
            </th>
            <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">Stock</th>
            <th className="hidden px-2 py-3 text-right text-sm font-semibold text-gray-700 lg:table-cell">
              Precio
            </th>
            <th className="hidden px-2 py-3 text-center text-sm font-semibold text-gray-700 md:table-cell">
              Caducidad
            </th>
            <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((med) => {
            const stockStatus = getStockStatus(med.stock, med.minimo);
            const cadStatus = getCaducidadStatus(med.caducidad);
            return (
              <tr key={med.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-2 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{med.nombre}</p>
                    <p className="text-xs text-gray-500">{med.ubicacion}</p>
                  </div>
                </td>
                <td className="hidden px-2 py-3 text-sm text-gray-600 md:table-cell">
                  {med.categoria}
                </td>
                <td className="px-2 py-3 text-center">
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}
                  >
                    {med.stock} / {med.minimo}
                  </span>
                </td>
                <td className="hidden px-2 py-3 text-right text-sm text-gray-900 lg:table-cell">
                  ${med.precio}
                </td>
                <td className="hidden px-2 py-3 text-center md:table-cell">
                  <span
                    className={`inline-block rounded px-2 py-1 text-xs ${cadStatus.bg} ${cadStatus.color}`}
                  >
                    {med.caducidad}
                  </span>
                </td>
                <td className="px-2 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onEdit(med)}
                      className="rounded p-1.5 transition hover:bg-blue-50 active:scale-95"
                    >
                      <Edit2 className="h-4 w-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => onDelete(med)}
                      className="rounded p-1.5 transition hover:bg-red-50 active:scale-95"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
