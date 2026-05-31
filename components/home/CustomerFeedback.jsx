'use client';

import { useEffect, useState } from 'react';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export default function CustomerFeedback() {
  const [reviews, setReviews] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length <= 3) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/reviews?status=active`);
      const data = await res.json();

      const result =
        data?.data?.result || [];

        console.log("revew",result)
        

      setReviews(result);
    } catch (error) {
      console.log('Reviews fetch error:', error);
    }
  };

  if (!reviews.length) return null;

  const visibleReviews = [
    reviews[active],
    reviews[(active + 1) % reviews.length],
    reviews[(active + 2) % reviews.length],
  ].filter(Boolean);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-purple-600">
          Real Users
        </p>

        <h2 className="text-3xl font-extrabold text-[#16013d]">
          Our Customers’ Feedback
        </h2>

        <p className="mx-auto mt-2 max-w-2xl text-gray-500">
          Users share how GrabDeal helps them find active discounts before
          purchasing from stores.
        </p>
      </div>

      <div className="relative">
        <div className="grid gap-5 md:grid-cols-3">
          {visibleReviews.map((item) => (
            <div
              key={item._id}
              className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5 flex items-center gap-4">
                <img
                  src={item.image || '/avatar.png'}
                  alt={item.name}
                  className="h-14 w-14 rounded-full border-2 border-purple-100 object-cover"
                />

                <div>
                  <h3 className="font-black text-[#16013d]">
                    {item.name}
                  </h3>

                  {item.role && (
                    <p className="text-sm text-gray-500">
                      {item.role}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4 flex text-yellow-400">
                {Array.from({ length: Number(item.rating || 5) }).map(
                  (_, index) => (
                    <span key={index}>★</span>
                  )
                )}
              </div>

              <p className="text-sm leading-7 text-gray-600">
                “{item.comment}”
              </p>
            </div>
          ))}
        </div>

        {reviews.length > 3 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute -left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white px-4 py-3 text-xl font-black text-purple-700 shadow-xl lg:block"
            >
              ‹
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white px-4 py-3 text-xl font-black text-purple-700 shadow-xl lg:block"
            >
              ›
            </button>
          </>
        )}
      </div>

      {reviews.length > 3 && (
        <div className="mt-8 flex justify-center gap-2">
          {reviews.map((item, index) => (
            <button
              key={item._id}
              onClick={() => setActive(index)}
              className={
                index === active
                  ? 'h-3 w-10 rounded-full bg-purple-700 transition-all'
                  : 'h-3 w-3 rounded-full bg-purple-200 transition-all'
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}