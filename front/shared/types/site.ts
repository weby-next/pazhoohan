import React from "react";

type BaseNavMenuItem = {
  label: string;
  icon: React.ReactNode;
};

type LinkNavMenuItem = BaseNavMenuItem & {
  type: "link";
  href: string;
};

type DropdownNavMenuItem = BaseNavMenuItem & {
  type: "dropdown";
  items: {
    label: string;
    href: string;
    icon: React.ReactNode;
  }[];
};

type ModalNavMenuItem = BaseNavMenuItem & {
  type: "modal";
  modalId: string;
};

export type NavMenuItem =
  | LinkNavMenuItem
  | DropdownNavMenuItem
  | ModalNavMenuItem;
