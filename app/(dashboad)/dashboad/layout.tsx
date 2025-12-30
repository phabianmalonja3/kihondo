import Sidebar from "@/components/web/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 w-full min-h-screen bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
}
