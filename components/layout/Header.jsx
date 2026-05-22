'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    "All",
    "Clothing",
    "Footwear",
    "Accessories"
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-purple-100 bg-white/90 shadow-sm backdrop-blur-xl">

      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        <div className="flex h-16 items-center justify-between">

          {/* Logo */}

          <a
            href="/"
            className="flex items-center gap-3 group"
          >

            <Image src={"/logo.png"}  width={150}  alt=""
      height={500}/>

           

          </a>


          {/* Desktop Menu */}

          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold">

            <div className="group relative">

              <button className="rounded-xl bg-purple-50 px-5 py-3 text-purple-700">

                All ⌄

              </button>

              <div className="invisible absolute left-0 top-14 w-52 rounded-2xl border border-purple-100 bg-white p-3 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

                {navItems.map((item) => (

                  <a
                    key={item}
                    href="#"
                    className="block rounded-xl px-4 py-3 hover:bg-purple-50"
                  >

                    {item}

                  </a>

                ))}

              </div>

            </div>

            <a
              href="#"
              className="hover:text-purple-700 transition"
            >
              Clothing
            </a>

            <a
              href="#"
              className="hover:text-purple-700 transition"
            >
              Footwear
            </a>

            <a
              href="#"
              className="hover:text-purple-700 transition"
            >
              Accessories
            </a>

          </nav>


          <div className="flex items-center gap-3">

            {/* WhatsApp */}

            <a
              href="https://wa.me/88000000000"
              className="hidden sm:flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-purple-700 hover:bg-purple-50"
            >

              💬 WhatsApp

            </a>


            {/* Mobile Menu Button */}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden rounded-xl p-2 hover:bg-purple-50"
            >

              {menuOpen ? "✕" : "☰"}

            </button>

          </div>

        </div>


        {/* Mobile Menu */}

        {menuOpen && (

          <div className="lg:hidden border-t border-purple-100 py-4">

            <nav className="flex flex-col gap-2">

              {navItems.map((item) => (

                <a
                  key={item}
                  href="#"
                  className="rounded-xl px-4 py-3 text-sm font-bold hover:bg-purple-50"
                  onClick={() => setMenuOpen(false)}
                >

                  {item}

                </a>

              ))}

              <a
                href="https://wa.me/88000000000"
                className="mt-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-600"
              >

                💬 WhatsApp

              </a>

            </nav>

          </div>

        )}

      </div>

    </header>
  );
}