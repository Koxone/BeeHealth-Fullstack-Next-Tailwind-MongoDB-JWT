import { Apple } from 'lucide-react';
import DietCardActions from './components/DietCardActions';

export default function DietCard({ diet }) {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-lg md:p-6">
      {/* Image/Icon */}
      <div className="relative mb-4 flex h-32 w-full items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-green-100 to-blue-100">
        <Apple className="h-12 w-12 text-green-600 transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-linear-to-t from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Info */}
      <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
        {diet.nombre}
      </h3>
      <div className="mb-4 space-y-2 text-sm">
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Asignado a:</span> {diet.pacientes} Pacientes
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Duración:</span> {diet.duracion}
        </p>
      </div>

      {/* Actions */}
      <DietCardActions id={diet.id} />
    </div>
  );
}
