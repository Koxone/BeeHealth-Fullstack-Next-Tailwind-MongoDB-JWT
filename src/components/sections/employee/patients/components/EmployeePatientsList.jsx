import { fetchPatients } from '@/lib/mongoDB/getPatients';
import EmployeePatientCard from './EmployeePatientCard';

export default async function DoctorPatientsList({ currentUser, role }) {
  const patients = await fetchPatients();

  return (
    <div className="grid h-full max-h-[600px] grid-cols-1 gap-3 overflow-y-auto">
      {patients.map((patient) => (
        <EmployeePatientCard
          key={patient._id}
          patient={patient}
          currentUser={currentUser}
          role={role}
        />
      ))}
    </div>
  );
}
