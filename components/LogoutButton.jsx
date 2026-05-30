'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    localStorage.removeItem('grabdeal_user');
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 cursor-pointer"
    >
      Logout
    </button>
  );
}