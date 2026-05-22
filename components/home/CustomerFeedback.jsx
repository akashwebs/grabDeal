const feedbacks = [
  {
    name: "Rashed Ahmed",
    role: "Regular Shopper",
    image: "/customers/customer-1.jpg",
    rating: 5,
    comment:
      "GrabDeal থেকে discount information দেখে shop link এ গিয়ে purchase করেছি। Information clear ছিল।",
  },
  {
    name: "Farzana Mim",
    role: "Fashion Buyer",
    image: "/customers/customer-2.jpg",
    rating: 5,
    comment:
      "কোন brand এ offer চলছে সেটা এক জায়গায় দেখতে পারি। Shopping করার আগে খুব helpful.",
  },
  {
    name: "Tanvir Hasan",
    role: "Online Shopper",
    image: "/customers/customer-3.jpg",
    rating: 5,
    comment:
      "Offer expiry, online/offline status আর verified badge থাকায় decision নেওয়া সহজ হয়।",
  },
];

export default function CustomerFeedback() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-purple-600">
          Real Users
        </p>

        <h2 className="text-3xl font-extrabold text-[#16013d]">
          Our Customers’ Feedback
        </h2>

        <p className="mx-auto mt-2 max-w-2xl text-gray-500">
          Users share how GrabDeal helps them find active discounts before
          purchasing from stores.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {feedbacks.map((item) => (
          <div
            key={item.name}
            className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mb-5 flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-14 w-14 rounded-full object-cover border-2 border-purple-100"
              />

              <div>
                <h3 className="font-black text-[#16013d]">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>

            <div className="mb-4 flex text-yellow-400">
              {Array.from({ length: item.rating }).map((_, index) => (
                <span key={index}>★</span>
              ))}
            </div>

            <p className="text-sm leading-7 text-gray-600">“{item.comment}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}