'use client';

import { useEffect, useState } from 'react';
import ControlsBar from './components/ControlsBar';
import AppointmentCard from './components/AppointmentCard';
import EmployeeCreateAppointmentModal from './components/EmployeeCreateAppointmentModal';
import EmptyState from './components/EmptyState';
import GeneralSectionHeader from '@/components/shared/sections/GeneralSectionHeader';
import { useAllAppointments } from '@/hooks/useAllAppointments';

export default function EmployeeAppointments({ role, patients }) {
  const [showModal, setShowModal] = useState(false);
  const [editingCita, setEditingCita] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, byDay, loading, error, refetch } = useAllAppointments();
  const [citas, setCitas] = useState([]);
  useEffect(() => {
    if (data?.all) {
      const mapped = data.all.map((item) => ({
        id: item.id,
        fecha: item._dateKey,
        hora: item.hora,
        paciente: item.paciente,
        telefono: item.telefono,
        email: item.email,
        motivo: item.motivo,
        estado: 'Confirmada',
        avatar: item.paciente
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase(),
      }));
      setCitas(mapped);
    }
  }, [data]);

  /* Form state */
  const [citaForm, setCitaForm] = useState({
    fecha: '',
    hora: '',
    paciente: '',
    telefono: '',
    email: '',
    motivo: '',
  });

  /* Helpers */
  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'Confirmada':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Pendiente':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Cancelada':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  /* Derived */
  const filteredCitas = citas.filter((c) => {
    const matchSearch =
      c.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.telefono.includes(searchTerm);
    return matchSearch;
  });

  /* Actions */
  const openCreate = () => {
    setEditingCita(null);
    setCitaForm({ fecha: '', hora: '', paciente: '', telefono: '', email: '', motivo: '' });
    setShowModal(true);
  };

  /* Actions */
  const handleSave = (e) => {
    e.preventDefault();
    const newCita = {
      id: editingCita ? editingCita.id : Date.now(),
      ...citaForm,
      estado: editingCita ? editingCita.estado : 'Pendiente',
      avatar: citaForm.paciente
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase(),
    };
    setCitas((prev) =>
      editingCita ? prev.map((c) => (c.id === editingCita.id ? newCita : c)) : [...prev, newCita]
    );
    setShowModal(false);
    setEditingCita(null);
    setCitaForm({ fecha: '', hora: '', paciente: '', telefono: '', email: '', motivo: '' });
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Cargando citas...</div>;
  }

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto pb-8">
      {/* Header */}
      <GeneralSectionHeader
        role={role}
        Icon="pacientes"
        title="Citas para el dia de hoy"
        subtitle="Administracion de Citas"
      />

      <div className="mx-auto max-w-7xl space-y-6">
        {/* Controls */}
        <ControlsBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onCreate={openCreate} />

        {/* List */}
        {filteredCitas.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 px-4">
            {filteredCitas.map((cita, index) => (
              <AppointmentCard
                key={cita.id}
                index={index}
                cita={cita}
                getEstadoBadge={getEstadoBadge}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Modals */}
      {showModal && (
        <EmployeeCreateAppointmentModal
          patients={patients}
          editingCita={editingCita}
          citaForm={citaForm}
          setCitaForm={setCitaForm}
          onClose={() => setShowModal(false)}
          onSubmit={handleSave}
        />
      )}
    </div>
  );
}
