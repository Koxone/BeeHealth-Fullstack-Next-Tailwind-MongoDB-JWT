import React from 'react';

function DescriptionSection() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
        <div className="h-6 w-1 rounded-full bg-green-600"></div>
        Detalles del Plan
      </h2>

      <div className="space-y-6">
        {/* Description - Optional */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Descripción General
            <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
          </label>
          <textarea
            rows="4"
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Describe el objetivo, beneficios y características principales del plan nutricional..."
          ></textarea>
          <p className="mt-2 text-xs text-gray-500">Proporciona una descripción clara del plan</p>
        </div>

        {/* Benefits - Optional */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Beneficios
            <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
          </label>
          <textarea
            rows="3"
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Beneficios esperados de seguir este plan (ej: aumento de energía, mejora de digestión)..."
          ></textarea>
        </div>

        {/* Instructions - Optional */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Instrucciones
            <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
          </label>
          <textarea
            rows="3"
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Cómo seguir el plan, horarios de comidas, preparación de alimentos..."
          ></textarea>
        </div>
      </div>
    </section>
  );
}

export default DescriptionSection;
