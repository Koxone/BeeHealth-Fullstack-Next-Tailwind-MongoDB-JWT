'use client';

/* add edit modal */
import { X } from 'lucide-react';

export default function AddEditModal({
  open,
  onClose,
  activeTab,
  editingItem,
  medicamentoForm,
  setMedicamentoForm,
  recetaForm,
  setRecetaForm,
  suministroForm,
  setSuministroForm,
  onSaveMedicamento,
  onSaveReceta,
  onSaveSuministro,
}) {
  if (!open) return null;

  return (
    <>
      <div className="animate-fadeIn fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-slideUp pointer-events-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 flex items-center justify-between rounded-t-2xl border-b border-gray-200 bg-white px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">
              {editingItem ? 'Editar' : 'Agregar'}{' '}
              {activeTab === 'medicamentos'
                ? 'Medicamento'
                : activeTab === 'recetas'
                  ? 'Receta'
                  : 'Suministro'}
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-gray-100 active:scale-95"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {activeTab === 'medicamentos' && (
            <form onSubmit={onSaveMedicamento} className="space-y-4 p-6">
              {/* name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  required
                  value={medicamentoForm.nombre}
                  onChange={(e) =>
                    setMedicamentoForm({ ...medicamentoForm, nombre: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Metformina 850mg"
                />
              </div>
              {/* cat */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Categoría</label>
                <input
                  type="text"
                  required
                  value={medicamentoForm.categoria}
                  onChange={(e) =>
                    setMedicamentoForm({ ...medicamentoForm, categoria: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Antidiabético"
                />
              </div>
              {/* qtys */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={medicamentoForm.stock}
                    onChange={(e) =>
                      setMedicamentoForm({ ...medicamentoForm, stock: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Mínimo</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={medicamentoForm.minimo}
                    onChange={(e) =>
                      setMedicamentoForm({ ...medicamentoForm, minimo: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              {/* price */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Precio</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={medicamentoForm.precio}
                  onChange={(e) =>
                    setMedicamentoForm({ ...medicamentoForm, precio: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Fecha de Caducidad
                </label>
                <input
                  type="date"
                  required
                  value={medicamentoForm.caducidad}
                  onChange={(e) =>
                    setMedicamentoForm({ ...medicamentoForm, caducidad: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* loc */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Ubicación</label>
                <input
                  type="text"
                  required
                  value={medicamentoForm.ubicacion}
                  onChange={(e) =>
                    setMedicamentoForm({ ...medicamentoForm, ubicacion: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="A-1"
                />
              </div>
              {/* actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95"
                >
                  {editingItem ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'recetas' && (
            <form onSubmit={onSaveReceta} className="space-y-4 p-6">
              {/* type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tipo de Receta
                </label>
                <input
                  type="text"
                  required
                  value={recetaForm.tipo}
                  onChange={(e) => setRecetaForm({ ...recetaForm, tipo: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="Receta Controlada"
                />
              </div>
              {/* qtys */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={recetaForm.stock}
                    onChange={(e) => setRecetaForm({ ...recetaForm, stock: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Mínimo</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={recetaForm.minimo}
                    onChange={(e) => setRecetaForm({ ...recetaForm, minimo: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              {/* actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600 active:scale-95"
                >
                  {editingItem ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'suministros' && (
            <form onSubmit={onSaveSuministro} className="space-y-4 p-6">
              {/* name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  required
                  value={suministroForm.nombre}
                  onChange={(e) => setSuministroForm({ ...suministroForm, nombre: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                  placeholder="Jeringas 5ml"
                />
              </div>
              {/* qtys */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={suministroForm.stock}
                    onChange={(e) =>
                      setSuministroForm({ ...suministroForm, stock: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Mínimo</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={suministroForm.minimo}
                    onChange={(e) =>
                      setSuministroForm({ ...suministroForm, minimo: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              {/* price */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Precio</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={suministroForm.precio}
                  onChange={(e) => setSuministroForm({ ...suministroForm, precio: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {/* actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-purple-500 px-4 py-2 text-white transition hover:bg-purple-600 active:scale-95"
                >
                  {editingItem ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
