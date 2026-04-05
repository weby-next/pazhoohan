import { SidebarInfoProps } from "@/types/sidebar/sidebar-info";
import { ChevronLeft, Dot } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { Chip } from "@heroui/chip";

export const SidebarInfo = ({
  avatar,
  level,
  name,
  rule,
  justify,
  href,
}: SidebarInfoProps) => {
  return (
    <NextLink
      href={href}
      className="bg-surface-secondary-light dark:bg-surface-secondary-dark w-full p-2 rounded-full justify-between items-center flex"
    >
      <section>
        <Image
          src={`${avatar}`}
          alt={`${name} avatar`}
          width={100}
          height={100}
          className="w-12 h-12 rounded-full border-2 border-border-default-light dark:border-border-default-dark object-cover"
        />
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">{name}</h2>
        <div className="flex">
          <Chip color="primary" size="sm" variant="faded">
            {rule}
          </Chip>
          <span className="text-text-placeholder-dark">
            <Dot />
          </span>
          <Chip size="sm" color="success" variant="faded">
            سطح: {level}
          </Chip>
        </div>
      </section>
      <ChevronLeft />
    </NextLink>
  );
};
