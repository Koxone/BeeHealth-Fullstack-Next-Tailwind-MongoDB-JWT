'use client';

/* table */
import { Eye } from 'lucide-react';

export default function PatientsTable({ items, onView }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nombre</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Correo</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Teléfono</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rol</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.length > 0 ? (
            items.map((patient) => (
              <tr key={patient._id} className="transition hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{patient.fullName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{patient.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{patient.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-600 capitalize">{patient.role}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onView(patient._id)}
                    className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
                  >
                    <Eye className="h-4 w-4" />
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-6 text-center text-sm text-gray-500">
                No se encontraron pacientes
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
