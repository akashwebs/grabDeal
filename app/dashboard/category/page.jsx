'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';

export default function CategoryPage() {
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    imageURLs: [],
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
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const maxSize = 900 * 1024;

    for (const file of files) {
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
    }

    try {
      setUploading(true);

      const uploadedUrls = [];

      for (const file of files) {
        const imageData = new FormData();
        imageData.append('image', file);

        const res = await fetch('ttps://grabdeal-server.vercel.app/api/v1/upload', {
          method: 'POST',
          body: imageData,
        });

        const data = await res.json();

        if (!res.ok) {
          Swal.fire({
            icon: 'error',
            title: 'Upload Failed',
            text: data?.message || 'Image upload failed.',
            confirmButtonColor: '#7b00ff',
          });

          setUploading(false);
          return;
        }

        const url = data?.url || data?.secure_url || data?.image;

        if (url) uploadedUrls.push(url);
      }

      setFormData({
        ...formData,
        imageURLs: [...formData.imageURLs, ...uploadedUrls],
      });

      Swal.fire({
        icon: 'success',
        title: 'Uploaded',
        text: 'Category image uploaded successfully.',
        timer: 1500,
        showConfirmButton: false,
      });

      setUploading(false);
      e.target.value = '';
    } catch (error) {
      setUploading(false);

      Swal.fire({
        icon: 'error',
        title: 'Upload Error',
        text: 'Server upload failed.',
        confirmButtonColor: '#7b00ff',
      });

      console.log(error);
    }
  };

  const removeImage = (index) => {
    const updatedImages = formData.imageURLs.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      imageURLs: updatedImages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Title Required',
        text: 'Please enter category title.',
        confirmButtonColor: '#7b00ff',
      });
      return;
    }

    

    try {
      setSubmitting(true);

      const res = await fetch('ttps://grabdeal-server.vercel.app/api/v1/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          title: formData.title,
          imageURLs: formData.imageURLs || " ",
          status: formData.status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Create Failed',
          text: data?.message || 'Category create failed.',
          confirmButtonColor: '#7b00ff',
        });

        setSubmitting(false);
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Category created successfully.',
        timer: 1600,
        showConfirmButton: false,
      });

      setFormData({
        title: '',
        imageURLs: [],
        status: 'active',
      });

      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);

      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Category post request failed.',
        confirmButtonColor: '#7b00ff',
      });

      console.log(error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#16013d]">
          Category Management
        </h1>

        <p className="mt-2 text-gray-500">
          Add category with image and status.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm"
        >
          <h2 className="mb-6 text-2xl font-black text-purple-700">
            Add New Category
          </h2>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold">
                Category Title
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text"
                placeholder="Clothing"
                className="w-full rounded-xl border border-purple-100 px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                Category Image
              </label>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full rounded-xl border border-purple-100 px-4 py-3"
              />

              <p className="mt-2 text-xs text-gray-500">
                JPG, PNG, WEBP only. Max size 900KB per image.
              </p>

              {uploading && (
                <p className="mt-2 text-sm font-bold text-purple-600">
                  Uploading image...
                </p>
              )}
            </div>

            {formData.imageURLs.length > 0 && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {formData.imageURLs.map((url, index) => (
                  <div
                    key={url}
                    className="relative rounded-2xl border border-purple-100 bg-gray-50 p-2"
                  >
                    <img
                      src={url}
                      alt="category"
                      className="h-28 w-full rounded-xl object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

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
              {submitting ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>

        <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-black text-purple-700">
            Live Preview
          </h2>

          <div className="overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm">
            <div className="h-56 bg-gray-50">
              {formData.imageURLs[0] ? (
                <img
                  src={formData.imageURLs[0]}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  Image Preview
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-2xl font-black text-[#16013d]">
                {formData.title || 'Category Title'}
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

         {/*  <div className="mt-6 rounded-2xl bg-purple-50 p-5">
            <h3 className="font-black text-purple-700">API Endpoint</h3>
            <p className="mt-2 text-sm text-gray-600">
              POST: ttps://grabdeal-server.vercel.app/api/v1/categories
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}