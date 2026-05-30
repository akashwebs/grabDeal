const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://grabdeal-server.vercel.app/api/v1";

async function getPopularOffers() {
  const res = await fetch(`${API_URL}/offers`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  const data = await res.json();
  const offers = data?.data?.products || data?.data || data || [];

  return offers
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)
    .map((item) => ({
      id: item._id,
      title: item.title,
      brand: item.brands,
      image: item.image,
      discount: `${item.discount}% OFF`,
      ends: item.expiryDate
        ? new Date(item.expiryDate).toLocaleDateString("en-GB")
        : "N/A",
      online: item.offerType === "online",
      verified: item.verified,
      category: item.category,
      merchant: item.merchantName,
      shopLink: item.shopLink,
    }));
}

export default async function PopularOffers() {
  const newToday = await getPopularOffers();

  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 lg:px-8">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-purple-600">
            Most Useful Deals
          </p>
          <h2 className="text-3xl font-extrabold">
            Popular Offers of the Day
          </h2>
        </div>

        <a className="hidden text-sm font-bold text-purple-700 md:block" href="#all">
          View All →
        </a>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {newToday.map((offer) => (
          <div
            key={offer.id}
            className="flex gap-4 rounded-3xl border border-purple-100 bg-white p-4 shadow-sm transition hover:shadow-xl"
          >
            <img
              src={offer.image}
              alt={offer.brand}
              className="h-28 w-28 rounded-2xl object-cover"
            />

            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black">{offer.brand}</h3>
                  <p className="text-sm text-gray-500">{offer.title}</p>
                </div>

                <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-black text-pink-600">
                  {offer.discount}
                </span>
              </div>

              <p className="mt-3 text-xs font-bold text-red-500">
                ⏱ {offer.ends}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-bold text-green-600">
                  {offer.verified ? "✓ Verified" : "Not Verified"}
                </span>

                <a
                  className="rounded-lg bg-purple-700 px-4 py-2 text-xs font-bold text-white"
                  href={`/offer/${offer.id}`}
                >
                  Get Info
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}