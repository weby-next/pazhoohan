"use client";

import { BottomMenuLinkProps } from "@/types/bottom-menu/bottom-menu-link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export const BottomMenuLink = ({ href, icon, label }: BottomMenuLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;
  return (
    <NextLink
      href={href}
      className={`flex w-32 p-2 px-4 rounded-full gap-1 flex-col items-center ${
        isActive
          ? "text-primary bg-surface-secondary-dark/30"
          : "text-foreground"
      }`}
    >
      <span className="scale-125">{icon}</span>
      <h3 className="text-sm">{label}</h3>
    </NextLink>
  );
};
