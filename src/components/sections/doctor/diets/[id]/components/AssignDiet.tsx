/* Block comment: Multi Select Patients Dropdown */

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AssignDiet() {
  /* State: Dropdown control */
  const [open, setOpen] = useState(false);

  /* Block comment: Mock patients list */
  const patients = [
    { id: 'p1', name: 'Carlos de Leon' },
    { id: 'p2', name: 'Jaime Lannister' },
    { id: 'p3', name: 'María González' },
    { id: 'p4', name: 'Luis Hernández' },
    { id: 'p5', name: 'Ana López' },
    { id: 'p6', name: 'Roberto Martínez' },
    { id: 'p7', name: 'Isabel Herrera' },
    { id: 'p8', name: 'Juan Pérez' },
    /* Add as many as needed */
  ];

  /* State: Selected list */
  const [selected, setSelected] = useState<string[]>([]);

  /* Block comment: Toggle selection */
  const togglePatient = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4">
      {/* Label */}
      <label className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        Asignar dieta a pacientes
      </label>

      {/* Dropdown button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-left text-sm text-gray-900 transition-colors hover:border-gray-400"
      >
        <span>
          {selected.length === 0 && 'Seleccionar pacientes'}
          {selected.length === 1 && '1 paciente seleccionado'}
          {selected.length > 1 && `${selected.length} pacientes seleccionados`}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-600" />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-md">
          {/* Block comment: Search input */}
          <div className="sticky top-0 bg-white p-2 shadow-sm">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* List */}
          <ul className="divide-y divide-gray-100">
            {patients.map((patient) => (
              <li
                key={patient.id}
                className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-gray-50"
                onClick={() => togglePatient(patient.id)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(patient.id)}
                  onChange={() => togglePatient(patient.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{patient.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Info */}
      <p className="mt-2 text-xs text-gray-500">Selecciona uno o varios pacientes del listado.</p>
    </div>
  );
}
