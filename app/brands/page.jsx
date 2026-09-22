import Header from "@/components/layout/Header";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://grabdeal-server.vercel.app/api/v1";

async function getBrands() {
  const res = await fetch(`${API_URL}/brands`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  const data = await res.json();

  const brands =
    data?.data?.result ||
    data?.data ||
    data ||
    [];

  return brands
    .filter((item) => item.status === "active")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div>
      <Header />

      <section className="min-h-screen bg-[#faf8ff] px-4 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 rounded-[32px] bg-gradient-to-r from-purple-700 to-[#16013d] p-8 text-white shadow-xl">
            <p className="text-sm font-bold uppercase tracking-widest text-purple-200">
              Trusted Brands
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Explore All Top Stores
            </h1>

            <p className="mt-3 max-w-2xl text-white/80">
              Find your favorite brands and discover their latest active offers.
            </p>
          </div>

          {brands.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-black text-purple-700">
                No brands found
              </h2>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {brands.map((brand) => (
                <Link
                  key={brand._id}
                  href={`/offer?brand=${encodeURIComponent(brand.name)}`}
                  className="group rounded-[28px] border border-purple-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center gap-5">
                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-purple-50 p-4 shadow-inner">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div>
                      <h2 className="text-2xl font-black text-[#16013d] group-hover:text-purple-700">
                        {brand.name}
                      </h2>

                      <p className="mt-1 text-sm font-bold text-gray-500">
                        View Latest Offers →
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}