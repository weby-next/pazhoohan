type BottomNavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export function getBottomNavItems(
  navItems: any[],
  extraItems: BottomNavItem[] = [],
): BottomNavItem[] {
  const items = navItems.map((item) => ({
    label: item.label,
    icon: item.icon,
    href: item.href ?? item.items?.[0]?.href ?? "#",
  }));

  return [...items, ...extraItems];
}
