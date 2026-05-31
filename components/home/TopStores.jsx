import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

async function getBrands() {
  const res = await fetch(`${API_URL}/brands`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  const data = await res.json();

  const brands =
    data?.data?.result ||
    data?.data?.brands ||
    data?.data ||
    data ||
    [];

  return brands
    .filter((brand) => brand.status === "active")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);
}

export default async function TopStores() {
  const stores = await getBrands();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {stores.map((store) => (
          <Link
            key={store._id}
            href={`/offer?brand=${encodeURIComponent(store.name)}`}
            className="group relative overflow-hidden rounded-3xl border border-purple-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-pink-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-3 shadow-md">
              <img
                src={store.image || "/placeholder.png"}
                alt={store.name}
                className="max-h-12 object-contain transition duration-300 group-hover:scale-110"
              />
            </div>

            <h3 className="relative z-10 mt-4 text-sm font-extrabold text-gray-800">
              {store.name}
            </h3>

            <p className="relative z-10 mt-1 text-xs text-gray-500">
              Latest Offers
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}