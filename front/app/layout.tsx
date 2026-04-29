import "@/shared/styles/globals.css";

import { sfBold, sfLight, sfMed } from "@/config/fonts";
import clsx from "clsx";
import { Providers } from "./providers";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

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
          "relative z-0 min-h-screen font-sf-med text-primaryBaseLight bg-background-secondary-light dark:bg-background-secondary-dark antialiased",
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
