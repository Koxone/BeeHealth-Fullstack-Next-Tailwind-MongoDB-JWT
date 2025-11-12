'use client';

import { useTodayAppointmentsBySpecialty } from '@/hooks/useTodayAppointmentsBySpecialty';
import { useInventory } from '@/hooks/useInventory';
import {
  Users,
  DollarSign,
  AlertTriangle,
  Activity,
  Calendar,
  Weight,
  TrendingDown,
  Clock,
  FileText,
  Ruler,
} from 'lucide-react';
import DoctorStatsCard from './DoctorStatsCard';

export default function DoctorStatsGrid({ role }) {
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
          Icon: DollarSign,
          mainData: todaysAppointmentsNumber,
          extraData: 'Hoy',
          title: 'Ingresos de Hoy',
          variant: 'primary',
        },
        {
          Icon: Users,
          mainData: pendingAppointments,
          title: 'Citas de Hoy',
          variant: 'success',
          href: '/doctor/calendar',
        },
        {
          Icon: Activity,
          mainData: completedConsults,
          extraData: '+12%',
          title: 'Promedio paciente',
          variant: 'purple',
        },
        {
          Icon: AlertTriangle,
          mainData: totalAlerts,
          extraData: 'Revisar',
          title: 'Alertas de Inventario',
          variant: 'danger',
          href: '/doctor/inventory',
        },
      ].map((card, index) => (
        <DoctorStatsCard
          key={index}
          role={role}
          Icon={card.Icon}
          href={card.href}
          mainData={card.mainData}
          extraData={card.extraData || null}
          title={card.title}
          variant={card.variant}
        />
      ))}
    </div>
  );
}
