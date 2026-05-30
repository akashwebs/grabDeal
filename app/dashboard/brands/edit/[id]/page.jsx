'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { uploadToCloudinary } from '../../../../../lib/uploadToCloudinary';

export default function EditBrandPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    status: 'active',
  });

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await fetch(`https://grabdeal-server.vercel.app/api/v1/brands/${id}`, {
          cache: 'no-store',
        });

        const data = await res.json();
        const brand = data?.data || data;

        if (!res.ok) {
          Swal.fire({
            icon: 'error',
            title: 'Fetch Failed',
            text: data?.message || 'Brand data load failed.',
            confirmButtonColor: '#7b00ff',
          });
          return;
        }

        setFormData({
          name: brand?.name || '',
          image: brand?.image || '',
          status: brand?.status || 'active',
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);

        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Brand fetch request failed.',
          confirmButtonColor: '#7b00ff',
        });

        console.log(error);
      }
    };

    if (id) fetchBrand();
  }, [id]);

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
    const maxSize = 900 * 1024;

    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Only JPG, PNG and WEBP images are allowed.',
        confirmButtonColor: '#7b00ff',
      });

      e.target.value = '';
      return;
    }

    if (file.size > maxSize) {
      Swal.fire({
        icon: 'warning',
        title: 'Image Too Large',
        html: `
          Maximum image size is <b>900 KB</b><br/>
          Current file size: <b>${(file.size / 1024).toFixed(0)} KB</b>
        `,
        confirmButtonText: 'Choose Again',
        confirmButtonColor: '#7b00ff',
      });

      e.target.value = '';
      return;
    }

    try {
      setUploading(true);

      const result = await uploadToCloudinary(file);
      
      

      if (!result.success) {
        setUploading(false);
        Swal.fire('Upload Failed', data?.message || 'Something went wrong', 'error');
        return;
      }

      setFormData({
        ...formData,
        image: result?.url,
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

    if (!formData.name.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Brand Name Required',
        text: 'Please enter brand name.',
        confirmButtonColor: '#7b00ff',
      });
      return;
    }

    if (!formData.image) {
      Swal.fire({
        icon: 'warning',
        title: 'Brand Image Required',
        text: 'Please upload brand logo/image.',
        confirmButtonColor: '#7b00ff',
      });
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(`https://grabdeal-server.vercel.app/api/v1/brands/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          image: formData.image,
          status: formData.status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: data?.message || 'Brand update failed.',
          confirmButtonColor: '#7b00ff',
        });

        setSubmitting(false);
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: 'Brand updated successfully.',
        timer: 1500,
        showConfirmButton: false,
      });

      setSubmitting(false);
      router.push('/dashboard/brands/view');
    } catch (error) {
      setSubmitting(false);

      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Brand update request failed.',
        confirmButtonColor: '#7b00ff',
      });

      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center text-gray-500">
        Loading brand data...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#16013d]">
          Edit Brand
        </h1>

        <p className="mt-2 text-gray-500">
          Update brand name, logo and status.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm"
        >
          <h2 className="mb-6 text-2xl font-black text-purple-700">
            Update Brand
          </h2>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold">
                Brand Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Daraz"
                className="w-full rounded-xl border border-purple-100 px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                Brand Logo / Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full rounded-xl border border-purple-100 px-4 py-3"
              />

              <p className="mt-2 text-xs text-gray-500">
                JPG, PNG, WEBP only. Max size 900KB.
              </p>

              {uploading && (
                <p className="mt-2 text-sm font-bold text-purple-600">
                  Uploading image...
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-purple-100 px-4 py-3 outline-none focus:border-purple-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <button
              disabled={uploading || submitting}
              type="submit"
              className="rounded-xl bg-purple-700 px-8 py-3 font-bold text-white transition hover:bg-purple-800 disabled:opacity-50"
            >
              {submitting ? 'Updating...' : 'Update Brand'}
            </button>
          </div>
        </form>

        <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-black text-purple-700">
            Live Preview
          </h2>

          <div className="rounded-3xl border border-purple-100 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-3xl bg-purple-50 p-5">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="brand preview"
                  className="max-h-24 object-contain"
                />
              ) : (
                <span className="text-sm text-gray-400">Logo Preview</span>
              )}
            </div>

            <h3 className="mt-5 text-2xl font-black text-[#16013d]">
              {formData.name || 'Brand Name'}
            </h3>

            <span
              className={
                formData.status === 'active'
                  ? 'mt-4 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-600'
                  : 'mt-4 inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600'
              }
            >
              {formData.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}