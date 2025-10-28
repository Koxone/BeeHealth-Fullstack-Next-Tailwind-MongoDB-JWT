import PatientsSearchBar from '@/components/general/patients/components/PatientsSearchBar';
import PatientsHeader from '@/components/general/patients/components/PatientsHeader';
import PatientsList from '@/components/general/patients/components/PatientsList';

// Get Current User
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function GeneralPatients() {
  // Get current User info
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <PatientsHeader />

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <PatientsSearchBar />
      </div>

      <PatientsList />
    </div>
  );
}
