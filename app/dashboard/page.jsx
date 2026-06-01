import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "ttps://grabdeal-server.vercel.app/api/v1";

async function getDashboardData() {
  try {
    const [offersRes, bannersRes, categoriesRes, brandsRes] =
      await Promise.all([
        fetch(`${API_URL}/offers`, { next: { revalidate: 60 } }),
        fetch(`${API_URL}/banner`, { next: { revalidate: 60 } }),
        fetch(`${API_URL}/categories`, { next: { revalidate: 60 } }),
        fetch(`${API_URL}/brands`, { next: { revalidate: 60 } }),
      ]);

    const offersData = offersRes.ok ? await offersRes.json() : {};
    const bannersData = bannersRes.ok ? await bannersRes.json() : {};
    const categoriesData = categoriesRes.ok ? await categoriesRes.json() : {};
    const brandsData = brandsRes.ok ? await brandsRes.json() : {};

    const offers =
      offersData?.data?.products ||
      offersData?.data?.result ||
      offersData?.data ||
      [];

    const banners = bannersData?.data?.result || bannersData?.data || [];
    const categories = categoriesData?.data?.result || categoriesData?.data || [];
    const brands = brandsData?.data?.result || brandsData?.data || [];

    const now = new Date();

    const expiredOffers = offers
      .filter((item) => item.expiryDate && new Date(item.expiryDate) < now)
      .sort((a, b) => new Date(b.expiryDate) - new Date(a.expiryDate));

    const endingSoonOffers = offers.filter((item) => {
      if (!item.expiryDate) return false;

      const expiryDate = new Date(item.expiryDate);
      const nextTwoDays = new Date();
      nextTwoDays.setDate(now.getDate() + 2);

      return expiryDate >= now && expiryDate <= nextTwoDays;
    });

    return {
      offers,
      banners,
      categories,
      brands,
      expiredOffers,
      endingSoonOffers,
    };
  } catch (error) {
    console.log("Dashboard fetch error:", error);

    return {
      offers: [],
      banners: [],
      categories: [],
      brands: [],
      expiredOffers: [],
      endingSoonOffers: [],
    };
  }
}

export default async function DashboardPage() {
  const {
    offers,
    banners,
    categories,
    brands,
    expiredOffers,
    endingSoonOffers,
  } = await getDashboardData();

  const activeOffers = offers.filter((item) => item.status === true);
  const activeBanners = banners.filter((item) => item.status === "active");

  const stats = [
    { title: "Total Offers", value: offers.length, icon: "🎁", color: "bg-purple-50 text-purple-700" },
    { title: "Active Banners", value: activeBanners.length, icon: "🖼️", color: "bg-blue-50 text-blue-700" },
    { title: "Categories", value: categories.length, icon: "📂", color: "bg-green-50 text-green-700" },
    { title: "Brands", value: brands.length, icon: "🏷️", color: "bg-orange-50 text-orange-700" },
  ];

  const quickActions = [
    { title: "Add Offer", href: "/dashboard/offers/add" },
    { title: "Add Banner", href: "/dashboard/banners/add" },
    { title: "Add Category", href: "/dashboard/categories/add" },
    { title: "Add Brand", href: "/dashboard/brands/add" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#16013d]">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-gray-500">
          Manage offers, banners, categories and brands from one place.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.title} className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
            <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${item.color}`}>
              {item.icon}
            </div>
            <p className="text-sm font-bold text-gray-500">{item.title}</p>
            <h2 className="mt-2 text-4xl font-black text-[#16013d]">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
          <p className="text-sm font-bold text-red-600">Expired Offers</p>
          <h2 className="mt-2 text-3xl font-black text-red-700">
            {expiredOffers.length}
          </h2>
        </div>

        <div className="rounded-3xl border border-green-100 bg-green-50 p-6">
          <p className="text-sm font-bold text-green-600">Active Offers</p>
          <h2 className="mt-2 text-3xl font-black text-green-700">
            {activeOffers.length}
          </h2>
        </div>

        <div className="rounded-3xl border border-yellow-100 bg-yellow-50 p-6">
          <p className="text-sm font-bold text-yellow-600">
            Ending Within 2 Days
          </p>
          <h2 className="mt-2 text-3xl font-black text-yellow-700">
            {endingSoonOffers.length}
          </h2>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-[#16013d]">
                Recent Activity
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Expired offers by expiryDate
              </p>
            </div>

            <span className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600">
              {expiredOffers.length} Expired
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {expiredOffers.length > 0 ? (
              expiredOffers.map((offer, index) => (
                <div key={offer._id} className="flex items-center justify-between gap-4 rounded-2xl bg-red-50 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-black text-red-600">
                      {index + 1}
                    </div>

                    <div>
                      <p className="font-bold text-[#16013d]">
                        {offer.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Merchant: {offer.merchantName || "N/A"}
                      </p>
                      <p className="text-sm text-red-500">
                        Expired on{" "}
                        {new Date(offer.expiryDate).toLocaleString("en-GB")}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/offers/edit/${offer._id}`}
                    className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-red-600"
                  >
                    Edit
                  </Link>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-green-50 p-5">
                <p className="font-bold text-green-700">
                  No expired offers found 🎉
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-[#16013d]">
            Quick Actions
          </h2>

          <div className="mt-6 grid gap-3">
            {quickActions.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-2xl bg-purple-700 px-5 py-4 text-center font-bold text-white transition hover:bg-purple-800"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}