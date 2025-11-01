import SharedPatients from '@/components/shared/patients/SharedPatients';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function DoctorPatientsPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  return (
    <div className="max-h-screen overflow-hidden">
      <SharedPatients currentUser={currentUser} role={role} />
    </div>
  );
}
