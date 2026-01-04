import Sidebar from "@/components/web/sidebar";
import RefreshProvider from "@/context/RefreshContext";



export default function DashboardLayout({
  children,
 
}: {
  children: React.ReactNode,
 

}) {


  return (
    <>
   <div className="flex">
         {/* Sidebar */}
         <Sidebar />
   
         {/* Main Content */}
         <main className=" lg:ml-64 w-full min-h-screen bg-gray-100 p-6">

          <RefreshProvider >
 {children}
          </RefreshProvider>
        
          
         </main>
       </div>
    </>
  );
}
