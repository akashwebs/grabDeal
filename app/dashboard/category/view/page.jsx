'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function AllCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await fetch('ttps://grabdeal-server.vercel.app/api/v1/categories', {
        cache: 'no-store',
      });

      const data = await res.json();

      setCategories(data?.data.result || data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      Swal.fire({
        icon: 'error',
        title: 'Fetch Failed',
        text: 'Categories load korte problem hocche.',
        confirmButtonColor: '#7b00ff',
      });

      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This category will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#7b00ff',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`ttps://grabdeal-server.vercel.app/api/v1/categories/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: data?.message || 'Something went wrong.',
          confirmButtonColor: '#7b00ff',
        });
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'Category deleted successfully.',
        timer: 1300,
        showConfirmButton: false,
      });

      fetchCategories();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Delete request failed.',
        confirmButtonColor: '#7b00ff',
      });

      console.log(error);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-black text-[#16013d]">
            All Categories
          </h1>

          <p className="mt-2 text-gray-500">
            Manage category list, edit status and delete category.
          </p>
        </div>

        <Link
          href="/dashboard/category"
          className="rounded-xl bg-purple-700 px-6 py-3 text-center font-bold text-white hover:bg-purple-800"
        >
          + Add Category
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="bg-purple-50 text-left text-sm text-purple-900">
                <th className="px-5 py-4 font-black">Image</th>
                <th className="px-5 py-4 font-black">Title</th>
                <th className="px-5 py-4 font-black">Status</th>
                <th className="px-5 py-4 font-black">Created Date</th>
                <th className="px-5 py-4 text-right font-black">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5" className="px-5 py-10 text-center text-gray-500">
                    Loading categories...
                  </td>
                </tr>
              )}

              {!loading && categories.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-5 py-10 text-center text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}

              {!loading &&
                categories.map((category) => (
                  <tr
                    key={category._id}
                    className="border-t border-purple-100 text-sm hover:bg-purple-50/40"
                  >
                    <td className="px-5 py-4">
                      <img
                        src={category?.imageURLs?.[0]}
                        alt={category.title}
                        className="h-16 w-24 rounded-xl border bg-white object-cover"
                      />
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-lg font-black text-[#16013d]">
                        {category.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {category.imageURLs?.length || 0} image uploaded
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={
                          category.status === 'active'
                            ? 'rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-600'
                            : 'rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600'
                        }
                      >
                        {category.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {category.createdAt
                        ? new Date(category.createdAt).toLocaleDateString()
                        : '-'}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/dashboard/category/edit/${category._id}`}
                          className="rounded-lg bg-purple-50 px-4 py-2 text-xs font-bold text-purple-700 hover:bg-purple-100"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(category._id)}
                          className="rounded-lg bg-red-50 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}