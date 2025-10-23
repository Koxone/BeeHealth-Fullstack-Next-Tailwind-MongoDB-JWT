'use client';

/* tabs */
import { Pill, FileText, Syringe } from 'lucide-react';

export default function Tabs({ active, onChange }) {
  return (
    <div className="grid grid-cols-3 border-b border-gray-200">
      <button
        onClick={() => onChange('medicamentos')}
        className={`flex items-center justify-center gap-2 px-2 py-3 font-medium transition ${active === 'medicamentos' ? 'bg-blue-500 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
      >
        <Pill className="h-5 w-5" />
        <span className="text-sm md:text-base">Medicamentos</span>
      </button>
      <button
        onClick={() => onChange('recetas')}
        className={`flex items-center justify-center gap-2 px-2 py-3 font-medium transition ${active === 'recetas' ? 'bg-green-500 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
      >
        <FileText className="h-5 w-5" />
        <span className="text-sm md:text-base">Recetas</span>
      </button>
      <button
        onClick={() => onChange('suministros')}
        className={`flex items-center justify-center gap-2 px-2 py-3 font-medium transition ${active === 'suministros' ? 'bg-purple-500 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
      >
        <Syringe className="h-5 w-5" />
        <span className="text-sm md:text-base">Suministros</span>
      </button>
    </div>
  );
}
