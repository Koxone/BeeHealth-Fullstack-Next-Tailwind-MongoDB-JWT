import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import DoctorPatientCard from './DoctorPatientCard';

export default async function DoctorPatientsList({ currentUser, role }) {
  // Get Patients
  await connectDB();

  let query = { role: 'patient', isActive: true };

  // Specialty Filter
  if (currentUser.role === 'doctor') {
    query.specialty = currentUser.specialty;
  }

  const patients = await User.find(query, '-password -resetToken').sort({ createdAt: -1 }).lean();

  return (
    <div className="grid h-full max-h-[600px] grid-cols-1 gap-3 overflow-y-auto">
      {patients.map((patient) => (
        <DoctorPatientCard
          key={patient._id.toString()}
          patient={patient}
          currentUser={currentUser}
          role={role}
        />
      ))}
    </div>
  );
}
