"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
  DynamicLogo,
} from "@/components/icons";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Ellipse,
  Ellipsis,
} from "lucide-react";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="جستجو کنید ..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar
      maxWidth="full"
      position="sticky"
      className="border-b border-b-divider dark:border-border-default-dark border-border-default-light"
    >
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="start"
      >
        <Button
          isIconOnly
          size="lg"
          variant="shadow"
          color="primary"
          radius="lg"
          className="border border-border-default-light dark:border-border-default-dark"
        >
          <ChevronRight />
        </Button>
        <Button
          isIconOnly
          size="lg"
          variant="shadow"
          color="primary"
          radius="lg"
          className="border border-border-default-light dark:border-border-default-dark"
        >
          <ChevronLeft />
        </Button>
      </NavbarContent>

      <NavbarContent justify="center">
        <h2 className="text-2xl">عنوان صفحه</h2>
      </NavbarContent>

      <NavbarContent justify="end">
        <Ellipsis />
        <GithubIcon />
        <ThemeSwitch />
      </NavbarContent>

      {/* mobile */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
