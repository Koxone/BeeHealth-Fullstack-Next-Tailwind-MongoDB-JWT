import React from 'react';

function NotesSection() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
        <div className="h-6 w-1 rounded-full bg-purple-600"></div>
        Notas
        <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
      </h2>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Recomendaciones Especiales
        </label>
        <textarea
          rows="5"
          className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Restricciones dietéticas, alergias, contraindicaciones, consejos especiales para el paciente, notas médicas relevantes..."
        ></textarea>
        <p className="mt-2 text-xs text-gray-500">Las notas serán visibles para el paciente</p>
      </div>
    </section>
  );
}

export default NotesSection;
