import OfferCard from "../cards/OfferCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

async function getNewTodayOffers() {
  const res = await fetch(`${API_URL}/offers`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  const data = await res.json();
  const offers = data?.data?.products || data?.data || data || [];

  return offers
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4)
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
      applicableOn: item.offerType === "online" ? "Website & App" : "Store",
      description: item.description,
      shopLink: item.shopLink,
      terms: item.termsAndCondition
        ? item.termsAndCondition.split("\n")
        : [],
      features: [
        "100% Original",
        "Easy Returns",
        "Secure Payment",
        "Premium Quality",
      ],
    }));
}

export default async function NewToday() {
  const newToday = await getNewTodayOffers();

  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 lg:px-8">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-purple-600">
            Freshly Added
          </p>
          <h2 className="text-3xl font-extrabold">New Today</h2>
        </div>

        <a className="hidden text-sm font-bold text-purple-700 md:block" href="/offer">
          View All →
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {newToday.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}