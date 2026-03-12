"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import { NavMenuItem } from "@/types/site";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { Button } from "@heroui/button";

type Props = {
  item: NavMenuItem;
  index: number;
  total: number;
};

export const SidebarLink: React.FC<Props> = ({ item, index, total }) => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const isFirst = index === 0;
  const isLast = index === total - 1;

  const radiusClass = [isFirst && "rounded-t-3xl", isLast && "rounded-b-3xl"]
    .filter(Boolean)
    .join(" ");

  if (item.type === "link") {
    const isActive = pathname === item.href;
    return (
      <NextLink
        href={item.href}
        className={`${isActive ? "bg-primary" : null} flex text-text-tertiary-light font-bold dark:text-text-tertiary-dark items-center gap-2 px-2 py-1 rounded-lg hover:bg-default-100 text-sm w-full justify-between ${radiusClass}`}
      >
        <div className="relative flex items-center gap-2">
          <span
            style={{ background: item.gradient }}
            className="p-1.5 text-base-light rounded-xl flex items-center justify-center"
          >
            {item.icon}
          </span>

          <span className={isActive ? "text-foreground" : "null"}>
            {item.label}
          </span>
        </div>

        <ChevronLeft
          size={16}
          className={`relative transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </NextLink>
    );
  }

  if (item.type === "modal") {
    return (
      <button
        className="flex items-center gap-2 px-3 py-2 w-ful"
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("open-modal", { detail: { id: item.modalId } }),
          )
        }
      >
        {item.icon}
        <span>{item.label}</span>
      </button>
    );
  }

  if (item.type === "dropdown") {
    const isDropdownActive =
      item.type === "dropdown" &&
      item.items.some((sub) => pathname === sub.href);

    return (
      <div className="w-full">
        <Button
          fullWidth
          radius="none"
          onPress={() => setOpen((p) => !p)}
          className={`${isDropdownActive ? "bg-primary" : null} flex bg-transparent text-text-tertiary-light dark:text-text-tertiary-dark items-center gap-2 px-2 py-1 rounded-lg hover:bg-default-100 text-sm w-full justify-between ${radiusClass}`}
        >
          <div className="relative flex items-center gap-2">
            <span
              style={{ background: item.gradient }}
              className="p-1.5 rounded-xl text-base-light flex items-center justify-center"
            >
              {item.icon}
            </span>
            <span
              className={`${isDropdownActive ? "text-foreground" : ""} text-md font-bold`}
            >
              {item.label}
            </span>
          </div>

          <ChevronDown
            size={16}
            className={`relative transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </Button>

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
                  key={subItem.href + subItem.label}
                  href={subItem.href}
                  className={`${isActive ? "bg-primary" : ""} flex text-text-tertiary-light dark:text-text-tertiary-dark items-center gap-2 px-2 py-1 rounded-lg hover:bg-default-100 text-sm`}
                >
                  {subItem.icon}
                  <span className={isActive ? "text-foreground" : ""}>
                    {subItem.label}
                  </span>
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
