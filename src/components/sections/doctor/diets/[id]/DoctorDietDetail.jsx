'use client';

import {
  ArrowLeft,
  Tag,
  User,
  Calendar,
  FileText,
  Utensils,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { useGetAllDiets } from '@/hooks/diets/useGetAllDiets';

export default function DoctorDietDetail({ params, role }) {
  const { id } = params;

  const { dietsData, isLoading, error } = useGetAllDiets();
  const diet = dietsData.find((d) => d._id === id);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-500">Cargando información...</p>
        </div>
      </div>
    );
  }

  if (error || !diet) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="space-y-4 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <p className="text-gray-600">Error al cargar la dieta</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-full overflow-auto bg-linear-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/${role}/diets`}
          className="mb-6 inline-flex items-center gap-2 font-medium text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver a Dietas
        </Link>

        {/* Hero section with image */}
        {diet?.images?.[0] && (
          <div className="relative mb-8 overflow-hidden rounded-2xl shadow-lg">
            <div className="absolute inset-0 z-10 bg-linear-to-b from-transparent via-transparent to-black/20"></div>
            <img
              src={diet.images[0]}
              alt={diet.name}
              className="h-64 w-full object-cover md:h-80"
            />
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-5xl px-0">
        {/* Title section */}
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{diet?.name}</h1>

          {/* Meta info grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {diet?.category && (
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-gray-300">
                <div className="rounded-lg bg-blue-50 p-2">
                  <Tag className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs tracking-wide text-gray-500 uppercase">Categoría</p>
                  <p className="text-sm font-semibold text-gray-900">{diet.category}</p>
                </div>
              </div>
            )}

            {/* Doctor Name */}
            {diet?.doctor?.fullName && (
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-gray-300">
                <div className="rounded-lg bg-green-50 p-2">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs tracking-wide text-gray-500 uppercase">Doctor</p>
                  <p className="text-sm font-semibold text-gray-900">Dr. {diet.doctor.fullName}</p>
                </div>
              </div>
            )}

            {/* Assigned Date */}
            {diet?.createdAt && (
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-gray-300">
                <div className="rounded-lg bg-purple-50 p-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs tracking-wide text-gray-500 uppercase">Creado</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {new Date(diet.createdAt).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-6">
          {/* Description section */}
          {diet?.description && (
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 p-2">
                  <FileText className="h-5 w-5 text-gray-700" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Descripción</h2>
              </div>
              <p className="leading-relaxed text-gray-700">{diet.description}</p>
            </section>
          )}

          {/* Benefits section */}
          {diet?.benefits && (
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Beneficios</h2>
              </div>
              <p className="leading-relaxed text-gray-700">{diet.benefits}</p>
            </section>
          )}

          {/* Instructions section */}
          {diet?.instructions && (
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <Utensils className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Instrucciones</h2>
              </div>
              <p className="leading-relaxed whitespace-pre-line text-gray-700">
                {diet.instructions}
              </p>
            </section>
          )}

          {/* Ingredients section */}
          {diet?.ingredients?.length > 0 && (
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Ingredientes</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {diet.ingredients.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Allowed foods section */}
          {diet?.allowedFoods?.items?.length > 0 && (
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Alimentos Permitidos</h2>
              </div>
              <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {diet.allowedFoods.items.map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3"
                  >
                    <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-green-600" />
                    <span className="text-gray-700">{i}</span>
                  </div>
                ))}
              </div>
              {diet.allowedFoods.note && (
                <div className="rounded-lg border-l-2 border-gray-300 bg-gray-50 p-3">
                  <p className="text-sm text-gray-600 italic">{diet.allowedFoods.note}</p>
                </div>
              )}
            </section>
          )}

          {/* Allowed liquids section */}
          {diet?.allowedLiquids?.items?.length > 0 && (
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Líquidos Permitidos</h2>
              </div>
              <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {diet.allowedLiquids.items.map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3"
                  >
                    <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-blue-600" />
                    <span className="text-gray-700">{i}</span>
                  </div>
                ))}
              </div>
              {diet.allowedLiquids.note && (
                <div className="rounded-lg border-l-2 border-gray-300 bg-gray-50 p-3">
                  <p className="text-sm text-gray-600 italic">{diet.allowedLiquids.note}</p>
                </div>
              )}
            </section>
          )}

          {/* Forbidden foods section */}
          {diet?.forbiddenFoods?.items?.length > 0 && (
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-red-100 p-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Alimentos Prohibidos</h2>
              </div>
              <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {diet.forbiddenFoods.items.map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3"
                  >
                    <XCircle className="mt-1 h-4 w-4 shrink-0 text-red-600" />
                    <span className="text-gray-700">{i}</span>
                  </div>
                ))}
              </div>
              {diet.forbiddenFoods.note && (
                <div className="rounded-lg border-l-2 border-gray-300 bg-gray-50 p-3">
                  <p className="text-sm text-gray-600 italic">{diet.forbiddenFoods.note}</p>
                </div>
              )}
            </section>
          )}

          {/* Forbidden liquids section */}
          {diet?.forbiddenLiquids?.items?.length > 0 && (
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-red-100 p-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Líquidos Prohibidos</h2>
              </div>
              <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {diet.forbiddenLiquids.items.map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3"
                  >
                    <XCircle className="mt-1 h-4 w-4 shrink-0 text-red-600" />
                    <span className="text-gray-700">{i}</span>
                  </div>
                ))}
              </div>
              {diet.forbiddenLiquids.note && (
                <div className="rounded-lg border-l-2 border-gray-300 bg-gray-50 p-3">
                  <p className="text-sm text-gray-600 italic">{diet.forbiddenLiquids.note}</p>
                </div>
              )}
            </section>
          )}

          {/* Duration section */}
          {diet?.duration && (
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-orange-100 p-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Duración</h2>
              </div>
              <p className="leading-relaxed text-gray-700">{diet.duration}</p>
            </section>
          )}

          {/* Medical notes section */}
          {diet?.notes && (
            <section className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 md:p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-blue-200 p-2">
                  <AlertCircle className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-semibold text-blue-900">Notas del Médico</h2>
              </div>
              <p className="leading-relaxed whitespace-pre-line text-blue-900">{diet.notes}</p>
            </section>
          )}
        </div>

        {/* Spacing at bottom */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}
