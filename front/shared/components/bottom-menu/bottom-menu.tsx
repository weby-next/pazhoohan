import { siteConfig } from "@/config/site";
import { BottomMenuLink } from "./bottom-menu-link";
import { getBottomNavItems } from "@/shared/lib/navigation";
import NextLink from "next/link";
import { User } from "lucide-react";

export const BottomMenu = () => {
  const items = getBottomNavItems(siteConfig.navItems, [
    {
      label: "پروفایل",
      href: "/profile",
      icon: <User />,
    },
  ]);

  return (
    <>
      <div className="w-full sm:hidden block h-32 bg-gradient-to-t from-background/95 via-background/50 to-transparent fixed bottom-0" />
      <nav className="fixed left-1/2 -translate-x-1/2 p-1 rounded-full bottom-4 flex sm:hidden w-full backdrop-blur-3xl justify-between items-center">
        {items.map((item, index) => (
          <BottomMenuLink
            key={index}
            href={item.href}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>
    </>
  );
};
