'use client';

import { useEffect, useState } from 'react';

export default function OfferActions({ offer }) {
  const [wishlist, setWishlist] = useState([]);
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('grabdeal_wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  const handleShare = async () => {
    const shareUrl = window.location.href;

    const shareData = {
      title: offer?.title,
      text: `${offer?.title} - ${offer?.discount} at ${offer?.merchant || offer?.brand}`,
      url: shareUrl,
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert('Offer link copied!');
    }
  };

  const handleWishlist = () => {
    const saved = localStorage.getItem('grabdeal_wishlist');
    const oldWishlist = saved ? JSON.parse(saved) : [];

    const exists = oldWishlist.find((item) => item.id === offer.id);

    let updatedWishlist;

    if (exists) {
      updatedWishlist = oldWishlist;
    } else {
      updatedWishlist = [
        ...oldWishlist,
        {
          id: offer.id,
          title: offer.title,
          image: offer.image,
          discount: offer.discount,
          merchant: offer.merchant || offer.brand,
          url: window.location.href,
        },
      ];
    }

    localStorage.setItem('grabdeal_wishlist', JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
    setShowBox(true);
  };

  const handleReport = () => {
    const message = `
Hello GrabDeal Team,

I want to report this offer:

Title: ${offer?.title}
Merchant: ${offer?.merchant || offer?.brand}
Discount: ${offer?.discount}
Category: ${offer?.category}
Offer Link: ${window.location.href}
`;

    const phone = '88000000000';
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div className="flex justify-center gap-10 mt-6 text-sm">
        <button onClick={handleShare}>↗ Share</button>
        <button onClick={handleWishlist}>♡ Wishlist</button>
        <button onClick={handleReport}>⚠ Report</button>
      </div>

      {showBox && (
        <div className="fixed right-5 top-24 z-50 w-80 rounded-3xl border border-purple-100 bg-white p-5 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-black text-[#16013d]">
              Wishlist
            </h3>

            <button
              onClick={() => setShowBox(false)}
              className="rounded-full bg-purple-50 px-3 py-1 font-bold text-purple-700"
            >
              ✕
            </button>
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 rounded-2xl bg-purple-50 p-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-14 w-14 rounded-xl object-cover"
                />

                <div>
                  <p className="text-sm font-bold text-[#16013d]">
                    {item.title}
                  </p>
                  <p className="text-xs text-purple-700">
                    {item.discount}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.merchant}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}