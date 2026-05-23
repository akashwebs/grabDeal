import { newToday } from "../../../components/data/mockData";
import OfferCard from "../../../components/cards/OfferCard";
import Header from "../../../components/layout/Header";

export default async function Page({params}){

const offer =
newToday.find(item=>item.id===params.id)

const related=
newToday.filter(
item=>item.id!==params.id
).slice(0,4)

return(

<div>
    <Header/>
    <div className="bg-[#faf8ff] min-h-screen">

<div className="max-w-7xl mx-auto px-4 py-8">

<div className="text-sm text-gray-500 mb-6">
Home › Clothing › Men › {offer?.title}
</div>


<div className="grid lg:grid-cols-[1fr_1fr_320px] gap-6">

{/* image */}

<div className="bg-white rounded-3xl p-6 shadow-sm">

<div className="bg-purple-700 text-white inline-block px-4 py-2 rounded-full text-sm font-bold">

{offer?.discount}

</div>

<div className="h-[350px] mt-5 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-10">

<img
src={offer?.image}
className="w-full h-full object-contain"
/>

</div>

<div className="flex justify-center gap-10 mt-6 text-sm">

<button>↗ Share</button>
<button>♡ Wishlist</button>
<button>⚠ Report</button>

</div>

</div>


{/* details */}

<div className="bg-white rounded-3xl p-8 shadow-sm">

<h2 className="text-3xl font-black mb-6">
Offer Details
</h2>

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

<b className="text-red-500">
{offer?.ends}
</b>
</div>

<div className="flex justify-between">
<span>Offer Type</span>

<b className="text-green-600">
● {offer?.online?"Online":"Offline"}
</b>

</div>

<div className="flex justify-between">
<span>Verified</span>

<b>
✓ Yes
</b>

</div>

</div>

</div>


{/* action */}

<div className="bg-white rounded-3xl p-6 shadow-sm">

<h3 className="text-3xl font-black text-purple-700">

Get This Offer

</h3>

<div className="border rounded-2xl p-6 mt-6 text-center">

<p className="text-gray-500">

Grab active offer

</p>

<h1 className="text-5xl font-black text-purple-700 mt-3">

{offer?.discount}

</h1>

<button
className="bg-purple-700 text-white w-full rounded-xl py-4 mt-6 font-bold"
>

Shop Now

</button>

</div>

</div>

</div>


{/* about */}

<div className="grid lg:grid-cols-[1.5fr_.8fr] gap-6 mt-8">

<div className="bg-white p-8 rounded-3xl">

<h2 className="text-purple-700 text-xl font-bold">

About This Offer

</h2>

<h1 className="text-4xl font-black mt-3">

{offer?.title}

</h1>

<p className="mt-5 text-gray-500">

{offer?.description}

</p>

<div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

{offer?.features.map(item=>(

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

{offer?.terms.map(item=>(

<li key={item}>
{item}
</li>

))}

</ul>

</div>


<div className="mt-10">

<h2 className="text-2xl font-black">

More Offers You Might Like

</h2>

<div className="grid lg:grid-cols-4 gap-5 mt-6">

{related?.map(item=>(

<OfferCard
key={item.id}
offer={item}
/>

))}

</div>

</div>

</div>

</div>
</div>

)

}