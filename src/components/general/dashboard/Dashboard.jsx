import HeaderWelcome from './components/general/HeaderWelcome';
import StatsGrid from './components/statsGrid/StatsGrid';
import DoctorIncomeChart from './components/doctor/DoctorIncomeChart';
import DoctorPatientsChart from './components/doctor/DoctorPatientsChart';
import AppointmentsList from './components/general/AppointmentsToday';
import DoctorAccountingSummary from './components/doctor/DoctorAccountingSummary';
import InventoryAlerts from './components/general/InventoryAlerts/InventoryAlerts';
import CancelAppointmentModal from './components/general/CancelAppointmentModal';
import PatientEvolutionChart from './components/patient/PatientEvolutionChart';
import PatientMotivationalBanner from './components/patient/PatientMotivationalBanner';

export default function GeneralDashboard({ type = 'patient' }) {
  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* Header */}
      <HeaderWelcome fullName="Example" type={type} />

      {/* Stats */}
      <StatsGrid type={type} />

      {/* Doctor Charts */}
      {type === 'doctor' && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          <DoctorIncomeChart data={[]} />
          <DoctorPatientsChart data={[]} />
        </div>
      )}

      {/* Doctor Appointments */}
      {type === 'doctor' && <AppointmentsList />}

      {/* Doctor Summaries */}
      {type === 'doctor' && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          <DoctorAccountingSummary />
          <InventoryAlerts />
        </div>
      )}

      {/* Patient */}
      {type === 'patient' && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-1">
          {/* Chart */}
          <PatientEvolutionChart />

          {/* Motivational Banner */}
          <PatientMotivationalBanner />
        </div>
      )}

      {/* Employee */}
      {type === 'employee' && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          <AppointmentsList />
          <InventoryAlerts />
        </div>
      )}

      {/* Cancel modal */}
      {/* <CancelAppointmentModal /> */}
    </div>
  );
}
