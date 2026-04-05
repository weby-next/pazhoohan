"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/shared/components/theme-switch";
import { GithubIcon, SearchIcon } from "@/shared/components/icons";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleEllipsis,
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
      radius="full"
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
      style={{ background: "transparent" }}
      position="sticky"
    >
      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="start">
        <Button
          isIconOnly
          size="lg"
          radius="full"
          className="shadow-2xl bg-surface-secondary-light dark:bg-surface-secondary-dark"
        >
          <ChevronRight />
        </Button>
        <Button
          isIconOnly
          size="lg"
          radius="full"
          className="shadow-2xl hidden sm:flex bg-surface-secondary-light dark:bg-surface-secondary-dark"
        >
          <ChevronLeft />
        </Button>
      </NavbarContent>

      <NavbarContent justify="center">
        <h2 className="text-2xl">عنوان صفحه</h2>
      </NavbarContent>

      <NavbarContent justify="end">
        <Button
          isIconOnly
          radius="full"
          className="bg-transparent text-text-placeholder-light dark:text-text-placeholder-dark"
        >
          <CircleEllipsis size={30} />
        </Button>
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
