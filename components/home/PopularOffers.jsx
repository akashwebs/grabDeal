
import { newToday } from "@/components/data/mockData";
import OfferCard from "../cards/OfferCard";



const popularOffers = [
  {
    brand: "AJIO",
    image: "/products/ajio.jpg",
    title: "Fashion Collection",
    discount: "20% OFF",
    ends: "Ends in 2 days",
    verified: true,
  },
  {
    brand: "Myntra",
    image: "/products/myntra.jpg",
    title: "Sneakers Collection",
    discount: "50% OFF",
    ends: "Ends in 1 day",
    verified: true,
  },
  {
    brand: "Puma",
    image: "/products/puma.jpg",
    title: "Running Shoes",
    discount: "30% OFF",
    ends: "Ends in 2 days",
    verified: true,
  },
];

export default function PopularOffers() {
  return (
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
          {newToday.slice(0, 3).map((offer) => (
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
  );
}