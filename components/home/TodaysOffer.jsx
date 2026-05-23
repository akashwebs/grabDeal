import OfferCard from "@/components/cards/OfferCard";
import {newToday} from "@/components/data/mockData"


const todaysOffers = [
  {
    brand: "AJIO",
    image: "/products/ajio.jpg",
    discount: "20% OFF",
    title: "Stylish Men Shirt",
    ends: "Ends in 2 days 04 : 12 : 45",
    online: true,
  },
  {
    brand: "Myntra",
    image: "/products/myntra.jpg",
    discount: "50% OFF",
    title: "Sneakers Collection",
    ends: "Ends in 1 day 08 : 45 : 30",
    online: true,
  },
  {
    brand: "Puma",
    image: "/products/puma.jpg",
    discount: "30% OFF",
    title: "Running Shoes",
    ends: "Ends in 2 days 02 : 10 : 20",
    online: false,
  },
  {
    brand: "boAt",
    image: "/products/boat.jpg",
    discount: "40% OFF",
    title: "Wireless Headphone",
    ends: "Ends in 1 day 06 : 35 : 10",
    online: true,
  },
  {
    brand: "Zudio",
    image: "/products/zudio.jpg",
    discount: "10% OFF",
    title: "Casual T-Shirt",
    ends: "Ends in 2 days 11 : 25 : 50",
    online: false,
  },
];

export default function TodaysOffer() {
  return (
    <section id="today" className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-purple-600">
            Best Deals
          </p>
          <h2 className="text-3xl font-extrabold text-[#16013d]">
            Today’s Offer
          </h2>
        </div>

        <a href="#" className="text-sm font-bold text-purple-700">
          View All →
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {newToday.map((offer) => (
          <OfferCard key={offer.brand} offer={offer} />
        ))}
      </div>
    </section>
  );
}