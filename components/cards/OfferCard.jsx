import Link from "next/link";

export default function OfferCard({ offer }) {
  console.log("test",offer)
  return (
    <article className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden bg-gray-50">
        <Link href={`/offer/${offer.id}`}>
        <img src={offer.image} alt={offer.brand} className="h-full w-full object-cover transition duration-500 hover:scale-110" />
        </Link>
        <div className="absolute right-3 top-3 rounded-full bg-purple-700 px-3 py-1 text-xs font-bold text-white">{offer.discount}</div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-black">{offer.brand}</h3>
        <p className="mt-2 font-medium text-gray-600">{offer.title}</p>
        <p className="mt-4 text-xs font-bold text-red-500">⏱ {offer.ends}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold">
          <span className="text-green-600">✓ Verified</span>
          <span className={offer.online ? 'text-green-600' : 'text-orange-500'}>● {offer.online ? 'Online' : 'Offline'}</span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-purple-100 pt-4">
          <Link className="text-sm font-bold text-purple-700" href={`/offer/${offer.id}`}>Details</Link>
          <Link className="rounded-lg bg-purple-700 px-5 py-2 text-sm font-bold text-white" href={`/offer/${offer.id}`}>View Offer</Link>
        </div>
      </div>
    </article>
  );
}