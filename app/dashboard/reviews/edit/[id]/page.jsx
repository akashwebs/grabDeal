'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { uploadToCloudinary } from '@/lib/uploadToCloudinary';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'ttps://grabdeal-server.vercel.app/api/v1';

export default function EditReviewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: '',
    rating: 5,
    comment: '',
    status: 'active',
  });

  useEffect(() => {
    if (id) fetchReview();
  }, [id]);

  const fetchReview = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/reviews/${id}`);
      const data = await res.json();

      if (!res.ok) {
        Swal.fire('Error', data?.message || 'Review load failed', 'error');
        setLoading(false);
        return;
      }

      const review = data?.data?.result || data?.data || data;

      setFormData({
        name: review?.name || '',
        role: review?.role || '',
        image: review?.image || '',
        rating: review?.rating || 5,
        comment: review?.comment || '',
        status: review?.status || 'active',
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Review fetch error:', error);
      Swal.fire('Server Error', 'Review load failed', 'error');
    }
  };

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

      const result = await uploadToCloudinary(file);

      if (!result.success) {
        setUploading(false);
        Swal.fire('Upload Failed', result.message || 'Something went wrong', 'error');
        return;
      }

      setFormData({
        ...formData,
        image: result.url,
      });

      setUploading(false);

      Swal.fire({
        icon: 'success',
        title: 'Uploaded',
        text: 'Image uploaded successfully',
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      setUploading(false);
      Swal.fire('Upload Error', 'Image upload failed', 'error');
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      image: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      role: formData.role,
      image: formData.image,
      rating: Number(formData.rating),
      comment: formData.comment,
      status: formData.status,
    };

    try {
      setSubmitting(true);

      const res = await fetch(`${API_URL}/reviews/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitting(false);
        Swal.fire('Update Failed', data?.message || 'Review update failed', 'error');
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: 'Review updated successfully',
        timer: 1200,
        showConfirmButton: false,
      });

      setSubmitting(false);
      router.push('/dashboard/reviews');
    } catch (error) {
      setSubmitting(false);
      Swal.fire('Server Error', 'Something went wrong', 'error');
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="font-bold text-purple-700">Loading review...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#16013d]">
          Edit Review
        </h1>
        <p className="mt-2 text-gray-500">
          Update customer feedback for homepage section.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold">
              Customer Name
            </label>
            <input
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Rashed Ahmed"
              className="w-full rounded-xl border border-purple-100 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              Role
            </label>
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Regular Shopper"
              className="w-full rounded-xl border border-purple-100 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              Rating
            </label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full rounded-xl border border-purple-100 px-4 py-3"
            >
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
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

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold">
              Customer Image
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
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-20 w-20 rounded-full border object-cover"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold">
              Comment
            </label>

            <textarea
              name="comment"
              required
              rows="5"
              maxLength="500"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Write customer feedback..."
              className="w-full rounded-xl border border-purple-100 px-4 py-3"
            />

            <p className="mt-1 text-xs text-gray-500">
              {formData.comment.length}/500 characters
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="submit"
            disabled={uploading || submitting}
            className="rounded-xl bg-purple-700 px-8 py-3 font-bold text-white disabled:opacity-50"
          >
            {submitting ? 'Updating...' : 'Update Review'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/dashboard/reviews')}
            className="rounded-xl border border-purple-200 px-8 py-3 font-bold text-purple-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}