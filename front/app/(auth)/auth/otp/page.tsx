import { OtpForm } from "@/features/auth/components/otp-form";
import { PhoneForm } from "@/features/auth/components/phone_form";
import { Accordion, Button, Chip, Surface } from "@heroui/react";
import { ChevronDown, PhoneCall } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Handset } from "@gravity-ui/icons";

export const metadata: Metadata = {
  title: "تایید شماره تماس",
};

export default function AuthPage() {
  return (
    <div
      dir="ltr"
      className="absolute flex flex-col justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <h1 className="mb-4 text-5xl font-bold">لومینه</h1>
      <OtpForm />
      <footer className="mt-8 text-text-secondary-light dark:text-text-secondary-dark text-sm">
        <Accordion variant="surface">
          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                <Accordion.Indicator className="mr-4" />
                در صورت بروز هرگونه مشکل یا سوال تماس بگیرید
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                <Surface
                  variant="secondary"
                  className="rounded-3xl p-4 flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <Handset />
                    <p>(+98)9333352650</p>
                  </div>
                  <div className="flex gap-2">
                    <Chip variant="soft" color="success">
                      24/7
                    </Chip>
                    <p>شماره تماس</p>
                  </div>
                </Surface>
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </footer>
    </div>
  );
}
