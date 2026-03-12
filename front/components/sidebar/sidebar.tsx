"use client";
import NextLink from "next/link";
import React from "react";
import { DynamicLogo } from "../icons";
import { SidebarInfo } from "./sidebar-info";
import { siteConfig } from "@/config/site";
import { SidebarLink } from "./sidebar-link";

export const Sidebar = () => {
  return (
    <aside className="w-[25%] p-2 border-l min-h-screen border-l-divider border-border-default-dark flex gap-6 flex-col items-start">
      <header className="">
        <NextLink
          className="flex p-4 justify-start items-center gap-1"
          href="/"
        >
          <DynamicLogo width={30} height={30} alt="Lumine Logo" />
          <p className="font-bold text-xl mr-4">لومینه</p>
        </NextLink>
      </header>

      <section className="w-full border border-border-default-light dark:border-border-default-dark rounded-3xl">
        <SidebarInfo
          avatar="/imgs/amirali.jpg"
          name="امیرعلی الله وردی"
          rule="مدیر"
          level="77"
          justify="start"
        />
        <SidebarInfo
          avatar="/logos/lumine_light_bg.svg"
          name="پسران آشوب"
          rule="عضو"
          level="3"
          justify="end"
        />
      </section>
      <section
        className="w-full"
        //  className="w-full border border-border-default-light dark:border-border-default-dark rounded-xl p-2"
      >
        {siteConfig.navItems.map((item, index) => (
          <SidebarLink
            key={item.label}
            item={item}
            index={index}
            total={siteConfig.navItems.length}
          />
        ))}
      </section>
    </aside>
  );
};
