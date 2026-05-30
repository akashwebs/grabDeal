import OfferCard from "@/components/cards/OfferCard";
import Header from "@/components/layout/Header";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://grabdeal-server.vercel.app/api/v1";

async function getOffers({ category, brand }) {
  const res = await fetch(`${API_URL}/offers`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  const data = await res.json();

  const offers =
    data?.data?.products ||
    data?.data?.result ||
    data?.data ||
    [];

  const decodedCategory = category ? decodeURIComponent(category) : "";
  const decodedBrand = brand ? decodeURIComponent(brand) : "";

  return offers
    .filter((item) => {
      const matchCategory =
        !decodedCategory ||
        decodedCategory === "All" ||
        item?.category?.toLowerCase().trim() ===
          decodedCategory.toLowerCase().trim();

      const matchBrand =
        !decodedBrand ||
        item?.brands?.toLowerCase().trim() ===
          decodedBrand.toLowerCase().trim();

      return matchCategory && matchBrand;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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

export default async function OffersPage({ searchParams }) {
  const params = await searchParams;

  const category = params?.category || "";
  const brand = params?.brand || "";

  const decodedCategory = category ? decodeURIComponent(category) : "";
  const decodedBrand = brand ? decodeURIComponent(brand) : "";

  const offers = await getOffers({
    category: decodedCategory,
    brand: decodedBrand,
  });

  const pageTitle = decodedBrand
    ? `${decodedBrand} Offers`
    : decodedCategory
    ? `${decodedCategory} Offers`
    : "All Latest Offers";

  return (
    <div>
      <Header />

      <section className="min-h-screen bg-[#faf8ff] px-4 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-[28px] bg-white p-7 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wider text-purple-600">
              {decodedBrand
                ? "Brand Offers"
                : decodedCategory
                ? "Category Offers"
                : "All Offers"}
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-[#16013d]">
              {pageTitle}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Newest offers are showing first by created date.
            </p>
          </div>

          {offers.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-black text-purple-700">
                No offers found
              </h2>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}