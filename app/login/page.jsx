'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        Swal.fire('Login Failed', data?.message || 'Invalid credentials', 'error');
        return;
      }

      localStorage.setItem('grabdeal_user', JSON.stringify(data.user));

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Successfully logged in',
        timer: 1200,
        showConfirmButton: false,
      });

      setLoading(false);
      router.push('/dashboard');
    } catch (error) {
      setLoading(false);
      Swal.fire('Server Error', 'Something went wrong', 'error');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f5ff] px-4">
      <div className="w-full max-w-md rounded-3xl border border-purple-100 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-[#16013d]">GrabDeal</h1>
          <p className="mt-2 text-gray-500">Admin Dashboard Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@grabdeal.com"
              className="w-full rounded-xl border border-purple-100 px-4 py-3 outline-none focus:border-purple-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full rounded-xl border border-purple-100 px-4 py-3 outline-none focus:border-purple-600"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-xl bg-purple-700 py-3 font-bold text-white hover:bg-purple-800 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}