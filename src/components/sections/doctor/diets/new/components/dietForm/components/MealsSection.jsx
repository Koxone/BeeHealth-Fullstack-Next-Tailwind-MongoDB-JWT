import React from 'react';

export default function MealsSection() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
        <div className="h-6 w-1 rounded-full bg-orange-600"></div>
        Alimentos
      </h2>

      <div className="space-y-6">
        {/* Allowed Foods - Optional */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Alimentos Permitidos
            <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
          </label>
          <textarea
            rows="3"
            value={allowedFoods}
            onChange={(e) => setAllowedFoods(e.target.value)}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingresa cada alimento en una nueva línea&#10;Ej:&#10;Pollo&#10;Arroz integral&#10;Brócoli"
          ></textarea>
          <p className="mt-2 text-xs text-gray-500">Ingresa cada alimento en una línea nueva</p>

          {/* Allowed Foods Note - Optional */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Nota sobre alimentos permitidos
              <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ej: Orgánicos de preferencia, sin conservantes"
            />
          </div>
        </div>

        {/* Forbidden Foods - Optional */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Alimentos Prohibidos
            <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
          </label>
          <textarea
            rows="3"
            value={forbiddenFoods}
            onChange={(e) => setForbiddenFoods(e.target.value)}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingresa cada alimento en una nueva línea&#10;Ej:&#10;Alimentos fritos&#10;Azúcares refinados&#10;Bebidas alcohólicas"
          ></textarea>
          <p className="mt-2 text-xs text-gray-500">Ingresa cada alimento en una línea nueva</p>

          {/* Forbidden Foods Note - Optional */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Nota sobre alimentos prohibidos
              <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ej: Pueden causar inflamación, aumentan glucosa en sangre"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
