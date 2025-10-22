'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, User, Plus, X, RefreshCw, AlertCircle, Filter } from 'lucide-react';

const appointmentsData = [
  {
    id: 1,
    fecha: '2024-10-25',
    hora: '10:00',
    medico: 'Dr. García',
    especialidad: 'Endocrinología',
    estado: 'Confirmada',
  },
  {
    id: 2,
    fecha: '2024-11-05',
    hora: '15:30',
    medico: 'Dra. Martínez',
    especialidad: 'Nutrición',
    estado: 'Pendiente',
  },
  {
    id: 3,
    fecha: '2024-09-20',
    hora: '11:00',
    medico: 'Dr. García',
    especialidad: 'Endocrinología',
    estado: 'Completada',
  },
];

export default function PatientAppointments() {
  const router = useRouter();
  const [appointments, setAppointments] = useState(appointmentsData);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Todas');

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Confirmada':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Pendiente':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Completada':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Cancelada':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleCancelClick = (apt) => {
    setSelectedAppointment(apt);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    if (selectedAppointment) {
      setAppointments(
        appointments.map((apt) =>
          apt.id === selectedAppointment.id ? { ...apt, estado: 'Cancelada' } : apt
        )
      );
      setShowCancelModal(false);
      setSelectedAppointment(null);
    }
  };

  const handleReschedule = (apt) => {
    localStorage.setItem('rescheduleAppointment', JSON.stringify(apt));
    router.push('/patient/appointments/new');
  };

  const canModify = (estado) => {
    return estado === 'Confirmada' || estado === 'Pendiente';
  };

  // Filtrar citas
  const filteredAppointments = appointments.filter((apt) => {
    if (activeFilter === 'Todas') return true;
    if (activeFilter === 'Próximas')
      return apt.estado === 'Confirmada' || apt.estado === 'Pendiente';
    if (activeFilter === 'Completadas') return apt.estado === 'Completada';
    if (activeFilter === 'Canceladas') return apt.estado === 'Cancelada';
    return true;
  });

  const filterButtons = [
    { label: 'Todas', count: appointments.length },
    {
      label: 'Próximas',
      count: appointments.filter((a) => a.estado === 'Confirmada' || a.estado === 'Pendiente')
        .length,
    },
    { label: 'Completadas', count: appointments.filter((a) => a.estado === 'Completada').length },
    { label: 'Canceladas', count: appointments.filter((a) => a.estado === 'Cancelada').length },
  ];

  return (
    <div className="min-h-screen pb-8">
      {/* Header mejorado */}
      <div className="-mx-4 -mt-4 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 px-4 pt-6 pb-8 md:rounded-2xl">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Mis Citas Médicas
              </h1>
              <p className="text-base text-gray-600 md:text-lg">
                Gestiona y programa tus consultas médicas
              </p>
            </div>
            <button
              onClick={() => router.push('/patient/appointments/new')}
              className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-medium text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
            >
              <Plus className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" />
              <span>Agendar Cita</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6">
        {/* Filtros mejorados con contadores */}
        <div className="scrollbar-hide flex items-center gap-3 overflow-x-auto pb-2">
          <Filter className="h-5 w-5 flex-shrink-0 text-gray-400" />
          {filterButtons.map((filter) => (
            <button
              key={filter.label}
              onClick={() => setActiveFilter(filter.label)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeFilter === filter.label
                  ? 'scale-105 bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'border-2 border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 active:scale-95'
              }`}
            >
              <span>{filter.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  activeFilter === filter.label
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Lista de citas mejorada */}
        {filteredAppointments.length > 0 ? (
          <div className="grid gap-4">
            {filteredAppointments.map((apt, index) => (
              <div
                key={apt.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`animate-fadeInUp rounded-2xl border-2 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-xl md:p-6 ${
                  apt.estado === 'Cancelada'
                    ? 'border-rose-200 bg-gradient-to-r from-rose-50/50 to-white'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                  {/* Información de la cita */}
                  <div className="flex-1 space-y-3">
                    {/* Fecha, hora y estado */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-900">{apt.fecha}</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1.5">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">{apt.hora}</span>
                      </div>
                      <span
                        className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${getStatusColor(apt.estado)}`}
                      >
                        {apt.estado}
                      </span>
                    </div>

                    {/* Doctor y especialidad */}
                    <div className="flex items-start gap-3 pl-1">
                      <div className="mt-0.5 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 p-2">
                        <User className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-gray-900">{apt.medico}</p>
                        <p className="text-sm text-gray-600">{apt.especialidad}</p>
                      </div>
                    </div>
                  </div>

                  {/* Botones de acción mejorados */}
                  <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                    {canModify(apt.estado) && (
                      <>
                        <button
                          onClick={() => handleReschedule(apt)}
                          className="group flex items-center justify-center gap-2 rounded-xl border-2 border-blue-600 px-5 py-2.5 text-sm font-medium whitespace-nowrap text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white active:scale-95"
                        >
                          <RefreshCw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                          <span>Reagendar</span>
                        </button>
                        <button
                          onClick={() => handleCancelClick(apt)}
                          className="group flex items-center justify-center gap-2 rounded-xl border-2 border-rose-500 px-5 py-2.5 text-sm font-medium whitespace-nowrap text-rose-600 transition-all duration-200 hover:bg-rose-500 hover:text-white active:scale-95"
                        >
                          <X className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
                          <span>Cancelar</span>
                        </button>
                      </>
                    )}

                    {apt.estado === 'Completada' && (
                      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
                        <div className="h-2 w-2 rounded-full bg-slate-400"></div>
                        <span className="text-sm font-medium text-slate-600">
                          Consulta finalizada
                        </span>
                      </div>
                    )}

                    {apt.estado === 'Cancelada' && (
                      <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-rose-500"></div>
                        <span className="text-sm font-semibold text-rose-600">Cita cancelada</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Estado vacío mejorado */
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50 p-12 text-center shadow-sm md:p-16">
            <div className="mx-auto max-w-md">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <Calendar className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                {activeFilter === 'Todas'
                  ? 'No tienes citas programadas'
                  : `No hay citas ${activeFilter.toLowerCase()}`}
              </h3>
              <p className="mb-8 text-lg text-gray-600">
                {activeFilter === 'Todas'
                  ? 'Agenda tu primera consulta con nuestros especialistas'
                  : `Actualmente no tienes citas con el estado "${activeFilter}"`}
              </p>
              {activeFilter === 'Todas' && (
                <button
                  onClick={() => router.push('/patient/appointments/new')}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-xl active:scale-95"
                >
                  <Plus className="h-5 w-5" />
                  Agendar Primera Cita
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmación mejorado */}
      {showCancelModal && selectedAppointment && (
        <>
          <div
            className="animate-fadeIn fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCancelModal(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="animate-slideUp pointer-events-auto w-full max-w-md rounded-3xl border border-gray-100 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="border-b border-gray-100 bg-gradient-to-r from-rose-50 to-red-50 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white p-3 shadow-sm">
                    <AlertCircle className="h-6 w-6 text-rose-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Cancelar Cita</h2>
                    <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
                  </div>
                </div>
              </div>

              {/* Contenido del modal */}
              <div className="space-y-5 p-6">
                <p className="text-base text-gray-700">
                  ¿Estás seguro de que deseas cancelar esta cita médica?
                </p>

                <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-blue-50 p-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-white p-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Fecha y hora</p>
                        <p className="font-semibold text-gray-900">
                          {selectedAppointment.fecha} • {selectedAppointment.hora}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-white p-2">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Médico</p>
                        <p className="font-semibold text-gray-900">{selectedAppointment.medico}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                    <div>
                      <p className="mb-1 text-sm font-semibold text-amber-900">
                        Política de cancelación
                      </p>
                      <p className="text-sm text-amber-800">
                        Si cancelas con menos de 24 horas de anticipación, podrías ser sujeto a
                        cargos.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 rounded-xl border-2 border-gray-300 px-5 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-95"
                  >
                    Mantener cita
                  </button>
                  <button
                    onClick={handleConfirmCancel}
                    className="flex-1 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white shadow-lg shadow-rose-500/30 transition-all duration-200 hover:bg-rose-700 active:scale-95"
                  >
                    Sí, cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
