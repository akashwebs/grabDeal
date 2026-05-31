export async function newToday() {
  const res = await fetch("http://localhost:5000/api/v1/offers", {
    next: { revalidate: 60 }, // 60 sec cache
  });

  if (!res.ok) {
    throw new Error("Failed to fetch offers");
  }

  const data = await res.json();


  console.log("fslkdfjslkdfjlsfd",data)

  const offers = data?.data?.products || data?.data || data || [];

  return offers.map((item) => ({
    id: item._id,
    title: item.title,
    brand: item.brands,
    image: item.image,
    discount: `${item.discount}% OFF`,
    ends: item.expiryDate,
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