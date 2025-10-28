import { headers } from 'next/headers';
import GeneralPatients from '@/components/general/patients/GeneralPatients';

export default async function DoctorPatientsPage() {
  const h = await headers();
  const referer = h.get('referer') || '';

  const type = referer.includes('/doctor')
    ? 'doctor'
    : referer.includes('/patient')
      ? 'patient'
      : 'employee';

  return (
    <div className="max-h-screen overflow-hidden">
      <GeneralPatients type={type} />
    </div>
  );
}
