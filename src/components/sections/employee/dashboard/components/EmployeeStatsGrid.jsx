'use client';

import { useTodayAppointmentsBySpecialty } from '@/hooks/useTodayAppointmentsBySpecialty';
import EmployeeStatsCard from './EmployeeStatsCard';
import { useInventory } from '@/hooks/useInventory';
import { Calendar, Clock, FileText, TriangleAlert } from 'lucide-react';

export default function EmployeeStatsGrid({ role }) {
  // Hooks
  const { appointments, loading } = useTodayAppointmentsBySpecialty();
  const todaysAppointmentsNumber = appointments?.length || 0;

  const { inventory, loading: loadingInventory, error: errorInventory } = useInventory();

  // Alerts logic
  const criticalItems = inventory.filter((i) => i.quantity < i.minStock);
  const lowItems = inventory.filter((i) => i.quantity === i.minStock);
  const totalAlerts = criticalItems.length + lowItems.length;

  // Mock Data
  const pendingAppointments = 3;
  const completedConsults = 5;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {[
        {
          Icon: Calendar,
          mainData: todaysAppointmentsNumber,
          extraData: 'Hoy',
          title: 'Citas Programadas',
          variant: 'primary',
        },
        {
          Icon: Clock,
          mainData: pendingAppointments,
          extraData: 'Pendientes',
          title: 'Pendientes por Confirmar',
          variant: 'success',
        },
        {
          Icon: FileText,
          mainData: completedConsults,
          extraData: 'Hoy',
          title: 'Consultas Hoy',
          variant: 'purple',
        },
        {
          Icon: TriangleAlert,
          mainData: totalAlerts,
          extraData: 'Revisar',
          title: 'Alertas de Inventario',
          variant: 'danger',
        },
      ].map((card, index) => (
        <EmployeeStatsCard
          key={index}
          role={role}
          Icon={card.Icon}
          mainData={card.mainData}
          extraData={card.extraData}
          title={card.title}
          variant={card.variant}
        />
      ))}
    </div>
  );
}
