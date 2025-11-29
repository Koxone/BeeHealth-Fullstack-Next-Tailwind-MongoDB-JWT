'use client';

import { useState } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

export default function AssignSection() {
  const [mode, setMode] = useState(null); // 'diet' | 'workout'
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [assigned, setAssigned] = useState([]); // Feedback visual
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock data
  const mockDiets = [
    { id: '1', name: 'Dieta Keto' },
    { id: '2', name: 'Dieta Mediterránea' },
    { id: '3', name: 'Dieta Detox' },
  ];

  const mockWorkouts = [
    { id: 'w1', name: 'Plancha Abdominal' },
    { id: 'w2', name: 'Sentadillas' },
    { id: 'w3', name: 'Cardio HIIT' },
  ];

  const data = mode === 'diet' ? mockDiets : mockWorkouts;

  // Toggle
  const toggleItem = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // Assign action
  const handleAssign = () => {
    const assignedItems = data.filter((item) => selected.includes(item.id));

    setAssigned((prev) => [...prev, ...assignedItems]);

    setSelected([]);
    setShowSuccess(true);
    setOpen(false);

    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Remove assigned item
  const removeAssigned = (id) => {
    setAssigned((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="bg-beehealth-body-main flex flex-col rounded-lg border border-gray-400 p-4">
      {/* Title */}
      <label className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        Asignar dieta o ejercicio
      </label>

      {/* Mode buttons */}
      <div className="mb-2 flex gap-2">
        <button
          onClick={() => {
            setMode('diet');
            setSelected([]);
            setOpen(false);
          }}
          className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover flex-1 rounded-lg px-4 py-2 text-xs font-medium text-white active:scale-95"
        >
          Dieta
        </button>

        <button
          onClick={() => {
            setMode('workout');
            setSelected([]);
            setOpen(false);
          }}
          className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex-1 rounded-lg px-4 py-2 text-xs font-medium text-white active:scale-95"
        >
          Ejercicio
        </button>
      </div>

      {/* Nothing selected yet */}
      {!mode && (
        <p className="text-xs text-gray-500">Selecciona Dieta o Ejercicio para continuar.</p>
      )}

      {/* Dropdown button */}
      {mode && (
        <button
          onClick={() => setOpen(!open)}
          className="bg-beehealth-body-main flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-left text-sm text-gray-900 hover:border-gray-400"
        >
          <span>
            {selected.length === 0 && `Seleccionar ${mode === 'diet' ? 'dieta' : 'ejercicio'}`}
            {selected.length === 1 && '1 seleccionado'}
            {selected.length > 1 && `${selected.length} seleccionados`}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </button>
      )}

      {/* Dropdown content */}
      {open && mode && (
        <div className="bg-beehealth-body-main mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-gray-400 shadow-md">
          <div className="bg-beehealth-body-main sticky top-0 p-2 shadow-sm">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
            />
          </div>

          <ul className="divide-y divide-gray-100">
            {data.map((item) => (
              <li
                key={item.id}
                className="hover:bg-beehealth-body-main flex cursor-pointer items-center gap-3 px-3 py-2"
                onClick={() => toggleItem(item.id)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => toggleItem(item.id)}
                  className="text-beehealth-blue-primary-solid h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Assign button */}
      {mode && (
        <button
          onClick={handleAssign}
          disabled={selected.length === 0}
          className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover mt-2 rounded-md px-3 py-2 text-sm text-white disabled:opacity-50"
        >
          Asignar {mode === 'diet' ? 'dieta' : 'ejercicio'}
        </button>
      )}

      {/* Success message */}
      {showSuccess && (
        <div className="mt-2 flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          <Check className="h-4 w-4" />
          <span>Asignación completada.</span>
        </div>
      )}

      {/* Assigned items list */}
      {assigned.length > 0 && (
        <div className="mt-3 space-y-2">
          <p className="text-xs font-semibold text-gray-600">Asignados:</p>

          <div className="flex flex-wrap gap-2">
            {assigned.map((item) => (
              <div
                key={item.id}
                className="bg-beehealth-blue-secondary-solid flex items-center gap-2 rounded-lg px-3 py-1 text-xs font-medium text-white"
              >
                {item.name}

                <button onClick={() => removeAssigned(item.id)} className="hover:text-red-300">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
