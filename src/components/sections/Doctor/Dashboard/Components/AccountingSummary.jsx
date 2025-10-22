'use client';

/* imports */
import { Users, Pill, AlertCircle, ChevronRight } from 'lucide-react';

/* card */
export default function AccountingSummary({ data, onVerMas }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Resumen Contable</h2>
        <button
          onClick={onVerMas}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-blue-600 transition hover:bg-blue-50 active:scale-95"
        >
          Ver más
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Consultas</p>
              <p className="font-semibold text-gray-900">{data.consultas} pacientes</p>
            </div>
          </div>
          <p className="text-lg font-bold text-blue-600">${data.ingresosConsultas}</p>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2">
              <Pill className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Medicamentos</p>
              <p className="font-semibold text-gray-900">{data.medicamentosVendidos} vendidos</p>
            </div>
          </div>
          <p className="text-lg font-bold text-green-600">${data.ingresosMedicamentos}</p>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-yellow-50 p-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-yellow-100 p-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pendiente de cobro</p>
              <p className="font-semibold text-gray-900">1 consulta</p>
            </div>
          </div>
          <p className="text-lg font-bold text-yellow-600">${data.pendientesCobro}</p>
        </div>
      </div>
    </div>
  );
}
