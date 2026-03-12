import { SidebarInfoProps } from "@/types/sidebar/sidebar-info";
import { Button } from "@heroui/button";
import { ChevronDown, Dot } from "lucide-react";
import Image from "next/image";

export const SidebarInfo = ({
  avatar,
  level,
  name,
  rule,
  justify,
}: SidebarInfoProps) => {
  return (
    <button
      className={`w-full cursor-pointer bg-primary p-2 pr-3 flex items-center gap-4 ${justify === "start" ? "rounded-t-3xl" : "rounded-b-3xl"}`}
    >
      <section>
        {avatar ? (
          <Image
            src={avatar}
            alt={`${name}-avatar`}
            width={100}
            height={100}
            className="w-10 border-2 dark:border-border-default-dark border-border-default-light h-10 object-cover rounded-xl"
          />
        ) : null}
      </section>
      <section>
        <h4 className="text-lg">{name}</h4>
        <span className="flex text-sm text-text-secondary-light dark:text-text-secondary-dark items-center">
          {rule}
          <Dot />
          {level ? level : null}
        </span>
      </section>

      <span className="mr-auto text-text-secondary-dark">
        <ChevronDown />
      </span>
    </button>
  );
};
