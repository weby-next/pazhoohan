import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { sfBold, sfLight, sfMed } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar/sidebar";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" dir="rtl">
      <head />
      <body
        className={clsx(
          sfLight.variable,
          sfMed.variable,
          sfBold.variable,
          "relative z-0 min-h-screen font-sf-med text-primaryBaseLight bg-primaryBaseDark antialiased",
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="flex flex-col min-h-screen">
            {/* Layout */}
            <div className="flex flex-1">
              {/* Desktop Sidebar */}
              <div className="w-full hidden sm:flex items-start justify-start">
                <Sidebar />
                <Navbar />
              </div>

              {/* Page Content */}
              {/* <main className="flex-1 container mx-auto max-w-7xl pt-16 px-6 pb-20 sm:pb-6">
              </main> */}
            </div>

            {/* <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://heroui.com?utm_source=next-app-template"
                title="heroui.com homepage"
              >
                <span className="text-default-600">ساخته شده با عشق</span>
                <span className="">توسط لورل و هاردی</span>
              </Link>
            </footer> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
