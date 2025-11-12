import DashboardLayout from '@/components/shared/layouts/DashboardLayout';
import HeaderWelcome from '@/components/shared/dashboard/header/HeaderWelcome';
import PatientEvolutionChart from './components/PatientEvolutionChart';
import PatientMotivationalBanner from './components/PatientMotivationalBanner';
import PatientStatsGrid from './components/PatientStatsGrid';

export default function PatientDashboard({ currentUser }) {
  return (
    <DashboardLayout>
      {/* Header */}
      <HeaderWelcome fullName={currentUser?.fullName} role="patient" />

      {/* Stats */}
      <PatientStatsGrid role="patient" />

      {/* Content */}
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <PatientEvolutionChart />
        <PatientMotivationalBanner />
      </div>
    </DashboardLayout>
  );
}
