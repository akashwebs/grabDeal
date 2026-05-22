import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-br from-[#16013d] via-[#24005e] to-[#7b00ff] text-white">

      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">

        {/* Top */}

        <div className="grid gap-10 md:grid-cols-3">

          {/* Column 1 */}

          <div>

            <div className="flex items-center gap-3">

              <Image src={"/footer.png"}  width={160}  alt=""
                   height={500}/>

            </div>


            <p className="mt-5 text-sm leading-7 text-white/70">

              GrabDeal কোনো product sell করে না।
              আমরা শুধু কোথায় discount চলছে,
              offer details, expiry time এবং shop link
              দেখাই।

            </p>


            {/* Social */}

            <div className="mt-6 flex gap-3">

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl backdrop-blur hover:bg-white hover:text-purple-700 transition"
              >
                📘
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl backdrop-blur hover:bg-white hover:text-purple-700 transition"
              >
                📸
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl backdrop-blur hover:bg-white hover:text-purple-700 transition"
              >
                🐦
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl backdrop-blur hover:bg-white hover:text-purple-700 transition"
              >
                ▶️
              </a>

            </div>

          </div>


          {/* Column 2 */}

          <div>

            <h3 className="mb-5 text-xl font-extrabold">

              GrabDeal

            </h3>

            <div className="space-y-4 text-sm">

              <a
                href="#"
                className="block text-white/70 hover:text-white transition"
              >
                About Us
              </a>

              <a
                href="#"
                className="block text-white/70 hover:text-white transition"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="block text-white/70 hover:text-white transition"
              >
                Terms & Conditions
              </a>

            </div>

          </div>


          {/* Column 3 */}

          <div>

            <h3 className="mb-5 text-xl font-extrabold">

              Contact Us

            </h3>

            <div className="space-y-4 text-sm">

              <p className="text-white/70">

                Support@GrabDeal.com

              </p>

              <p className="text-white/70">

                ● Check details

              </p>

              <p className="text-white/70">

                ● Auto-remove expired offers

              </p>

            </div>

          </div>

        </div>


        {/* Bottom */}

        <div className="mt-10 border-t border-white/10 pt-6">

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

            <p className="text-sm text-white/60">

              © 2026 GrabDeal. All Rights Reserved.

            </p>

            <div className="flex gap-6 text-sm text-white/60">

              <a href="#" className="hover:text-white">

                Terms

              </a>

              <a href="#" className="hover:text-white">

                Privacy

              </a>

              <a href="#" className="hover:text-white">

                Support

              </a>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}