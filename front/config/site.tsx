export type SiteConfig = typeof siteConfig;
import { NavMenuItem } from "@/types/site";
import {
  HomeIcon,
  XCircle,
  Briefcase,
  MessageCircle,
  UserIcon,
  Settings,
  Bell,
  Component,
  Activity,
  Clock,
  CheckCircle,
  BellDot,
} from "lucide-react";

export const siteConfig = {
  name: "لومینه",
  description: "رویای دیده شدنت رو به واقعیت تبدیل کن",

  navItems: [
    {
      label: "خانه",
      href: "/",
      icon: <HomeIcon />,
      type: "link",
      gradient: "linear-gradient(135deg,#0a84ff,#5e5ce6)",
    },
    {
      label: "پروژه ها",
      icon: <Briefcase />,
      type: "dropdown",
      gradient: "linear-gradient(135deg,#30d158,#40c8e0)",
      items: [
        {
          label: "همه",
          href: "/projects",
          icon: <Component />,
        },
        {
          label: "جاری",
          href: "/projects/",
          icon: <Activity />,
        },
        {
          label: "در انتظار",
          href: "/projects/",
          icon: <Clock />,
        },
        {
          label: "انجام شده",
          href: "/projects/",
          icon: <CheckCircle />,
        },
        {
          label: "لغو شده",
          href: "/projects/",
          icon: <XCircle />,
        },
      ],
    },
    {
      label: "اعلانات",
      icon: <Bell />,
      type: "dropdown",
      gradient: "linear-gradient(135deg,#ff9f0a,#ffd60a)",
      items: [
        {
          label: "همه",
          href: "/notifications",
          icon: <Component />,
        },
        {
          label: "خوانده نشده",
          href: "/notifications",
          icon: <BellDot />,
        },
        {
          label: "خوانده شده",
          href: "/notifications",
          icon: <CheckCircle />,
        },
      ],
    },
    {
      label: "پیام ها",
      href: "/messages",
      icon: <MessageCircle />,
      type: "link",
      gradient: "linear-gradient(135deg,#ff375f,#ff453a)",
    },
  ] as NavMenuItem[],

  navMenuItems: [
    {
      type: "dropdown",
      label: "پروفایل",
      items: [
        { label: "مشاهده پروفایل", href: "/profile" },
        { label: "پرتفولیو", href: "/portfolio" },
        { label: "خروج از حساب", href: "/logout" },
      ],
      icon: <UserIcon />,
    },
    {
      type: "modal",
      label: "تنظیمات",
      modalId: "settings",
      icon: <Settings />,
    },
    {
      type: "link",
      label: "اعلانات",
      href: "/notifications",
      icon: <Bell />,
    },
  ] as NavMenuItem[],

  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
  },
};
