
import { newToday } from "@/components/data/mockData";


export default function EndingSoon() {
  return (
     <section className="mx-auto mt-12 max-w-7xl px-4 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#24005e] to-[#7b00ff] p-6 text-white shadow-xl lg:p-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-orange-300">Expire within 2 days</p>
              <h2 className="text-3xl font-extrabold">Ending Soon</h2>
            </div>
            <a className="text-sm font-bold text-white" href="#all">View All →</a>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {newToday.map((offer) => (
              <div key={offer.brand} className="rounded-2xl bg-white p-5 text-[#16013d] shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-black">{offer.brand}</h3>
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600">{offer.discount}</span>
                </div>
                <p className="text-sm text-gray-500">{offer.title}</p>
                <p className="mt-4 text-sm font-black text-red-500">⏱ {offer.ends}</p>
                <a href="#details" className="mt-4 block rounded-xl border border-purple-200 py-2 text-center text-sm font-bold text-purple-700">View Details</a>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}