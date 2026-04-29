import { Navbar } from "@/shared/components/navbar";
import { Sidebar } from "@/shared/components/sidebar/sidebar";
import { BottomMenu } from "@/shared/components/bottom-menu/bottom-menu";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <BottomMenu />
      <div className="pointer-events-none bottom-16 left-0 right-0 h-16 bg-gradient-to-t z-[9999] from-background/20 to-transparent sm:hidden" />

      <main className="flex flex-col flex-1 overflow-y-auto">
        <Navbar />
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
