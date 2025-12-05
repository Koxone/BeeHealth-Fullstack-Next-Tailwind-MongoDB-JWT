'use client';

import EmployeeStatsCard from './EmployeeStatsCard';
import { useGetFullInventory } from '@/hooks/inventory/useGetFullInventory';
import { Calendar, DollarSign, FileText, TriangleAlert } from 'lucide-react';
import { useAllTodayAppointments } from '@/hooks/appointments/useAllTodayAppointments';
import { useGetAllConsults } from '@/hooks/consults/useGetAllConsults';
import { useTranslation } from 'react-i18next';

export default function EmployeeStatsGrid({ role }) {
  const { t } = useTranslation('dashboard');

  // Appointments Today logic
  const { appointments } = useAllTodayAppointments();
  const todaysAppointmentsNumber = appointments?.length || 0;

  // Inventory and Alerts logic
  const { totalAlerts } = useGetFullInventory();

  // Consultations logic
  const { consults } = useGetAllConsults();

  const todayConsultsTotal = consults.map((c) => c.consultPrice).reduce((a, b) => a + b, 0) || 0;
  const medsSoldTotal =
    consults
      .flatMap((c) => c.itemsSold)
      .map((item) => item.total)
      .reduce((a, b) => a + b, 0) || 0;

  const totalSales = todayConsultsTotal + medsSoldTotal;
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {[
        {
          Icon: Calendar,
          mainData: todaysAppointmentsNumber,
          extraData: t('stats.today'),
          title: t('stats.scheduledAppointments'),
          variant: 'primary',
        },
        {
          Icon: FileText,
          mainData: '$' + todayConsultsTotal,
          title: t('stats.consultsToday'),
          extraData: t('stats.today'),
          variant: 'purple',
        },
        {
          Icon: DollarSign,
          mainData: '$' + medsSoldTotal,
          title: t('stats.medsSales'),
          extraData: t('stats.today'),
          variant: 'success',
        },
        {
          Icon: TriangleAlert,
          mainData: totalAlerts,
          extraData: t('stats.check'),
          title: t('stats.inventoryAlerts'),
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
