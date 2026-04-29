import { PhoneForm } from "@/features/auth/components/phone_form";
import { Chip } from "@heroui/chip";
import { Accordion } from "@heroui/react";
import { ChevronDown, PhoneCall } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "احراز هویت",
};

export default function AuthPage() {
  return (
    <div className="absolute flex flex-col justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="mb-4 text-5xl font-bold">لومینه</h1>
      <PhoneForm />
      <footer className="mt-8 text-text-secondary-light dark:text-text-secondary-dark text-sm">
        <Accordion className={`transition-all duration-200`}>
          <Accordion.Item key={1}>
            <Accordion.Trigger className={`flex mb-4 gap-2 cursor-pointer`}>
              در صورت بروز هرگونه مشکل یا سوال تماس بگیرید
              <ChevronDown />
            </Accordion.Trigger>
            <Accordion.Panel>
              <Link
                href={`tel:+989333352650`}
                className="flex bg-base-light p-4 rounded-full dark:bg-base-dark justify-between items-center w-full"
              >
                <div className="flex items-center gap-2">
                  <p>شماره تماس</p>
                  <Chip size="sm" color="success">
                    7/24
                  </Chip>
                </div>
                <div className="flex items-center gap-2">
                  <p>09333352650</p>
                  <PhoneCall />
                </div>
              </Link>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </footer>
    </div>
  );
}
