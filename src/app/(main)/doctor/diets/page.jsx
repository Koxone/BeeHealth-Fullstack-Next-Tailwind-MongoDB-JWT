import React from 'react';
import { headers } from 'next/headers';
import DoctorDiets from '@/components/sections/doctor/diets/DoctorDiets';

export default async function DoctorDietsPage() {
  const h = await headers();
  const referer = h.get('referer') || '';

  const type = referer.includes('/doctor')
    ? 'doctor'
    : referer.includes('/patient')
      ? 'patient'
      : 'employee';
  return (
    <div>
      <DoctorDiets type={type} />
    </div>
  );
}
