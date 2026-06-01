'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'ttps://grabdeal-server.vercel.app/api/v1';

export default function BannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/banner`);
      const data = await res.json();

      const result = data?.data?.result || data?.data || data || [];

      setBanners(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Banner fetch error:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This banner will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7b00ff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete',
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(`${API_URL}/banner/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      Swal.fire('Deleted!', 'Banner deleted successfully', 'success');
      fetchBanners();
    } else {
      Swal.fire('Error!', 'Delete failed', 'error');
    }
  };

  if (loading) {
    return <p className="font-bold text-purple-700">Loading banners...</p>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-[#16013d]">
            Banner Management
          </h1>
          <p className="mt-2 text-gray-500">
            Manage homepage hero slider banners.
          </p>
        </div>

        <Link
          href="/dashboard/banner/add"
          className="rounded-xl bg-purple-700 px-6 py-3 font-bold text-white"
        >
          + Add Banner
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-purple-50">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Discount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {banners.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-4">
                  <img
                    src={item.image}
                    alt={item.title || 'Banner'}
                    className="h-20 w-32 rounded-xl object-cover"
                  />
                </td>

                <td className="p-4">
                  <h3 className="font-black">{item.title || 'No Title'}</h3>
                  <p className="text-sm text-gray-500">
                    {item.subtitle || 'No Subtitle'}
                  </p>
                </td>

                <td className="p-4 font-bold text-purple-700">
                  {item.discount || 'N/A'}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item.status === 'active'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/dashboard/banner/edit/${item._id}`}
                      className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {banners.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center font-bold">
                  No banners found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}