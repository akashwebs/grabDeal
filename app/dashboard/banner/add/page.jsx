'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export default function AddBannerPage() {
  const router = useRouter();

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    image: '',
    title: '',
    subtitle: '',
    discount: '',
    status: 'active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      Swal.fire('Invalid File', 'Please upload PNG, JPG or WEBP image', 'error');
      e.target.value = '';
      return;
    }

    const maxSize = 900 * 1024;

    if (file.size > maxSize) {
      Swal.fire('Image Too Large', 'Maximum image size is 900 KB', 'warning');
      e.target.value = '';
      return;
    }

    try {
      setUploading(true);

      const imageData = new FormData();
      imageData.append('image', file);

      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: imageData,
      });

      const data = await res.json();

      if (!res.ok) {
        setUploading(false);
        Swal.fire('Upload Failed', data?.message || 'Something went wrong', 'error');
        return;
      }

      setFormData({
        ...formData,
        image: data?.url || data?.secure_url || '',
      });

      setUploading(false);

      Swal.fire({
        icon: 'success',
        title: 'Uploaded',
        text: 'Image uploaded successfully',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      setUploading(false);
      console.log(error);
      Swal.fire('Upload Error', 'Server upload failed', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      Swal.fire('Image Required', 'Please upload banner image', 'warning');
      return;
    }

    const payload = {
      image: formData.image,
      title: formData.title,
      subtitle: formData.subtitle,
      discount: formData.discount,
      status: formData.status,
    };

    try {
      setSubmitting(true);

      const res = await fetch(`${API_URL}/banner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitting(false);
        Swal.fire('Create Failed', data?.message || 'Banner create failed', 'error');
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Created',
        text: 'Banner created successfully',
        timer: 1500,
        showConfirmButton: false,
      });

      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      console.log('Banner create error:', error);
      Swal.fire('Server Error', 'Something went wrong', 'error');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#16013d]">
          Add Banner
        </h1>
        <p className="mt-2 text-gray-500">
          Create homepage hero slider banner.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold">
              Banner Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full rounded-xl border border-purple-100 px-4 py-3"
            />

            {uploading && (
              <p className="mt-2 text-sm font-bold text-purple-600">
                Uploading...
              </p>
            )}

            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-4 h-64 w-full rounded-2xl border object-cover"
              />
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Fashion Mega Sale"
              className="w-full rounded-xl border border-purple-100 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              Discount Text
            </label>

            <input
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="Up to 70% OFF"
              className="w-full rounded-xl border border-purple-100 px-4 py-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold">
              Subtitle
            </label>

            <textarea
              name="subtitle"
              rows="4"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Find latest clothing, footwear and accessories offers from top stores."
              className="w-full rounded-xl border border-purple-100 px-4 py-3"
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
              className="w-full rounded-xl border border-purple-100 px-4 py-3"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="submit"
            disabled={uploading || submitting}
            className="rounded-xl bg-purple-700 px-8 py-3 font-bold text-white disabled:opacity-50"
          >
            {submitting ? 'Saving...' : 'Save Banner'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/dashboard/banners')}
            className="rounded-xl border border-purple-200 px-8 py-3 font-bold text-purple-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}