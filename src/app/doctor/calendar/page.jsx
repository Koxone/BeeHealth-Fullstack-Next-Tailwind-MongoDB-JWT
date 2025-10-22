"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User, Phone, Mail, TrendingUp, Users, CheckCircle, Sparkles } from "lucide-react";

// Datos de ejemplo de citas
const appointmentsData = {
  "2024-10-21": [
    { id: 1, hora: "09:00", paciente: "Juan Pérez", telefono: "+52 55 1234 5678", email: "juan@email.com", motivo: "Control de peso", avatar: "JP" },
    { id: 2, hora: "10:00", paciente: "María López", telefono: "+52 55 8765 4321", email: "maria@email.com", motivo: "Seguimiento", avatar: "ML" },
    { id: 3, hora: "15:00", paciente: "Carlos Ruiz", telefono: "+52 55 5555 5555", email: "carlos@email.com", motivo: "Primera consulta", avatar: "CR" },
  ],
  "2024-10-22": [
    { id: 4, hora: "09:00", paciente: "Ana Martínez", telefono: "+52 55 1111 2222", email: "ana@email.com", motivo: "Revisión", avatar: "AM" },
    { id: 5, hora: "14:00", paciente: "Pedro García", telefono: "+52 55 3333 4444", email: "pedro@email.com", motivo: "Control mensual", avatar: "PG" },
  ],
  "2024-10-23": [
    { id: 6, hora: "11:00", paciente: "Laura Sánchez", telefono: "+52 55 6666 7777", email: "laura@email.com", motivo: "Tratamiento estético", avatar: "LS" },
    { id: 7, hora: "15:00", paciente: "Roberto Díaz", telefono: "+52 55 8888 9999", email: "roberto@email.com", motivo: "Consulta nutricional", avatar: "RD" },
  ],
  "2024-10-24": [
    { id: 8, hora: "10:00", paciente: "Sofia Torres", telefono: "+52 55 2222 3333", email: "sofia@email.com", motivo: "Control de peso", avatar: "ST" },
    { id: 9, hora: "14:00", paciente: "Miguel Ángel", telefono: "+52 55 4444 5555", email: "miguel@email.com", motivo: "Seguimiento", avatar: "MA" },
    { id: 10, hora: "16:00", paciente: "Isabel Ramírez", telefono: "+52 55 7777 8888", email: "isabel@email.com", motivo: "Primera consulta", avatar: "IR" },
  ],
};

export default function DoctorCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9)); // Octubre 2024
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    const dateStr = formatDate(date);
    return appointmentsData[dateStr] || [];
  };

  const hasAppointments = (date) => {
    return getAppointmentsForDate(date).length > 0;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const selectedAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];

  // Calcular estadísticas del mes
  const totalAppointmentsThisMonth = Object.keys(appointmentsData)
    .filter(dateStr => {
      const date = new Date(dateStr);
      return date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();
    })
    .reduce((total, dateStr) => total + appointmentsData[dateStr].length, 0);

  const daysWithAppointments = Object.keys(appointmentsData).filter(dateStr => {
    const date = new Date(dateStr);
    return date.getMonth() === currentMonth.getMonth();
  }).length;

  const todayAppointments = getAppointmentsForDate(new Date()).length;
  const averagePerDay = totalAppointmentsThisMonth > 0 ? Math.round(totalAppointmentsThisMonth / daysWithAppointments) : 0;

  return (
    <div className="min-h-screen pb-8">
      {/* Header mejorado */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -mx-4 -mt-4 px-4 pt-6 pb-8 mb-6 md:rounded-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
              <CalendarIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Mi Calendario
              </h1>
              <p className="text-base md:text-lg text-gray-600">
                Visualiza y gestiona tus citas médicas
              </p>
            </div>
          </div>

          {/* Estadísticas mejoradas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { 
                label: "Citas este mes", 
                value: totalAppointmentsThisMonth, 
                icon: CalendarIcon,
                gradient: "from-blue-500 to-indigo-600",
                bg: "from-blue-50 to-indigo-50",
              },
              { 
                label: "Días con citas", 
                value: daysWithAppointments,
                icon: CheckCircle,
                gradient: "from-emerald-500 to-green-600",
                bg: "from-emerald-50 to-green-50",
              },
              { 
                label: "Citas hoy", 
                value: todayAppointments,
                icon: Clock,
                gradient: "from-amber-500 to-orange-600",
                bg: "from-amber-50 to-orange-50",
              },
              { 
                label: "Promedio/día", 
                value: averagePerDay,
                icon: TrendingUp,
                gradient: "from-purple-500 to-pink-600",
                bg: "from-purple-50 to-pink-50",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className={`bg-gradient-to-br ${stat.bg} rounded-2xl shadow-sm border-2 border-gray-200 p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fadeInUp relative overflow-hidden group`}
                >
                  <div className={`absolute -right-4 -bottom-4 w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full transition-all duration-300 group-hover:scale-150`} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</p>
                      <div className={`p-1.5 bg-gradient-to-br ${stat.gradient} rounded-lg`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Calendario mejorado */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
            {/* Header del calendario */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
              <button
                onClick={handlePrevMonth}
                className="group p-3 hover:bg-blue-50 rounded-xl transition-all duration-200 active:scale-95 border border-gray-200 hover:border-blue-300"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 group-hover:-translate-x-1 transition-all duration-200" />
              </button>
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 capitalize">{monthName}</h2>
                <p className="text-sm text-gray-500 mt-1">{totalAppointmentsThisMonth} citas programadas</p>
              </div>
              <button
                onClick={handleNextMonth}
                className="group p-3 hover:bg-blue-50 rounded-xl transition-all duration-200 active:scale-95 border border-gray-200 hover:border-blue-300"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
              </button>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                <div key={day} className="text-center text-xs md:text-sm font-bold text-gray-500 py-2">
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

                const hasApts = hasAppointments(date);
                const isSelected = selectedDate && formatDate(selectedDate) === formatDate(date);
                const isToday = formatDate(date) === formatDate(new Date());
                const aptCount = getAppointmentsForDate(date).length;

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(date)}
                    className={`group aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 relative ${
                      isSelected
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg scale-110 z-10"
                        : hasApts
                        ? "bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-2 border-blue-300 text-gray-900 hover:scale-105 hover:shadow-md"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-600 hover:scale-105"
                    } ${isToday && !isSelected ? "ring-2 ring-blue-500 ring-offset-2" : ""} active:scale-95`}
                  >
                    <span className="mb-1">{date.getDate()}</span>
                    {hasApts && (
                      <div className={`flex items-center gap-1 ${isSelected ? "text-white" : "text-blue-600"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-blue-600"}`} />
                        <span className="text-xs font-bold">{aptCount}</span>
                      </div>
                    )}
                    {isToday && !isSelected && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Leyenda mejorada */}
            <div className="mt-6 pt-4 border-t-2 border-gray-200 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg"></div>
                <span className="font-medium text-gray-700">Con citas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-50 rounded-lg border border-gray-300"></div>
                <span className="font-medium text-gray-700">Sin citas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-sm"></div>
                <span className="font-medium text-gray-700">Seleccionado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 ring-2 ring-blue-500 ring-offset-2 rounded-lg"></div>
                <span className="font-medium text-gray-700">Hoy</span>
              </div>
            </div>
          </div>

          {/* Lista de citas mejorada */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedDate
                      ? selectedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
                      : "Selecciona un día"}
                  </h3>
                  {selectedDate && selectedAppointments.length > 0 && (
                    <p className="text-sm text-indigo-100">
                      {selectedAppointments.length} cita{selectedAppointments.length !== 1 ? 's' : ''} programada{selectedAppointments.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Lista de citas */}
            <div className="p-6">
              {selectedDate && selectedAppointments.length > 0 ? (
                <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin">
                  {selectedAppointments.map((apt, index) => (
                    <div
                      key={apt.id}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className="group border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-lg transition-all duration-300 animate-fadeInUp relative overflow-hidden"
                    >
                      <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 rounded-full transition-all duration-300 group-hover:scale-150" />
                      
                      <div className="relative z-10">
                        {/* Header con hora */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="font-bold text-gray-900">{apt.hora}</span>
                          </div>
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white font-bold text-xs">
                            #{apt.id}
                          </div>
                        </div>

                        {/* Info del paciente */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                            {apt.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span className="font-bold text-gray-900 truncate">{apt.paciente}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                              <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                              <span className="text-xs text-gray-600">{apt.telefono}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                              <span className="text-xs text-gray-600 truncate">{apt.email}</span>
                            </div>
                          </div>
                        </div>

                        {/* Motivo */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
                          <div className="flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-semibold text-purple-900 mb-1">Motivo de consulta</p>
                              <p className="text-sm text-gray-700 font-medium">{apt.motivo}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Barra decorativa */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  ))}
                </div>
              ) : selectedDate ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-900 font-semibold mb-1">No hay citas programadas</p>
                  <p className="text-sm text-gray-500">Este día está libre</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-gray-900 font-semibold mb-1">Selecciona un día</p>
                  <p className="text-sm text-gray-500">Haz clic en una fecha del calendario</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
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

        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}