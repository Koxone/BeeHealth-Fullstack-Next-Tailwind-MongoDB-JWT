import UserProfile from '@/components/general/profile/UserProfile';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import React from 'react';

export const runtime = 'nodejs';

export default async function EmployeeProfilePage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  return (
    <div className="h-screen overflow-hidden pb-40">
      <UserProfile currentUser={currentUser} role={role} />
    </div>
  );
}
