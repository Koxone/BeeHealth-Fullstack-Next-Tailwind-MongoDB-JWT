'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  User,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Package,
  Pill,
  Users,
  Activity,
  RefreshCw,
  X,
  AlertCircle,
  ChevronRight,
  FileText,
  Syringe,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAuthStore } from '@/Zustand/useAuthStore';

// Datos de ejemplo
const ingresosSemanales = [
  { dia: 'Lun', ingresos: 3650 },
  { dia: 'Mar', ingresos: 3180 },
  { dia: 'Mié', ingresos: 4120 },
  { dia: 'Jue', ingresos: 3410 },
  { dia: 'Vie', ingresos: 4740 },
  { dia: 'Sáb', ingresos: 2720 },
  { dia: 'Hoy', ingresos: 3800 },
];

const pacientesSemana = [
  { dia: 'Lun', pacientes: 5 },
  { dia: 'Mar', pacientes: 4 },
  { dia: 'Mié', pacientes: 6 },
  { dia: 'Jue', pacientes: 4 },
  { dia: 'Vie', pacientes: 7 },
  { dia: 'Sáb', pacientes: 3 },
  { dia: 'Hoy', pacientes: 5 },
];

export default function DoctorDashboard() {
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [citaToCancel, setCitaToCancel] = useState(null);

  // Zustand
  const { currentUser, logout } = useAuthStore();

  const [citasHoy, setCitasHoy] = useState([
    {
      id: 1,
      hora: '09:00',
      paciente: 'Juan Pérez',
      tipo: 'Primera Consulta',
      estado: 'Confirmada',
      avatar: 'JP',
    },
    {
      id: 2,
      hora: '10:30',
      paciente: 'María López',
      tipo: 'Seguimiento',
      estado: 'Confirmada',
      avatar: 'ML',
    },
    {
      id: 3,
      hora: '11:00',
      paciente: 'Carlos Ruiz',
      tipo: 'Control de Peso',
      estado: 'Pendiente',
      avatar: 'CR',
    },
    {
      id: 4,
      hora: '15:00',
      paciente: 'Ana Martínez',
      tipo: 'Consulta General',
      estado: 'Confirmada',
      avatar: 'AM',
    },
    {
      id: 5,
      hora: '16:30',
      paciente: 'Pedro García',
      tipo: 'Seguimiento',
      estado: 'Confirmada',
      avatar: 'PG',
    },
  ]);

  // Datos de contabilidad
  const contabilidadHoy = {
    totalIngresos: 3800,
    consultas: 5,
    ingresosConsultas: 3200,
    medicamentosVendidos: 4,
    ingresosMedicamentos: 600,
    pendientesCobro: 800,
  };

  // Datos de inventario
  const inventarioAlertas = [
    { nombre: 'Atorvastatina 20mg', stock: 12, minimo: 15, tipo: 'medicamento' },
    { nombre: 'Omeprazol 20mg', stock: 8, minimo: 25, tipo: 'medicamento' },
    { nombre: 'Receta Especial', stock: 12, minimo: 15, tipo: 'receta' },
    { nombre: 'Alcohol 70%', stock: 8, minimo: 15, tipo: 'suministro' },
  ];

  const handleReagendar = (cita) => {
    // Guardar datos de la cita en localStorage
    localStorage.setItem('reagendarCita', JSON.stringify(cita));
    router.push('/doctor/calendar');
  };

  const openCancelModal = (cita) => {
    setCitaToCancel(cita);
    setShowCancelModal(true);
  };

  const handleCancelar = () => {
    setCitasHoy(
      citasHoy.map((c) => (c.id === citaToCancel.id ? { ...c, estado: 'Cancelada' } : c))
    );
    setShowCancelModal(false);
    setCitaToCancel(null);
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      Confirmada: 'bg-green-100 text-green-800 border-green-200',
      Pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Cancelada: 'bg-red-100 text-red-800 border-red-200',
    };
    return badges[estado] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          Bienvenido, Dr. {currentUser?.fullName}
        </h1>
        <p className="text-sm text-gray-600 md:text-base">
          {new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-white shadow-sm md:p-6">
          <div className="mb-2 flex items-center justify-between">
            <DollarSign className="h-8 w-8 opacity-80" />
            <span className="rounded bg-white/20 px-2 py-1 text-xs">Hoy</span>
          </div>
          <p className="mb-1 text-2xl font-bold md:text-3xl">
            ${contabilidadHoy.totalIngresos.toLocaleString()}
          </p>
          <p className="text-xs text-blue-100 md:text-sm">Ingresos totales</p>
        </div>

        <div
          onClick={() => router.push('/doctor/calendar')}
          className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-green-300 active:scale-95 md:p-6"
        >
          <div className="mb-2 flex items-center justify-between">
            <Users className="h-8 w-8 text-green-500" />
            <span className="rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
              {citasHoy.length}
            </span>
          </div>
          <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
            {citasHoy.filter((c) => c.estado !== 'Cancelada').length}
          </p>
          <p className="text-xs text-gray-600 md:text-sm">Citas de hoy</p>
        </div>

        <div
          onClick={() => router.push('/doctor/accounting')}
          className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-purple-300 active:scale-95 md:p-6"
        >
          <div className="mb-2 flex items-center justify-between">
            <Activity className="h-8 w-8 text-purple-500" />
            <span className="rounded bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
              +12%
            </span>
          </div>
          <p className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
            ${(contabilidadHoy.totalIngresos / citasHoy.length).toFixed(0)}
          </p>
          <p className="text-xs text-gray-600 md:text-sm">Promedio/paciente</p>
        </div>

        <div
          onClick={() => router.push('/doctor/inventory')}
          className={`cursor-pointer rounded-xl border-2 p-4 shadow-sm transition active:scale-95 md:p-6 ${
            inventarioAlertas.length > 0
              ? 'border-red-200 bg-red-50 hover:border-red-300'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <AlertTriangle
              className={`h-8 w-8 ${inventarioAlertas.length > 0 ? 'text-red-500' : 'text-gray-400'}`}
            />
            <span
              className={`rounded px-2 py-1 text-xs font-medium ${
                inventarioAlertas.length > 0
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {inventarioAlertas.length > 0 ? 'Revisar' : 'Todo bien'}
            </span>
          </div>
          <p
            className={`mb-1 text-2xl font-bold md:text-3xl ${inventarioAlertas.length > 0 ? 'text-red-600' : 'text-gray-900'}`}
          >
            {inventarioAlertas.length}
          </p>
          <p className="text-xs text-gray-600 md:text-sm">Alertas inventario</p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        {/* Ingresos de la semana */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
              Ingresos de la Semana
            </h2>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ingresosSemanales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="dia" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="ingresos"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pacientes atendidos */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Pacientes por Día</h2>
            <Users className="h-5 w-5 text-purple-500" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={pacientesSemana}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="dia" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Bar dataKey="pacientes" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Citas de hoy */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Citas de Hoy</h2>
          <button
            onClick={() => router.push('/doctor/calendar')}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-blue-600 transition hover:bg-blue-50 active:scale-95"
          >
            Ver calendario
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          {citasHoy.map((cita) => (
            <div
              key={cita.id}
              className={`rounded-xl border-2 p-4 transition ${
                cita.estado === 'Cancelada'
                  ? 'border-gray-200 bg-gray-50 opacity-60'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 font-semibold text-white">
                  {cita.avatar}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="truncate font-semibold text-gray-900">{cita.paciente}</h3>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getEstadoBadge(cita.estado)}`}
                    >
                      {cita.estado}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{cita.hora}</span>
                    </div>
                    <div className="hidden items-center gap-1 sm:flex">
                      <FileText className="h-4 w-4" />
                      <span>{cita.tipo}</span>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                {cita.estado !== 'Cancelada' && (
                  <div className="flex flex-shrink-0 gap-2">
                    <button
                      onClick={() => handleReagendar(cita)}
                      className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 active:scale-95"
                      title="Reagendar"
                    >
                      <RefreshCw className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => openCancelModal(cita)}
                      className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 active:scale-95"
                      title="Cancelar"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen de contabilidad */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        {/* Contabilidad */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Resumen Contable</h2>
            <button
              onClick={() => router.push('/doctor/accounting')}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-blue-600 transition hover:bg-blue-50 active:scale-95"
            >
              Ver más
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Consultas</p>
                  <p className="font-semibold text-gray-900">
                    {contabilidadHoy.consultas} pacientes
                  </p>
                </div>
              </div>
              <p className="text-lg font-bold text-blue-600">
                ${contabilidadHoy.ingresosConsultas}
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2">
                  <Pill className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Medicamentos</p>
                  <p className="font-semibold text-gray-900">
                    {contabilidadHoy.medicamentosVendidos} vendidos
                  </p>
                </div>
              </div>
              <p className="text-lg font-bold text-green-600">
                ${contabilidadHoy.ingresosMedicamentos}
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-yellow-50 p-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-yellow-100 p-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pendiente de cobro</p>
                  <p className="font-semibold text-gray-900">1 consulta</p>
                </div>
              </div>
              <p className="text-lg font-bold text-yellow-600">
                ${contabilidadHoy.pendientesCobro}
              </p>
            </div>
          </div>
        </div>

        {/* Alertas de inventario */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
              Alertas de Inventario
            </h2>
            <button
              onClick={() => router.push('/doctor/inventory')}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-blue-600 transition hover:bg-blue-50 active:scale-95"
            >
              Ver más
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {inventarioAlertas.length > 0 ? (
            <div className="space-y-2">
              {inventarioAlertas.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-red-100 p-2">
                      {item.tipo === 'medicamento' && <Pill className="h-4 w-4 text-red-600" />}
                      {item.tipo === 'receta' && <FileText className="h-4 w-4 text-red-600" />}
                      {item.tipo === 'suministro' && <Syringe className="h-4 w-4 text-red-600" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.nombre}</p>
                      <p className="text-xs text-red-600">
                        Stock: {item.stock} / Mín: {item.minimo}
                      </p>
                    </div>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Package className="mx-auto mb-3 h-12 w-12 text-gray-300" />
              <p className="text-gray-600">No hay alertas de inventario</p>
              <p className="text-sm text-gray-500">Todo el stock está en niveles óptimos</p>
            </div>
          )}
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-4 text-white shadow-sm md:p-6">
        <h2 className="mb-4 text-lg font-semibold md:text-xl">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <button
            onClick={() => router.push('/doctor/patients')}
            className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
          >
            <Users className="mx-auto mb-2 h-6 w-6" />
            <p className="text-sm font-medium">Ver Pacientes</p>
          </button>
          <button
            onClick={() => router.push('/doctor/calendar')}
            className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
          >
            <Calendar className="mx-auto mb-2 h-6 w-6" />
            <p className="text-sm font-medium">Calendario</p>
          </button>
          <button
            onClick={() => router.push('/doctor/accounting')}
            className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
          >
            <DollarSign className="mx-auto mb-2 h-6 w-6" />
            <p className="text-sm font-medium">Contabilidad</p>
          </button>
          <button
            onClick={() => router.push('/doctor/inventory')}
            className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
          >
            <Package className="mx-auto mb-2 h-6 w-6" />
            <p className="text-sm font-medium">Inventario</p>
          </button>
        </div>
      </div>

      {/* Modal Cancelar Cita */}
      {showCancelModal && citaToCancel && (
        <>
          <div
            className="animate-fadeIn fixed inset-0 z-50 bg-black/50"
            onClick={() => setShowCancelModal(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="animate-slideUp pointer-events-auto w-full max-w-md rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-red-100 p-2">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Cancelar Cita</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-4 text-gray-700">
                  ¿Estás seguro de que deseas cancelar esta cita?
                </p>
                <div className="mb-6 space-y-2 rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <p className="text-sm font-medium text-gray-900">{citaToCancel.paciente}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <p className="text-sm text-gray-700">{citaToCancel.hora}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-600" />
                    <p className="text-sm text-gray-700">{citaToCancel.tipo}</p>
                  </div>
                </div>
                <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Nota:</strong> El paciente será notificado de la cancelación.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 active:scale-95"
                  >
                    Mantener cita
                  </button>
                  <button
                    onClick={handleCancelar}
                    className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 active:scale-95"
                  >
                    Sí, cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
