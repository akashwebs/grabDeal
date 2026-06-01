'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { uploadToCloudinary } from "../../../../../lib/uploadToCloudinary";

import Swal from 'sweetalert2';

export default function EditOfferPage() {
  const { id } = useParams();
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    image: '',
    discount: '',
    merchantName: '',
    expiryDate: '',
    offerType: 'online',
    verified: true,
    couponCode: '',
    title: '',
    brands: '',
    category: '',
    description: '',
    termsAndCondition: '',
    shopLink: '',
    status: true,
  });

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchOffer();
  }, [id]);

  const formatDateTimeLocal = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const offset = d.getTimezoneOffset();
    const localDate = new Date(d.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  const fetchOffer = async () => {
    try {
      setLoading(true);

      const res = await fetch(`ttps://grabdeal-server.vercel.app/api/v1/offers/${id}`);
      const data = await res.json();

      const offer = data?.data || data?.data?.result || data;

      setFormData({
        image: offer?.image || '',
        discount: offer?.discount || '',
        merchantName: offer?.merchantName || '',
        expiryDate: formatDateTimeLocal(offer?.expiryDate),
        offerType: offer?.offerType || 'online',
        verified: offer?.verified ?? true,
        couponCode: offer?.couponCode || '',
        title: offer?.title || '',
        brands: offer?.brands || '',
        category: offer?.category || '',
        description: offer?.description || '',
        termsAndCondition: offer?.termsAndCondition || '',
        shopLink: offer?.shopLink || '',
        status: offer?.status ?? true,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Offer fetch error:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('ttps://grabdeal-server.vercel.app/api/v1/categories');
      const data = await res.json();
      setCategories(data?.data?.result || data || []);
    } catch (error) {
      console.log('Category fetch error:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch('ttps://grabdeal-server.vercel.app/api/v1/brands');
      const data = await res.json();
      setBrands(data?.data?.result || data || []);
    } catch (error) {
      console.log('Brand fetch error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
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

    const payload = {
      image: formData.image,
      discount: Number(formData.discount),
      merchantName: formData.merchantName,
      expiryDate: formData.expiryDate,
      offerType: formData.offerType,
      verified: formData.verified,
      couponCode: formData.couponCode,
      title: formData.title,
      brands: formData.brands,
      category: formData.category,
      description: formData.description,
      termsAndCondition: formData.termsAndCondition,
      shopLink: formData.shopLink,
      status: formData.status,
    };

    try {
      setSubmitting(true);

      const res = await fetch(`ttps://grabdeal-server.vercel.app/api/v1/offers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire('Update Failed', data?.message || 'Offer update failed', 'error');
        setSubmitting(false);
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: 'Offer updated successfully',
        timer: 1500,
        showConfirmButton: false,
      });

      setSubmitting(false);
    //   router.push('/dashboard/offers');
    } catch (error) {
      setSubmitting(false);
      console.log('Offer update error:', error);
    }
  };

  if (loading) {
    return <p className="p-6 text-lg font-bold text-purple-700">Loading offer...</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#16013d]">Edit Offer</h1>
        <p className="mt-2 text-gray-500">
          Update offer information, image, category and brand.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold">Offer Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full rounded-xl border border-purple-100 px-4 py-3" />

            {uploading && <p className="mt-2 text-sm text-purple-600">Uploading...</p>}

            {formData.image && (
              <img src={formData.image} alt="preview" className="mt-4 h-40 w-full rounded-xl border object-contain" />
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Discount %</label>
            <input name="discount" type="number" min="0" max="100" value={formData.discount} onChange={handleChange} className="w-full rounded-xl border border-purple-100 px-4 py-3" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Merchant Name</label>
            <input name="merchantName" value={formData.merchantName} onChange={handleChange} className="w-full rounded-xl border border-purple-100 px-4 py-3" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Expiry Date & Time</label>
            <input name="expiryDate" type="datetime-local" value={formData.expiryDate} onChange={handleChange} className="w-full rounded-xl border border-purple-100 px-4 py-3" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Offer Type</label>
            <select name="offerType" value={formData.offerType} onChange={handleChange} className="w-full rounded-xl border border-purple-100 px-4 py-3">
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Verified</label>
            <select value={String(formData.verified)} onChange={(e) => setFormData({ ...formData, verified: e.target.value === 'true' })} className="w-full rounded-xl border border-purple-100 px-4 py-3">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full rounded-xl border border-purple-100 px-4 py-3">
              <option value="">Select Category</option>
              {categories.map((item) => (
                <option key={item._id || item.title} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Brand</label>
            <select name="brands" value={formData.brands} onChange={handleChange} className="w-full rounded-xl border border-purple-100 px-4 py-3">
              <option value="">Select Brand</option>
              {brands.map((item) => (
                <option key={item._id || item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Coupon Code</label>
            <input name="couponCode" value={formData.couponCode} onChange={handleChange} className="w-full rounded-xl border border-purple-100 px-4 py-3" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Shop Link</label>
            <input name="shopLink" type="url" value={formData.shopLink} onChange={handleChange} className="w-full rounded-xl border border-purple-100 px-4 py-3" />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold">Title</label>
            <input name="title" value={formData.title} onChange={handleChange} className="w-full rounded-xl border border-purple-100 px-4 py-3" />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold">Description</label>
            <textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full rounded-xl border border-purple-100 px-4 py-3" />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold">Terms & Conditions</label>
            <textarea name="termsAndCondition" rows="6" value={formData.termsAndCondition} onChange={handleChange} className="w-full rounded-xl border border-purple-100 px-4 py-3" />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <input id="status" name="status" type="checkbox" checked={formData.status} onChange={handleChange} className="h-5 w-5 accent-purple-700" />
          <label htmlFor="status" className="font-bold">Publish this offer</label>
        </div>

        <button disabled={uploading || submitting} type="submit" className="mt-8 rounded-xl bg-purple-700 px-8 py-3 font-bold text-white disabled:opacity-50">
          {submitting ? 'Updating...' : 'Update Offer'}
        </button>
      </form>
    </div>
  );
}