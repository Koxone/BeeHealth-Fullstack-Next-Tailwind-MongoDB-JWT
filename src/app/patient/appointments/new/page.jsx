'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  User,
  Check,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  FileText,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

// Datos de ejemplo de médicos
const doctors = [
  { id: 1, nombre: 'Dra. María García', especialidad: 'Endocrinología', avatar: 'MG' },
  { id: 2, nombre: 'Dr. Carlos Ruiz', especialidad: 'Medicina Estética', avatar: 'CR' },
  { id: 3, nombre: 'Dra. Ana Martínez', especialidad: 'Nutrición', avatar: 'AM' },
];

// Horarios disponibles por día
const availableSlots = {
  '2024-10-21': ['09:00', '10:00', '11:00', '15:00', '16:00'],
  '2024-10-22': ['09:00', '10:00', '14:00', '15:00', '16:00', '17:00'],
  '2024-10-23': ['09:00', '11:00', '15:00', '16:00'],
  '2024-10-24': ['10:00', '11:00', '14:00', '15:00', '16:00'],
  '2024-10-25': ['09:00', '10:00', '11:00', '15:00'],
};

export default function NewAppointment() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9)); // Octubre 2024
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState('');

  // Generar días del mes
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Días vacíos al inicio
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isDateAvailable = (date) => {
    if (!date || !selectedDoctor) return false;
    const dateStr = formatDate(date);
    return availableSlots[dateStr] && availableSlots[dateStr].length > 0;
  };

  const isPastDate = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateSelect = (date) => {
    if (!isPastDate(date) && isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert('Por favor completa todos los campos');
      return;
    }

    const appointmentData = {
      doctor: doctors.find((d) => d.id === selectedDoctor),
      fecha: formatDate(selectedDate),
      hora: selectedTime,
      motivo: reason,
    };

    console.log('Cita agendada:', appointmentData);
    alert('¡Cita agendada exitosamente!');
    router.push('/patient/appointments');
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const availableTimesForDate = selectedDate ? availableSlots[formatDate(selectedDate)] || [] : [];

  const getStepStatus = (step) => {
    if (step === 1) return selectedDoctor ? 'complete' : 'current';
    if (step === 2) return selectedDate ? 'complete' : selectedDoctor ? 'current' : 'pending';
    if (step === 3) return selectedTime ? 'complete' : selectedDate ? 'current' : 'pending';
    return 'pending';
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header mejorado */}
      <div className="-mx-4 -mt-4 mb-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 pt-6 pb-8 md:rounded-2xl">
        <div className="mx-auto max-w-4xl">
          <button
            onClick={() => router.back()}
            className="group mb-6 flex items-center gap-2 text-gray-600 transition-all duration-200 hover:text-gray-900"
          >
            <div className="rounded-lg p-1 transition-all duration-200 group-hover:bg-white/80">
              <ArrowLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
            </div>
            <span className="font-medium">Volver a Citas</span>
          </button>

          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-blue-600 p-3 shadow-lg">
              <CalendarIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Agendar Nueva Cita
              </h1>
              <p className="text-base text-gray-600 md:text-lg">
                Sigue los pasos para programar tu consulta médica
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Indicador de progreso */}
        <div className="mb-8">
          <div className="relative flex items-center justify-between">
            <div className="absolute top-5 right-0 left-0 -z-10 h-1 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
                style={{
                  width: selectedTime
                    ? '100%'
                    : selectedDate
                      ? '66%'
                      : selectedDoctor
                        ? '33%'
                        : '0%',
                }}
              />
            </div>

            {[
              { number: 1, label: 'Médico', icon: User },
              { number: 2, label: 'Fecha', icon: CalendarIcon },
              { number: 3, label: 'Hora', icon: Clock },
            ].map((step) => {
              const status = getStepStatus(step.number);
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center gap-2 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 px-2 py-1"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                      status === 'complete'
                        ? 'scale-110 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg'
                        : status === 'current'
                          ? 'scale-105 border-2 border-blue-600 bg-white text-blue-600 shadow-md'
                          : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {status === 'complete' ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      status === 'pending' ? 'text-gray-400' : 'text-gray-700'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selección de médico */}
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <Stethoscope className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Paso 1: Selecciona tu médico</h2>
                <p className="text-sm text-gray-600">Elige el especialista que deseas consultar</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {doctors.map((doctor, index) => (
                <button
                  key={doctor.id}
                  type="button"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => {
                    setSelectedDoctor(doctor.id);
                    setSelectedDate(null);
                    setSelectedTime(null);
                  }}
                  className={`group animate-fadeInUp relative overflow-hidden rounded-xl border-2 p-5 text-left transition-all duration-300 ${
                    selectedDoctor === doctor.id
                      ? 'scale-105 border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md active:scale-95'
                  }`}
                >
                  <div className="relative z-10">
                    <div className="mb-3 flex items-center gap-3">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold transition-all duration-300 ${
                          selectedDoctor === doctor.id
                            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg'
                            : 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 group-hover:scale-110'
                        }`}
                      >
                        {doctor.avatar}
                      </div>
                      {selectedDoctor === doctor.id && (
                        <div className="absolute top-0 right-0 rounded-full bg-blue-600 p-1.5 shadow-lg">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="mb-1 font-bold text-gray-900">{doctor.nombre}</p>
                    <p className="text-sm text-gray-600">{doctor.especialidad}</p>
                  </div>

                  {selectedDoctor === doctor.id && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-blue-400/10 to-indigo-400/10" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Calendario */}
          {selectedDoctor && (
            <div className="animate-slideDown rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-indigo-100 p-2">
                  <CalendarIcon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Paso 2: Selecciona una fecha</h2>
                  <p className="text-sm text-gray-600">Elige el día de tu consulta</p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-blue-50 p-5">
                {/* Header del calendario */}
                <div className="mb-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="group rounded-xl border border-gray-200 p-2.5 shadow-sm transition-all duration-200 hover:bg-white active:scale-95"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-600 transition-transform duration-200 group-hover:-translate-x-1" />
                  </button>
                  <h3 className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-lg font-bold text-gray-900 capitalize shadow-sm">
                    {monthName}
                  </h3>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="group rounded-xl border border-gray-200 p-2.5 shadow-sm transition-all duration-200 hover:bg-white active:scale-95"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-600 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Días de la semana */}
                <div className="mb-3 grid grid-cols-7 gap-2">
                  {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                    <div key={day} className="py-2 text-center text-xs font-bold text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Días del mes */}
                <div className="grid grid-cols-7 gap-2">
                  {days.map((date, index) => {
                    if (!date) {
                      return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const isAvailable = isDateAvailable(date);
                    const isPast = isPastDate(date);
                    const isSelected =
                      selectedDate && formatDate(selectedDate) === formatDate(date);

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleDateSelect(date)}
                        disabled={isPast || !isAvailable}
                        className={`group relative flex aspect-square items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                          isSelected
                            ? 'z-10 scale-110 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg'
                            : isAvailable && !isPast
                              ? 'border-2 border-blue-300 bg-white text-gray-900 hover:scale-105 hover:bg-blue-50 hover:shadow-md active:scale-95'
                              : isPast
                                ? 'cursor-not-allowed bg-gray-100 text-gray-400 opacity-50'
                                : 'cursor-not-allowed bg-gray-100 text-gray-400 opacity-50'
                        }`}
                      >
                        {date.getDate()}
                        {isAvailable && !isPast && !isSelected && (
                          <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full border-2 border-white bg-green-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Leyenda */}
                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-200 pt-5 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-lg border-2 border-blue-300 bg-white shadow-sm"></div>
                    <span className="font-medium text-gray-700">Disponible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-lg bg-gray-100"></div>
                    <span className="font-medium text-gray-700">No disponible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-sm"></div>
                    <span className="font-medium text-gray-700">Seleccionado</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Horarios disponibles */}
          {selectedDate && (
            <div className="animate-slideDown rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Paso 3: Selecciona un horario</h2>
                  <p className="text-sm text-gray-600">
                    Horarios disponibles para{' '}
                    {selectedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {availableTimesForDate.map((time, index) => (
                  <button
                    key={time}
                    type="button"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setSelectedTime(time)}
                    className={`group animate-fadeInUp relative flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border-2 px-3 py-4 transition-all duration-300 ${
                      selectedTime === time
                        ? 'scale-110 border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md active:scale-95'
                    }`}
                  >
                    <Clock
                      className={`h-5 w-5 transition-all duration-300 ${
                        selectedTime === time
                          ? 'scale-110 text-purple-600'
                          : 'text-gray-400 group-hover:scale-110 group-hover:text-purple-500'
                      }`}
                    />
                    <span
                      className={`text-sm font-bold ${
                        selectedTime === time ? 'text-purple-600' : 'text-gray-700'
                      }`}
                    >
                      {time}
                    </span>
                    {selectedTime === time && (
                      <div className="absolute top-1 right-1 rounded-full bg-purple-600 p-1 shadow-lg">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Motivo de consulta */}
          {selectedTime && (
            <div className="animate-slideDown rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Motivo de la consulta (opcional)
                  </h2>
                  <p className="text-sm text-gray-600">Describe brevemente tu motivo de consulta</p>
                </div>
              </div>

              <textarea
                rows="4"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                placeholder="Ej: Revisión de rutina, control de glucosa, consulta sobre alimentación..."
              ></textarea>
            </div>
          )}

          {/* Resumen mejorado */}
          {selectedDoctor && selectedDate && selectedTime && (
            <div className="animate-slideDown relative overflow-hidden rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-2xl">
              <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10"></div>
              <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-24 w-24 rounded-full bg-white/10"></div>

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Resumen de tu cita</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="mb-2 flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-200" />
                      <span className="text-xs font-semibold tracking-wide text-blue-200 uppercase">
                        Médico
                      </span>
                    </div>
                    <p className="text-lg font-bold">
                      {doctors.find((d) => d.id === selectedDoctor)?.nombre}
                    </p>
                    <p className="text-sm text-blue-100">
                      {doctors.find((d) => d.id === selectedDoctor)?.especialidad}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="mb-2 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-blue-200" />
                      <span className="text-xs font-semibold tracking-wide text-blue-200 uppercase">
                        Fecha
                      </span>
                    </div>
                    <p className="text-lg font-bold capitalize">
                      {selectedDate.toLocaleDateString('es-ES', { weekday: 'long' })}
                    </p>
                    <p className="text-sm text-blue-100">
                      {selectedDate.toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-200" />
                      <span className="text-xs font-semibold tracking-wide text-blue-200 uppercase">
                        Hora
                      </span>
                    </div>
                    <p className="text-3xl font-bold">{selectedTime}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-4 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:shadow-md active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!selectedDoctor || !selectedDate || !selectedTime}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold transition-all duration-300 ${
                selectedDoctor && selectedDate && selectedTime
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95'
                  : 'cursor-not-allowed bg-gray-200 text-gray-400'
              }`}
            >
              <Check className="h-5 w-5" />
              Confirmar Cita
            </button>
          </div>
        </form>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
