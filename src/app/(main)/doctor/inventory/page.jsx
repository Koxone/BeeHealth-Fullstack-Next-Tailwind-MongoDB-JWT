import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import GeneralInventory from '@/components/general/inventory/GeneralInventory';
export const runtime = 'nodejs';

export default async function DoctorInventoryPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  return (
    <div className="h-screen overflow-hidden pb-40">
      <GeneralInventory role={role} />
    </div>
  );
}
