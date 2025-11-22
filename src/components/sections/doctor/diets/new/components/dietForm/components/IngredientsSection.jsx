import { Plus } from 'lucide-react';
import React from 'react';

function IngredientsSection({
  ingredients,
  handleIngredientChange,
  handleRemoveIngredient,
  handleAddIngredient,
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
        <div className="h-6 w-1 rounded-full bg-yellow-600"></div>
        Ingredientes
        <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
      </h2>

      <div>
        <label className="mb-4 block text-sm font-semibold text-gray-700">
          Lista de Ingredientes
        </label>

        <div className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder={`Ej: ${index === 0 ? '2 pechugas de pollo' : index === 1 ? '1 taza de arroz integral' : 'Ingrediente'}`}
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600 transition-colors hover:bg-red-100"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddIngredient}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400"
        >
          <Plus className="h-4 w-4" />
          Agregar Ingrediente
        </button>

        <p className="mt-3 text-xs text-gray-500">
          Haz clic en el botón para agregar más ingredientes
        </p>
      </div>
    </section>
  );
}

export default IngredientsSection;
