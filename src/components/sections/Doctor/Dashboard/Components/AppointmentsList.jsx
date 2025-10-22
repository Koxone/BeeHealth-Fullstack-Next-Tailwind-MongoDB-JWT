'use client';

/* imports */
import { RefreshCw, X, Clock, FileText } from 'lucide-react';

/* list */
export default function AppointmentsList({ citas, onReagendar, onCancelar, getEstadoBadge }) {
  return (
    <div className="space-y-3">
      {citas.map((cita) => (
        <div
          key={cita.id}
          className={`rounded-xl border-2 p-4 transition ${
            cita.estado === 'Cancelada'
              ? 'border-gray-200 bg-gray-50 opacity-60'
              : 'border-gray-200 bg-white hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-4">
            {/* avatar */}
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 font-semibold text-white">
              {cita.avatar}
            </div>

            {/* info */}
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <h3 className="truncate font-semibold text-gray-900">{cita.paciente}</h3>
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getEstadoBadge(cita.estado)}`}
                >
                  {cita.estado}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{cita.hora}</span>
                </div>
                <div className="hidden items-center gap-1 sm:flex">
                  <FileText className="h-4 w-4" />
                  <span>{cita.tipo}</span>
                </div>
              </div>
            </div>

            {/* actions */}
            {cita.estado !== 'Cancelada' && (
              <div className="flex flex-shrink-0 gap-2">
                <button
                  onClick={() => onReagendar(cita)}
                  className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 active:scale-95"
                  title="Reagendar"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onCancelar(cita)}
                  className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 active:scale-95"
                  title="Cancelar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
