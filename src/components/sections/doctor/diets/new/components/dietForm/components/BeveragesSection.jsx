import React from 'react';

function BeveragesSection({
  allowedLiquids,
  setAllowedLiquids,
  forbiddenLiquids,
  setForbiddenLiquids,
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
        <div className="h-6 w-1 rounded-full bg-cyan-600"></div>
        Bebidas
      </h2>

      <div className="space-y-6">
        {/* Allowed Liquids - Optional */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Líquidos Permitidos
            <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
          </label>
          <textarea
            rows="3"
            value={allowedLiquids}
            onChange={(e) => setAllowedLiquids(e.target.value)}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingresa cada bebida en una nueva línea&#10;Ej:&#10;Agua&#10;Té verde&#10;Café sin azúcar"
          ></textarea>
          <p className="mt-2 text-xs text-gray-500">Ingresa cada bebida en una línea nueva</p>

          {/* Allowed Liquids Note - Optional */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Nota sobre líquidos permitidos
              <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ej: Mínimo 2 litros de agua al día"
            />
          </div>
        </div>

        {/* Forbidden Liquids - Optional */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Líquidos Prohibidos
            <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
          </label>
          <textarea
            rows="3"
            value={forbiddenLiquids}
            onChange={(e) => setForbiddenLiquids(e.target.value)}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingresa cada bebida en una nueva línea&#10;Ej:&#10;Refrescos&#10;Jugos industriales&#10;Alcohol"
          ></textarea>
          <p className="mt-2 text-xs text-gray-500">Ingresa cada bebida en una línea nueva</p>

          {/* Forbidden Liquids Note - Optional */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Nota sobre líquidos prohibidos
              <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ej: Contienen azúcares añadidos y conservantes"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeveragesSection;
