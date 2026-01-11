import MobileNav from "@/components/dashboard/mobile-nav";
import DashboardNav from "@/components/dashboard/nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container flex items-center h-16 px-4">
                <MobileNav />
            </div>
        </header>
        <div className="container md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="border-r hidden md:block h-[calc(100vh-4.1rem)]">
            <div>
                <DashboardNav />
            </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden p-4">{children}</main>
        </div>
    </div>
  );
}