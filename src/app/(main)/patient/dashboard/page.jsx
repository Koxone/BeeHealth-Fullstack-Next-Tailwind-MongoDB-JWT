import GeneralDashboard from '@/components/general/dashboard/Dashboard';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

export const runtime = 'nodejs';

export default async function DoctorDashboardPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  return (
    <div>
      <GeneralDashboard role={role} />
    </div>
  );
}
