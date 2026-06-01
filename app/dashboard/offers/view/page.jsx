'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function ViewOffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("offer",offers)
  

  const fetchOffers = async () => {
    try {
      setLoading(true);

      const res = await fetch('ttps://grabdeal-server.vercel.app/api/v1/offers', {
        cache: 'no-store',
      });

      const data = await res.json();

      setOffers(data?.data.products || data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      Swal.fire({
        icon: 'error',
        title: 'Fetch Failed',
        text: 'Offers load korte problem hocche',
        confirmButtonColor: '#7b00ff',
      });

      console.log(error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This offer will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#7b00ff',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`ttps://grabdeal-server.vercel.app/api/v1/offers/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: data?.message || 'Something went wrong',
          confirmButtonColor: '#7b00ff',
        });
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'Offer deleted successfully',
        timer: 1300,
        showConfirmButton: false,
      });

      fetchOffers();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Delete request failed',
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
            All Offers
          </h1>
          <p className="mt-2 text-gray-500">
            Manage all offers from here. You can view, edit and delete offers.
          </p>
        </div>

        <Link
          href="/dashboard/offers"
          className="rounded-xl bg-purple-700 px-6 py-3 text-center font-bold text-white hover:bg-purple-800"
        >
          + Add New Offer
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr className="bg-purple-50 text-left text-sm text-purple-900">
                <th className="px-5 py-4 font-black">Image</th>
                <th className="px-5 py-4 font-black">Title</th>
                <th className="px-5 py-4 font-black">Merchant</th>
                <th className="px-5 py-4 font-black">Brand</th>
                <th className="px-5 py-4 font-black">Category</th>
                <th className="px-5 py-4 font-black">Discount</th>
                <th className="px-5 py-4 font-black">Type</th>
                <th className="px-5 py-4 font-black">Verified</th>
                <th className="px-5 py-4 font-black">Expiry</th>
                <th className="px-5 py-4 font-black">Status</th>
                <th className="px-5 py-4 text-right font-black">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="11" className="px-5 py-10 text-center text-gray-500">
                    Loading offers...
                  </td>
                </tr>
              )}

              {!loading && offers.length === 0 && (
                <tr>
                  <td colSpan="11" className="px-5 py-10 text-center text-gray-500">
                    No offers found.
                  </td>
                </tr>
              )}

              {!loading &&
                offers.map((offer) => (
                  <tr
                    key={offer._id}
                    className="border-t border-purple-100 text-sm hover:bg-purple-50/40"
                  >
                    <td className="px-5 py-4">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="h-14 w-20 rounded-xl object-contain border bg-white p-1"
                      />
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-black text-[#16013d]">
                        {offer.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {offer.couponCode || 'No Coupon'}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {offer.merchantName}
                    </td>

                    <td className="px-5 py-4">
                      {offer.brands || '-'}
                    </td>

                    <td className="px-5 py-4">
                      {offer.category || '-'}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700">
                        {offer.discount}% OFF
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={
                          offer.offerType === 'online'
                            ? 'rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-600'
                            : 'rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-600'
                        }
                      >
                        ● {offer.offerType}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={
                          offer.verified
                            ? 'rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-600'
                            : 'rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600'
                        }
                      >
                        {offer.verified ? '✓ Yes' : '✕ No'}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {offer.expiryDate
                        ? new Date(offer.expiryDate).toLocaleString()
                        : '-'}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={
                          offer.status
                            ? 'rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600'
                            : 'rounded-full bg-gray-100 px-3 py-1 text-xs font-black text-gray-500'
                        }
                      >
                        {offer.status ? 'Published' : 'Draft'}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/offers/${offer._id}`}
                          className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-100"
                        >
                          View
                        </Link>

                        <Link
                          href={`/dashboard/offers/edit/${offer._id}`}
                          className="rounded-lg bg-purple-50 px-3 py-2 text-xs font-bold text-purple-700 hover:bg-purple-100"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(offer._id)}
                          className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
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