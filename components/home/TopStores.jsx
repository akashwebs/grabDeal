const stores = [
  {
    name: "Myntra",
    logo: "/brands/myntra.png",
  },
  {
    name: "AJIO",
    logo: "/brands/ajio.png",
  },
  {
    name: "Amazon",
    logo: "/brands/amazon.png",
  },
  {
    name: "Flipkart",
    logo: "/brands/flipkart.png",
  },
  {
    name: "Nike",
    logo: "/brands/nike.png",
  },
  {
    name: "Puma",
    logo: "/brands/puma-logo.png",
  },
  {
    name: "Zudio",
    logo: "/brands/zudio-logo.png",
  },
  {
    name: "Adidas",
    logo: "/brands/adidas.png",
  },
];

export default function TopStores() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">

      {/* Section Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-sm font-bold uppercase tracking-wider text-purple-600">
            Trusted Brands
          </p>

          <h2 className="text-3xl font-extrabold text-[#16013d]">
            Top Stores
          </h2>

          <p className="mt-2 text-gray-500">
            Discover active discounts from your favorite brands
          </p>

        </div>

        <a
          href="/brands"
          className="hidden md:block text-sm font-bold text-purple-700"
        >
          View All →
        </a>

      </div>


      {/* Store Grid */}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">

        {stores.map((store) => (

          <a
            key={store.name}
            href="#"
            className="group relative overflow-hidden rounded-3xl border border-purple-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-2xl"
          >

            {/* Hover background */}

            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-pink-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>


            {/* Logo */}

            <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-3 shadow-md">

              <img
                src={store.logo}
                alt={store.name}
                className="max-h-12 object-contain transition duration-300 group-hover:scale-110"
              />

            </div>


            {/* Brand Name */}

            <h3 className="relative z-10 mt-4 text-sm font-extrabold text-gray-800">

              {store.name}

            </h3>

            <p className="relative z-10 mt-1 text-xs text-gray-500">

              Latest Offers

            </p>

          </a>

        ))}

      </div>

    </section>
  );
}