import Sidebar from "@/components/web/sidebar";



export default function DashboardLayout({
  children,
  analytics,
  users
}: {
  children: React.ReactNode,
  analytics: React.ReactNode,
  users: React.ReactNode

}) {


  return (
    <>
      {/* Sidebar */}
      <Sidebar />
      
        {children}

        <div className="flex bg-gray-100 px-6 justify-between  ">
        {users}
       {analytics}
        </div>
       
    
    </>
  );
}
