'use client';

import { useEffect, useState } from 'react';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export default function HeroSlider() {
  const [sliders, setSliders] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetchSliders();
  }, []);

  useEffect(() => {
    if (sliders.length <= 1) return;

    const interval = setInterval(() => {
      changeSlide((activeSlide + 1) % sliders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeSlide, sliders.length]);

  const fetchSliders = async () => {
    try {
      const res = await fetch(`${API_URL}/banner`);
      const data = await res.json();

      const result = data?.data?.result || data?.data || data || [];
      setSliders(result.filter((item) => item.status === 'active'));
    } catch (error) {
      console.log('Slider fetch error:', error);
    }
  };

  const changeSlide = (index) => {
    setFade(false);

    setTimeout(() => {
      setActiveSlide(index);
      setFade(true);
    }, 250);
  };

  if (!sliders.length) return null;

  const currentSlide = sliders[activeSlide];

  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:py-6 lg:px-8">
      <div className="relative h-[260px] overflow-hidden rounded-[24px] shadow-2xl sm:h-[340px] md:h-[430px] lg:h-[500px] lg:rounded-[32px]">
        <img
          src={currentSlide.image}
          alt={currentSlide.title || 'Slider image'}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out ${
            fade ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#12002f]/90 via-[#7b00ff]/55 to-transparent" />

        <div
          className={`relative z-10 flex h-full max-w-2xl flex-col justify-center p-5 text-white transition-all duration-700 ease-in-out sm:p-8 md:p-12 lg:p-16 ${
            fade ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
        >
          {currentSlide.discount && (
            <span className="mb-3 w-fit rounded-full bg-white/20 px-4 py-2 text-xs font-extrabold backdrop-blur-md sm:mb-5 sm:text-sm">
              {currentSlide.discount}
            </span>
          )}

          {currentSlide.title && (
            <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-6xl lg:text-7xl">
              {currentSlide.title}
            </h2>
          )}

          {currentSlide.subtitle && (
            <p className="mt-3 max-w-xl text-sm text-white/90 sm:text-base md:mt-5 md:text-xl">
              {currentSlide.subtitle}
            </p>
          )}

          <a
            href="#today"
            className="mt-5 w-fit rounded-2xl bg-white px-5 py-3 text-sm font-bold text-purple-700 shadow-xl transition hover:scale-105 sm:mt-8 sm:px-7 sm:py-4 sm:text-base"
          >
            Explore Offers →
          </a>
        </div>

        {sliders.length > 1 && (
          <>
            <button
              onClick={() =>
                changeSlide((activeSlide - 1 + sliders.length) % sliders.length)
              }
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-xl font-black text-purple-700 shadow-xl sm:left-5 sm:px-4 sm:py-3 sm:text-2xl"
            >
              ‹
            </button>

            <button
              onClick={() => changeSlide((activeSlide + 1) % sliders.length)}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-xl font-black text-purple-700 shadow-xl sm:right-5 sm:px-4 sm:py-3 sm:text-2xl"
            >
              ›
            </button>

            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-8 sm:gap-3">
              {sliders.map((slide, index) => (
                <button
                  key={slide._id || index}
                  onClick={() => changeSlide(index)}
                  className={
                    index === activeSlide
                      ? 'h-2.5 w-8 rounded-full bg-white transition-all sm:h-3 sm:w-10'
                      : 'h-2.5 w-2.5 rounded-full bg-white/60 transition-all sm:h-3 sm:w-3'
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}