import { PhoneForm } from "@/features/auth/components/phone-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "احراز هویت",
};

export default function AuthPage() {
  return (
    <div>
      <h1 className="mb-4 text-5xl font-bold">لومینه</h1>
      <PhoneForm />
    </div>
  );
}
