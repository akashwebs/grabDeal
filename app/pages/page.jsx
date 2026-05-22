'use client';

import { useState } from 'react';

const navItems = ['All', 'Clothing', 'Footwear', 'Accessories'];

const offers = [
  { brand: 'AJIO', image: '/products/ajio.jpg', discount: '20% OFF', title: 'Stylish Men Shirt', ends: 'Ends in 2 days 04 : 12 : 45', online: true, verified: true },
  { brand: 'Myntra', image: '/products/myntra.jpg', discount: '50% OFF', title: 'Sneakers Collection', ends: 'Ends in 1 day 08 : 45 : 30', online: true, verified: true },
  { brand: 'Puma', image: '/products/puma.jpg', discount: '30% OFF', title: 'Running Shoes', ends: 'Ends in 2 days 02 : 10 : 20', online: false, verified: true },
  { brand: 'boAt', image: '/products/boat.jpg', discount: '40% OFF', title: 'Wireless Headphone', ends: 'Ends in 1 day 06 : 35 : 10', online: true, verified: true },
  { brand: 'Zudio', image: '/products/zudio.jpg', discount: '10% OFF', title: 'Casual T-Shirt', ends: 'Ends in 2 days 11 : 25 : 50', online: false, verified: true },
];

const sliders = [
  { image: '/sliders/slider-1.jpg', title: 'Fashion Mega Sale', subtitle: 'Find latest clothing, footwear and accessories offers from top stores.', discount: 'Up to 70% OFF' },
  { image: '/sliders/slider-2.jpg', title: 'Footwear Deals', subtitle: 'Compare active discounts before purchasing from your favorite shop.', discount: 'Flat 40% OFF' },
  { image: '/sliders/slider-3.jpg', title: 'Accessories Offers', subtitle: 'Verified online and offline discount information in one place.', discount: 'New Deals Daily' },
];

const newToday = [
  { brand: 'Daraz', image: '/products/daraz.jpg', discount: '25% OFF', title: 'Mega Fashion Campaign', ends: 'Ends in 5 days', online: true, verified: true },
  { brand: 'Bata', image: '/products/bata.jpg', discount: '15% OFF', title: 'Formal Footwear', ends: 'Ends in 4 days', online: false, verified: true },
  { brand: 'Samsung', image: '/products/samsung.jpg', discount: '12% OFF', title: 'Galaxy Accessories', ends: 'Ends in 3 days', online: true, verified: true },
  { brand: 'Apex', image: '/products/apex.jpg', discount: '20% OFF', title: 'Leather Shoes', ends: 'Ends in 6 days', online: false, verified: true },
];

const stores = [
  { name: 'Myntra', logo: '/brands/myntra.png' },
  { name: 'AJIO', logo: '/brands/ajio.png' },
  { name: 'Amazon', logo: '/brands/amazon.png' },
  { name: 'Flipkart', logo: '/brands/flipkart.png' },
  { name: 'Nike', logo: '/brands/nike.png' },
  { name: 'Puma', logo: '/brands/puma-logo.png' },
  { name: 'Zudio', logo: '/brands/zudio-logo.png' },
  { name: 'Adidas', logo: '/brands/adidas.png' },
];

const faqs = [
  'How does GrabDeal work?',
  'Are the offers verified?',
  'How can I use discount information?',
  'Does GrabDeal sell products directly?',
];

function getEndingSoon(list) {
  return list.filter((offer) => offer.ends.includes('1 day') || offer.ends.includes('2 days'));
}

function runSelfTests() {
  console.assert(getEndingSoon(offers).length === 5, 'Ending soon offers should include offers within 1 or 2 days');
  console.assert(newToday.every((offer) => !('code' in offer)), 'New Today cards should not contain coupon code');
  console.assert(stores.every((store) => store.logo), 'Every top store should have a logo');
}

if (typeof window !== 'undefined') runSelfTests();

function MenuIcon() {
  return <span className="block text-2xl leading-none">☰</span>;
}

function CloseIcon() {
  return <span className="block text-2xl leading-none">×</span>;
}

function OfferCard({ offer }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden bg-gray-50">
        <img src={offer.image} alt={offer.brand} className="h-full w-full object-cover transition duration-500 hover:scale-110" />
        <div className="absolute right-3 top-3 rounded-full bg-purple-700 px-3 py-1 text-xs font-bold text-white">{offer.discount}</div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-black">{offer.brand}</h3>
        <p className="mt-2 font-medium text-gray-600">{offer.title}</p>
        <p className="mt-4 text-xs font-bold text-red-500">⏱ {offer.ends}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold">
          <span className="text-green-600">✓ Verified</span>
          <span className={offer.online ? 'text-green-600' : 'text-orange-500'}>● {offer.online ? 'Online' : 'Offline'}</span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-purple-100 pt-4">
          <a className="text-sm font-bold text-purple-700" href="#details">Details</a>
          <a className="rounded-lg bg-purple-700 px-5 py-2 text-sm font-bold text-white" href="#offer">View Offer</a>
        </div>
      </div>
    </article>
  );
}

export default function GrabDealHomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = sliders[activeSlide];
  const endingOffers = getEndingSoon(offers);

  const nextSlide = () => setActiveSlide((activeSlide + 1) % sliders.length);
  const prevSlide = () => setActiveSlide((activeSlide - 1 + sliders.length) % sliders.length);

  return (
    <main className="min-h-screen bg-white text-[#16013d]">
      <header className="sticky top-0 z-50 border-b border-purple-100 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="group flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 text-white shadow-lg transition group-hover:scale-105">🛍</div>
              <h1 className="text-xl font-extrabold tracking-tight text-purple-700 sm:text-2xl">GrabDeal</h1>
            </a>

            <nav className="hidden items-center gap-10 text-sm font-bold lg:flex">
              <div className="group relative">
                <button className="rounded-xl bg-purple-50 px-5 py-3 text-purple-700">All⌄</button>
                <div className="invisible absolute left-0 top-12 w-52 rounded-2xl border border-purple-100 bg-white p-3 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                  {navItems.map((item) => <a key={item} className="block rounded-xl px-4 py-3 hover:bg-purple-50" href={`#${item.toLowerCase()}`}>{item}</a>)}
                </div>
              </div>
              {navItems.slice(1).map((item) => <a key={item} className="hover:text-purple-700" href={`#${item.toLowerCase()}`}>{item}</a>)}
            </nav>

            <div className="flex items-center gap-2">
              <a className="hidden rounded-xl px-4 py-2 text-sm font-bold text-purple-800 hover:bg-purple-50 sm:inline-flex" href="https://wa.me/880000000000">💬 WhatsApp</a>
              <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl p-2 text-purple-800 transition hover:bg-purple-50 lg:hidden" aria-label="Toggle menu">
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="border-t border-purple-100 py-4 lg:hidden">
              <nav className="flex flex-col gap-2 text-sm font-bold">
                {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-[#16013d] transition hover:bg-purple-50 hover:text-purple-700">{item}</a>)}
                <a href="https://wa.me/880000000000" className="mt-2 rounded-xl bg-green-50 px-4 py-3 font-extrabold text-green-600">💬 WhatsApp</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <div className="relative h-[280px] overflow-hidden rounded-[32px] shadow-2xl md:h-[500px]">
          <img src={currentSlide.image} alt={currentSlide.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12002f]/90 via-[#7b00ff]/50 to-transparent" />
          <div className="relative z-10 flex h-full max-w-2xl flex-col justify-center p-8 text-white md:p-16">
            <span className="mb-5 w-fit rounded-full bg-white/20 px-5 py-2 text-sm font-extrabold backdrop-blur-md">{currentSlide.discount}</span>
            <h2 className="text-4xl font-black leading-tight md:text-7xl">{currentSlide.title}</h2>
            <p className="mt-5 max-w-xl text-base text-white/90 md:text-xl">{currentSlide.subtitle}</p>
            <a href="#today" className="mt-8 w-fit rounded-2xl bg-white px-7 py-4 font-bold text-purple-700 shadow-xl transition hover:scale-105">Explore Offers →</a>
          </div>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-2xl font-black text-purple-700 shadow-xl md:left-6">‹</button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-2xl font-black text-purple-700 shadow-xl md:right-6">›</button>
          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
            {sliders.map((slide, index) => <button key={slide.title} onClick={() => setActiveSlide(index)} className={index === activeSlide ? 'h-3 w-10 rounded-full bg-white' : 'h-3 w-3 rounded-full bg-white/60'} aria-label={`Go to slide ${index + 1}`} />)}
          </div>
        </div>
      </section>

      <section id="today" className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">Today’s Offer</h2>
          <a className="text-sm font-bold text-purple-700" href="#all">View All →</a>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">{offers.map((offer) => <OfferCard key={offer.brand} offer={offer} />)}</div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 lg:px-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-purple-600">Freshly Added</p>
            <h2 className="text-3xl font-extrabold">New Today</h2>
            {/* <p className="mt-1 text-gray-500">আজকে নতুন যোগ হওয়া discount information — coupon code ছাড়াই brand discount, expiry ও offer type দেখা যাবে।</p> */}
          </div>
          <a className="hidden text-sm font-bold text-purple-700 md:block" href="#all">View All →</a>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {newToday.map((offer) => <OfferCard key={offer.brand} offer={offer} />)}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-purple-600">Trusted Brands</p>
            <h2 className="text-3xl font-extrabold">Top Stores</h2>
          </div>
          <a className="text-sm font-bold text-purple-700" href="#all">View All →</a>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {stores.map((store) => (
            <a key={store.name} href="#store" className="group relative overflow-hidden rounded-3xl border border-purple-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-pink-50 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-3 shadow-md">
                <img src={store.logo} alt={store.name} className="max-h-12 object-contain transition duration-300 group-hover:scale-110" />
              </div>
              <h3 className="relative z-10 mt-4 text-sm font-extrabold text-gray-800">{store.name}</h3>
              <p className="relative z-10 mt-1 text-xs text-gray-500">Latest Offers</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 lg:px-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-purple-600">Most Useful Deals</p>
            <h2 className="text-3xl font-extrabold">Popular Offers of the Day</h2>
            {/* <p className="mt-1 text-gray-500">User এখানে দেখে বুঝবে কোন shop-এ currently discount চলছে.</p> */}
          </div>
          <a className="hidden text-sm font-bold text-purple-700 md:block" href="#all">View All →</a>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {offers.slice(0, 3).map((offer) => (
            <div key={offer.brand} className="flex gap-4 rounded-3xl border border-purple-100 bg-white p-4 shadow-sm transition hover:shadow-xl">
              <img src={offer.image} alt={offer.brand} className="h-28 w-28 rounded-2xl object-cover" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div><h3 className="font-black">{offer.brand}</h3><p className="text-sm text-gray-500">{offer.title}</p></div>
                  <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-black text-pink-600">{offer.discount}</span>
                </div>
                <p className="mt-3 text-xs font-bold text-red-500">⏱ {offer.ends}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-green-600">✓ Verified</span>
                  <a className="rounded-lg bg-purple-700 px-4 py-2 text-xs font-bold text-white" href="#info">Get Info</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#24005e] to-[#7b00ff] p-6 text-white shadow-xl lg:p-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-orange-300">Expire within 2 days</p>
              <h2 className="text-3xl font-extrabold">Ending Soon</h2>
            </div>
            <a className="text-sm font-bold text-white" href="#all">View All →</a>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {endingOffers.map((offer) => (
              <div key={offer.brand} className="rounded-2xl bg-white p-5 text-[#16013d] shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-black">{offer.brand}</h3>
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600">{offer.discount}</span>
                </div>
                <p className="text-sm text-gray-500">{offer.title}</p>
                <p className="mt-4 text-sm font-black text-red-500">⏱ {offer.ends}</p>
                <a href="#details" className="mt-4 block rounded-xl border border-purple-200 py-2 text-center text-sm font-bold text-purple-700">View Details</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 lg:px-8">
        <div className="mb-5">
          <p className="text-sm font-bold uppercase tracking-wider text-purple-600">Real Users</p>
          <h2 className="text-3xl font-extrabold">Our Customers’ Feedback</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {['Rashed Ahmed', 'Farzana Mim', 'Tanvir Hasan'].map((name) => (
            <div key={name} className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 font-black text-purple-700">{name[0]}</div>
              <p className="text-yellow-500">★★★★★</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">GrabDeal থেকে discount information দেখে shop link এ গিয়ে purchase করেছি। Information clear ছিল।</p>
              <p className="mt-4 text-sm font-black">— {name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 lg:px-8">
        <div className="grid gap-8 rounded-3xl bg-purple-50 p-6 lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-purple-600">Need Help?</p>
            <h2 className="mt-2 text-3xl font-extrabold">Frequently Asked Questions</h2>
            <p className="mt-3 text-gray-600">GrabDeal কোনো product sell করে না। আমরা শুধু কোথায় discount চলছে, details এবং shop link দেখাই।</p>
          </div>
          <div className="space-y-3">
            {faqs.map((q) => <div key={q} className="flex justify-between rounded-2xl bg-white p-5 font-bold shadow-sm"><span>{q}</span><span className="text-purple-700">+</span></div>)}
          </div>
        </div>
      </section>

      <footer className="mt-10 bg-gradient-to-r from-[#16013d] to-[#32008a] px-4 py-10 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div><h3 className="mb-4 text-xl font-extrabold">Follow Us</h3><div className="flex gap-3 text-3xl">🔵 🐦 📸 ▶️ 💼</div></div>
          <div><h3 className="mb-4 text-xl font-extrabold">GrabDeal</h3><p>About Us</p><p>Privacy Policy</p><p>Terms & Conditions</p></div>
          <div><h3 className="mb-4 text-xl font-extrabold">Contact Us</h3><p>Support@GrabDeal.com</p><p>● Check details</p><p>● Auto-remove expired offers</p></div>
        </div>
        <p className="mt-8 text-center text-sm text-white/70">© 2024 GrabDeal. All rights reserved.</p>
      </footer>
    </main>
  );
}
