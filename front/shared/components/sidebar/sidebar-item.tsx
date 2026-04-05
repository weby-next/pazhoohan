import NextLink from "next/link";

type BaseItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
};

export const SidebarItem = ({
  icon,
  label,
  active,
  rightIcon,
  onClick,
  href,
}: BaseItemProps) => {
  const baseClass =
    "flex items-center cursor-pointer gap-2 px-1 py-1 rounded-full text-sm w-full justify-between text-text-tertiary-light dark:text-text-tertiary-dark";

  const content = (
    <>
      <div className="flex items-center gap-1">
        <span className="p-1.5 text-brand rounded-full flex items-center justify-center">
          {icon}
        </span>

        <span className={active ? "text-foreground  font-bold" : "font-bold"}>
          {label}
        </span>
      </div>

      {rightIcon}
    </>
  );

  if (href) {
    return (
      <NextLink
        href={href}
        className={`${baseClass} ${active ? "bg-surface-secondary-light dark:bg-surface-secondary-dark cursor-auto" : ""}`}
      >
        {content}
      </NextLink>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${active ? "bg-primary" : ""}`}
    >
      {content}
    </button>
  );
};
