'use client';

import DashboardLayout from '@/components/shared/layouts/DashboardLayout';
import HeaderWelcome from '@/components/shared/dashboard/header/HeaderWelcome';
import AppointmentsToday from '@/components/shared/dashboard/appointmentsToday/AppointmentsToday';
import SharedInventoryAlerts from '@/components/shared/dashboard/InventoryAlerts/SharedInventoryAlerts';
import { useAllTodayAppointments } from '@/hooks/useAllTodayAppointments';
import { useInventory } from '@/hooks/useInventory';
import EmployeeStatsGrid from './components/EmployeeStatsGrid';

export default function EmployeeDashboard({ currentUser }) {
  // Hook to get all appointments
  const { appointments, error } = useAllTodayAppointments();

  // Custom Hooks
  const {
    inventory,
    loading: loadingInventory,
    error: errorInventory,
    setInventory,
  } = useInventory();

  return (
    <DashboardLayout>
      {/* Header */}
      <HeaderWelcome fullName={currentUser?.fullName} role="employee" />

      {/* Stats */}
      <EmployeeStatsGrid role="employee" />

      {/* Content */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <AppointmentsToday role={currentUser?.role} appointments={appointments} />
        <SharedInventoryAlerts role={currentUser?.role} inventory={inventory} />
      </div>
    </DashboardLayout>
  );
}
