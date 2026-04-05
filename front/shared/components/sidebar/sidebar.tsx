"use client";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { SidebarLink } from "./sidebar-link";
import { SidebarInfo } from "./sidebar-info";
import { SidebarItem } from "./sidebar-item";
import { Clock, Settings } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="w-[17%] hidden p-0.5 overflow-y-auto shadow-2xl bg-base-light dark:bg-base-dark rounded-[2.5rem] m-5 sm:flex flex-col items-start">
      <section className="w-full">
        <SidebarInfo
          href="/"
          justify="start"
          level="56"
          name="امیرعلی الله وردی"
          rule="مدیر"
          avatar="/imgs/amirali.jpg"
        />
      </section>

      <section className="w-full p-2 rounded-3xl">
        <p className="text-text-placeholder-light dark:text-text-placeholder-dark text-sm p-2">
          مسیر های اصلی
        </p>
        {siteConfig.navItems.map((item, index) => (
          <SidebarLink
            key={item.label}
            item={item}
            index={index}
            total={siteConfig.navItems.length}
          />
        ))}
      </section>
      <section className="w-full p-2 rounded-3xl">
        <p className="text-text-placeholder-light dark:text-text-placeholder-dark text-sm p-2">
          کلاب
        </p>
        <SidebarItem label="به زودی" icon={<Clock />} />
      </section>
      <section className="mt-auto w-full p-2">
        <SidebarItem label="تنظیمات" icon={<Settings />} href="/settings" />
      </section>
    </aside>
  );
};
