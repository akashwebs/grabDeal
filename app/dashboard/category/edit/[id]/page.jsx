'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'ttps://grabdeal-server.vercel.app/api/v1';

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    imageURLs: '',
    status: 'active',
  });

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/categories/${id}`);
      const data = await res.json();

      const category = data?.data?.result || data?.data || data;

      setFormData({
        title: category?.title || '',
        imageURLs: Array.isArray(category?.imageURLs)
          ? category.imageURLs.join('\n')
          : '',
        status: category?.status || 'active',
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Category fetch error:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Category load failed',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageURLs = formData.imageURLs
      .split('\n')
      .map((url) => url.trim())
      .filter(Boolean) || " ";

    const payload = {
      title: formData.title,
      imageURLs,
      status: formData.status,
    };

    try {
      setSubmitting(true);

      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitting(false);

        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: data?.message || 'Category update failed',
        });

        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: 'Category updated successfully',
        timer: 1500,
        showConfirmButton: false,
      });

      setSubmitting(false);

     
    } catch (error) {
      setSubmitting(false);
      console.log('Category update error:', error);

      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Something went wrong',
      });
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="font-bold text-purple-700">Loading category...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#16013d]">
          Edit Category
        </h1>
        <p className="mt-2 text-gray-500">
          Update category title, images and status.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold">
              Category Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Electronics"
              required
              className="w-full rounded-xl border border-purple-100 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-purple-100 px-4 py-3 outline-none focus:border-purple-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold">
              Image URLs
            </label>

            <textarea
              name="imageURLs"
              rows="5"
              value={formData.imageURLs}
              onChange={handleChange}
              placeholder="https://example.com/image-1.jpg"
              className="w-full rounded-xl border border-purple-100 px-4 py-3 outline-none focus:border-purple-500"
            />

            <p className="mt-2 text-xs text-gray-500">
              Multiple image URL দিতে চাইলে প্রতি লাইনে একটি করে URL দিন।
            </p>
          </div>
        </div>

        {formData.imageURLs && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {formData.imageURLs
              .split('\n')
              .map((url) => url.trim())
              .filter(Boolean)
              .map((url) => (
                <img
                  key={url}
                  src={url}
                  alt="Category preview"
                  className="h-32 w-full rounded-xl border object-cover"
                />
              ))}
          </div>
        )}

        <div className="mt-8 flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-purple-700 px-8 py-3 font-bold text-white disabled:opacity-50"
          >
            {submitting ? 'Updating...' : 'Update Category'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/dashboard/categories')}
            className="rounded-xl border border-purple-200 px-8 py-3 font-bold text-purple-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}