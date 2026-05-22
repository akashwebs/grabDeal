'use client';

import { useState } from 'react';

const sliders = [
  {
    image: '/sliders/slider-1.jpg',
    title: 'Fashion Mega Sale',
    subtitle: 'Find latest clothing, footwear and accessories offers from top stores.',
    discount: 'Up to 70% OFF',
  },
  {
    image: '/sliders/slider-2.jpg',
    title: 'Footwear Deals',
    subtitle: 'Compare active discounts before purchasing from your favorite shop.',
    discount: 'Flat 40% OFF',
  },
  {
    image: '/sliders/slider-3.jpg',
    title: 'Accessories Offers',
    subtitle: 'Verified online and offline discount information in one place.',
    discount: 'New Deals Daily',
  },
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  const currentSlide = sliders[activeSlide];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % sliders.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + sliders.length) % sliders.length);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8">

      <div className="relative h-[280px] overflow-hidden rounded-[32px] shadow-2xl md:h-[500px]">

        {/* Slider Image */}
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#12002f]/90 via-[#7b00ff]/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex h-full max-w-2xl flex-col justify-center p-8 text-white md:p-16">

          <span className="mb-5 w-fit rounded-full bg-white/20 px-5 py-2 text-sm font-extrabold backdrop-blur-md">
            {currentSlide.discount}
          </span>

          <h2 className="text-4xl font-black leading-tight md:text-7xl">
            {currentSlide.title}
          </h2>

          <p className="mt-5 max-w-xl text-base text-white/90 md:text-xl">
            {currentSlide.subtitle}
          </p>

          <a
            href="#today"
            className="mt-8 w-fit rounded-2xl bg-white px-7 py-4 font-bold text-purple-700 shadow-xl transition hover:scale-105"
          >
            Explore Offers →
          </a>

        </div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-2xl font-black text-purple-700 shadow-xl md:left-6"
          aria-label="Previous slide"
        >
          ‹
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-2xl font-black text-purple-700 shadow-xl md:right-6"
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">

          {sliders.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={
                index === activeSlide
                  ? 'h-3 w-10 rounded-full bg-white transition-all'
                  : 'h-3 w-3 rounded-full bg-white/60 transition-all'
              }
            />
          ))}

        </div>

      </div>

    </section>
  );
}