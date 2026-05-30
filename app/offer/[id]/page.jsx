import OfferCard from "../../../components/cards/OfferCard";
import Header from "../../../components/layout/Header";
import Link from "next/link";
import OfferActions from "../../../components/offer/OfferActions";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://grabdeal-server.vercel.app/api/v1";

async function getOfferById(id) {
  const res = await fetch(`${API_URL}/offers/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const data = await res.json();
  const offer = data?.data || data;
console.log('oofeer',offer)
  return {
    id: offer?._id,
    title: offer?.title,
    brand: offer?.brands,
    image: offer?.image,
    discount: `${offer?.discount}% OFF`,
    ends: offer?.expiryDate
      ? new Date(offer.expiryDate).toLocaleDateString("en-GB")
      : "N/A",
    online: offer?.offerType === "online",
    verified: offer?.verified,
    category: offer?.category,
    merchant: offer?.merchantName,
    applicableOn: offer?.offerType === "online" ? "Website & App" : "Store",
    description: offer?.description,
    shopLink: offer?.shopLink,
    terms: offer?.termsAndCondition
      ? offer.termsAndCondition.split("\n")
      : [],
    features: [
      "100% Original",
      "Easy Returns",
      "Secure Payment",
      "Premium Quality",
    ],
  };
}

async function getRelatedOffers(currentId) {
  const res = await fetch(`${API_URL}/offers`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  const data = await res.json();
  const offers = data?.data?.products || data?.data || data || [];

  return offers
    .filter((item) => item._id !== currentId)
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

export default async function Page({ params }) {
  const { id } = await params;

  const offer = await getOfferById(id);
  const related = await getRelatedOffers(id);

  if (!offer) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-[#faf8ff]">
          <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
            <h1 className="text-3xl font-black text-purple-700">
              Offer Not Found
            </h1>
            <Link
              href="/"
              className="inline-block mt-6 bg-purple-700 text-white px-6 py-3 rounded-xl font-bold"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="bg-[#faf8ff] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-sm text-gray-500 mb-6">
            Home › Offers › {offer?.category} › {offer?.title}
          </div>

          <div className="grid lg:grid-cols-[1fr_1fr_320px] gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="bg-purple-700 text-white inline-block px-4 py-2 rounded-full text-sm font-bold">
                {offer?.discount}
              </div>

              <div className="h-[350px] mt-5 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-10">
                <img
                  src={offer?.image}
                  alt={offer?.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <OfferActions offer={offer} />
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="text-3xl font-black mb-6">Offer Details</h2>

              <div className="space-y-6">
                <div className="flex justify-between">
                  <span>Discount</span>
                  <b>{offer?.discount}</b>
                </div>

                <div className="flex justify-between">
                  <span>Merchant</span>
                  <b>{offer?.brand}</b>
                </div>

                <div className="flex justify-between">
                  <span>Expiry</span>
                  <b className="text-red-500">{offer?.ends}</b>
                </div>

                <div className="flex justify-between">
                  <span>Offer Type</span>
                  <b className="text-green-600">
                    ● {offer?.online ? "Online" : "Offline"}
                  </b>
                </div>

                <div className="flex justify-between">
                  <span>Verified</span>
                  <b>{offer?.verified ? "✓ Yes" : "No"}</b>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-3xl font-black text-purple-700">
                Get This Offer
              </h3>

              <div className="border rounded-2xl p-6 mt-6 text-center">
                <p className="text-gray-500">Grab active offer</p>

                <h1 className="text-5xl font-black text-purple-700 mt-3">
                  {offer?.discount}
                </h1>

                <Link
                  href={offer?.shopLink}
                  target="_blank"
                  className="block bg-purple-700 text-white w-full rounded-xl py-4 mt-6 font-bold"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.5fr_.8fr] gap-6 mt-8">
            <div className="bg-white p-8 rounded-3xl">
              <h2 className="text-purple-700 text-xl font-bold">
                About This Offer
              </h2>

              <h1 className="text-4xl font-black mt-3">{offer?.title}</h1>

              <p className="mt-5 text-gray-500">{offer?.description}</p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
                {offer?.features?.map((item) => (
                  <div key={item}>
                    <div className="text-3xl">🛡️</div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8">
              <h2 className="font-black text-purple-700">
                Offer Information
              </h2>

              <div className="space-y-5 mt-6">
                <div className="flex justify-between">
                  <span>Merchant</span>
                  <b>{offer?.merchant}</b>
                </div>

                <div className="flex justify-between">
                  <span>Category</span>
                  <b>{offer?.category}</b>
                </div>

                <div className="flex justify-between">
                  <span>Valid On</span>
                  <b>{offer?.applicableOn}</b>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 mt-6">
            <h2 className="text-purple-700 font-black">
              Terms & Conditions
            </h2>

            <ul className="mt-5 space-y-4 list-disc pl-5">
              {offer?.terms?.length > 0 ? (
                offer.terms.map((item) => <li key={item}>{item}</li>)
              ) : (
                <li>No terms and conditions available.</li>
              )}
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-black">
              More Offers You Might Like
            </h2>

            <div className="grid lg:grid-cols-4 gap-5 mt-6">
              {related?.map((item) => (
                <OfferCard key={item.id} offer={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}