'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

const pathname=usePathname()

const menus=[
{
    icon:"0",
    name:"Dashboard",
link:"/dashboard"
},
{
name:"Banner",
link:"/dashboard/banner",
icon:"🖼"
},

{
name:"Category",
link:"/dashboard/category",
icon:"📁"
},

{
name:"Offers",
link:"/dashboard/offers",
icon:"🔥"
},
{
  name: "All Offers",
  link: "/dashboard/offers/view",
  icon: "📋",
},
{
name:"Brands",
link:"/dashboard/brands",
icon:"🏷"
},

{
name:"Customers Review",
link:"/dashboard/reviews",
icon:"⭐"
}

]

return(

<div className="w-64 min-h-screen bg-[#16013d] text-white p-6">

<Link href={"/"} target="/_blank">
<Image alt="" width={160} height={80} src={"/footer.png"} className="mb-5"/>
</Link>

<div className="space-y-2">

{menus.map((menu)=>(

<Link
key={menu.link}
href={menu.link}

className={`flex items-center gap-3 rounded-xl px-4 py-3 transition

${
pathname===menu.link
?
"bg-purple-600"
:
"hover:bg-purple-800"
}

`}

>

<span className="text-xl">

{menu.icon}

</span>

<span>

{menu.name}

</span>

</Link>

))}

</div>

</div>

)

}