'use client';

import HeaderWelcome from './components/general/HeaderWelcome';
import StatsGrid from './components/statsGrid/StatsGrid';
import DoctorIncomeChart from './components/doctor/DoctorIncomeChart';
import DoctorPatientsChart from './components/doctor/DoctorPatientsChart';
import AppointmentsList from './components/general/AppointmentsToday';
import DoctorAccountingSummary from './components/doctor/DoctorAccountingSummary';
import InventoryAlerts from './components/general/InventoryAlerts';
import CancelAppointmentModal from './components/general/CancelAppointmentModal';
import { usePathname } from 'next/navigation';
import PatientEvolutionChart from './components/patient/EvolutionChart';

export default function GeneralDashboard() {
  const pathname = usePathname();

  const dashboardType = pathname.startsWith('/doctor')
    ? 'doctor'
    : pathname.startsWith('/patient')
      ? 'patient'
      : 'employee';
  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* Header */}
      <HeaderWelcome fullName="Example" />

      {/* Stats */}
      <StatsGrid />

      {/* Charts section */}
      {dashboardType === 'doctor' && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          <DoctorIncomeChart data={[]} />
          <DoctorPatientsChart data={[]} />
        </div>
      )}

      {/* Patient */}
      {dashboardType === 'patient' && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-1">
          <PatientEvolutionChart />
        </div>
      )}

      {/* Employee */}
      {dashboardType === 'employee' && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          <AppointmentsList />
          <InventoryAlerts />
        </div>
      )}

      {/* Appointments */}
      {dashboardType === 'doctor' && <AppointmentsList />}

      {/* Summaries */}
      {dashboardType === 'doctor' && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          <DoctorAccountingSummary />
          <InventoryAlerts />
        </div>
      )}

      {/* Cancel modal */}
      {/* <CancelAppointmentModal /> */}
    </div>
  );
}
