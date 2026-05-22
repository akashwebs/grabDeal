import { newToday } from "@/components/data/mockData";
import OfferCard from "../cards/OfferCard";

export default function NewToday() {
  return (

<section className="mx-auto mt-12 max-w-7xl px-4 lg:px-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-purple-600">Freshly Added</p>
            <h2 className="text-3xl font-extrabold">New Today</h2>
            {/* <p className="mt-1 text-gray-500">আজকে নতুন যোগ হওয়া discount information — coupon code ছাড়াই brand discount, expiry ও offer type দেখা যাবে।</p> */}
          </div>
          <a className="hidden text-sm font-bold text-purple-700 md:block" href="#all">View All →</a>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {newToday.map((offer) => <OfferCard key={offer.brand} offer={offer} />)}
        </div>
      </section>

  )
}