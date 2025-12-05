import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import HeaderClient from './HeaderClient';

export const runtime = 'nodejs';

export default async function Header() {
  // Get current User info
  const currentUser = await getCurrentUser();

  return <HeaderClient currentUser={currentUser} />;
}
