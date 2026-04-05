"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import { NavMenuItem } from "@/types/site";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

type Props = {
  item: NavMenuItem;
  index: number;
  total: number;
};

export const SidebarLink: React.FC<Props> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (item.type === "link") {
    const isActive = pathname === item.href;

    return (
      <SidebarItem
        href={item.href}
        icon={item.icon}
        label={item.label}
        active={isActive}
        rightIcon={<ChevronLeft size={16} />}
      />
    );
  }

  if (item.type === "modal") {
    return (
      <SidebarItem
        icon={item.icon}
        label={item.label}
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("open-modal", { detail: { id: item.modalId } }),
          )
        }
      />
    );
  }

  if (item.type === "dropdown") {
    const isDropdownActive = item.items.some((sub) => pathname === sub.href);

    return (
      <div className="w-full">
        <SidebarItem
          icon={item.icon}
          label={item.label}
          active={isDropdownActive}
          onClick={() => setOpen((p) => !p)}
          rightIcon={
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          }
        />

        <div
          className={`overflow-hidden transition-all duration-300 ${
            open ? "max-h-96 mt-1" : "max-h-0"
          }`}
        >
          <div className="flex flex-col mr-6 gap-1">
            {item.items.map((subItem) => {
              const isActive = pathname === subItem.href;

              return (
                <NextLink
                  key={subItem.href}
                  href={subItem.href}
                  className={`flex items-center gap-2 px-2 py-1 rounded-full hover:bg-default-100 text-sm text-text-tertiary-light dark:text-text-tertiary-dark ${
                    isActive ? "bg-primary text-foreground" : ""
                  }`}
                >
                  {subItem.icon}
                  {subItem.label}
                </NextLink>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
