import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
children
}) {

return(

<div className="flex">

<Sidebar/>

<div className="flex-1 min-h-screen bg-gray-50 p-8">

{children}

</div>

</div>

)

}