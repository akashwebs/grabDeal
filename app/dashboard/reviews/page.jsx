'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'ttps://grabdeal-server.vercel.app/api/v1';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/reviews`);
      const data = await res.json();

      const result =
        data?.data?.result ||
        data?.data?.reviews ||
        data?.data ||
        data ||
        [];

      setReviews(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Review fetch error:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This review will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7b00ff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete',
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(`${API_URL}/reviews/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      Swal.fire('Deleted!', 'Review deleted successfully', 'success');
      fetchReviews();
    } else {
      Swal.fire('Error!', 'Delete failed', 'error');
    }
  };

  if (loading) {
    return <p className="font-bold text-purple-700">Loading reviews...</p>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-[#16013d]">
            Reviews Management
          </h1>
          <p className="mt-2 text-gray-500">
            Manage customer feedback and homepage reviews.
          </p>
        </div>

        <Link
          href="/dashboard/reviews/add"
          className="rounded-xl bg-purple-700 px-6 py-3 font-bold text-white"
        >
          + Add Review
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((item) => (
          <div
            key={item._id}
            className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-4">
              <img
                src={item.image || '/avatar.png'}
                alt={item.name}
                className="h-16 w-16 rounded-full border-2 border-purple-100 object-cover"
              />

              <div>
                <h3 className="text-lg font-black text-[#16013d]">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.role || 'No role'}
                </p>
              </div>
            </div>

            <div className="mb-4 flex text-yellow-400">
              {Array.from({ length: Number(item.rating || 5) }).map(
                (_, index) => (
                  <span key={index}>★</span>
                )
              )}
            </div>

            <p className="line-clamp-3 text-sm leading-7 text-gray-600">
              “{item.comment}”
            </p>

            <div className="mt-5 flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  item.status === 'active'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                {item.status}
              </span>

              <div className="flex gap-2">
                <Link
                  href={`/dashboard/reviews/edit/${item._id}`}
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
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm md:col-span-2 xl:col-span-3">
            <h2 className="text-2xl font-black text-purple-700">
              No reviews found
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}