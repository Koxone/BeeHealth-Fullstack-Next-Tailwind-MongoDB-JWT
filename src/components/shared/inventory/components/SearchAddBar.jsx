'use client';

import { Search, Plus, Download } from 'lucide-react';

export default function SearchAddBar({ searchTerm, setSearchTerm, onAdd }) {
  return (
    <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre, categoría o ubicación..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border-2 border-gray-200 py-3 pr-4 pl-12 font-medium transition outline-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onAdd}
          className="bg-medtrack-green-solid hover:bg-medtrack-green-hover flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-md transition active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Agregar
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-95"
        >
          <Download className="h-4 w-4" />
          Exportar
        </button>
      </div>
    </div>
  );
}
