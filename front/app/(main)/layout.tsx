import "@/shared/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "../providers";

import { siteConfig } from "@/config/site";
import { sfBold, sfLight, sfMed } from "@/config/fonts";
import { Navbar } from "@/shared/components/navbar";
import { Sidebar } from "@/shared/components/sidebar/sidebar";
import { BottomMenu } from "@/shared/components/bottom-menu/bottom-menu";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

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
